// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:4200'],
    credentials: true
    }))

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  rePassword: String
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Define blog post schema
const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  date: { type: Date, default: Date.now }
});

// Create a model from the schema
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, rePassword } = req.body;
    if (password !== rePassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const user = new User({ username, password, rePassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ username: user.username }, 'secret_key');
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
}

// Create a new blog post
app.post('/api/posts', verifyToken, async (req, res) => {
  try {
    const { title, type, location, imageUrl, rating, description } = req.body;
    const newPost = new BlogPost({
      title,
      type,
      location,
      imageUrl,
      rating,
      description,
      author: req.user.username
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all blog posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Like a post
app.post('/api/posts/:id/like', verifyToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.username;
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }
    post.likes.push(userId);
    await post.save();
    res.status(200).json({ message: 'Post liked successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Unlike a post
app.delete('/api/posts/:id/unlike', verifyToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.username;
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const index = post.likes.indexOf(userId);
    if (index === -1) {
      return res.status(400).json({ message: 'You have not liked this post' });
    }
    post.likes.splice(index, 1);
    await post.save();
    res.status(200).json({ message: 'Post unliked successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Edit a post
app.put('/api/posts/:id', verifyToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, type, location, imageUrl, rating, description } = req.body;
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author !== req.user.username) {
      return res.status(403).json({ message: 'You are not authorized to edit this post' });
    }
    post.title = title;
    post.type = type;
    post.location = location;
    post.imageUrl = imageUrl;
    post.rating = rating;
    post.description = description;
    await post.save();
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post
app.delete('/api/posts/:id', verifyToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author !== req.user.username) {
      return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }
    await post.remove();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});