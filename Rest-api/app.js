// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Post = require('./models/Post');
const User = require('./models/User')

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/momKnowsBest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Middleware to parse JSON
app.use(express.json());

// Routes for users
// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { username, password, rePassword } = req.body;
    if (password !== rePassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Routes for blog posts
// GET all posts
app.get('/mom-approved', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new post
app.post('/mom-approved', async (req, res) => {
  try {
    const { title, type, location, imageUrl, rating, description, author } = req.body;
    const post = new Post({ title, type, location, imageUrl, rating, description, author });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a specific post by ID
app.get('/mom-approved/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a post by ID
app.put('/mom-approved/:id', async (req, res) => {
  try {
    const { title, type, location, imageUrl, rating, description } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, type, location, imageUrl, rating, description }, { new: true });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a post by ID
app.delete('/mom-approved/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LIKE a post by ID
app.put('/mom-approved/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const userId = req.body.userId; // Assuming userId is provided in request body
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }
    post.likes.push(userId);
    await post.save();
    res.json({ message: 'Post liked successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UNLIKE a post by ID
app.put('/mom-approved/:id/unlike', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const userId = req.body.userId; // Assuming userId is provided in request body
    const index = post.likes.indexOf(userId);
    if (index === -1) {
      return res.status(400).json({ message: 'You have not liked this post' });
    }
    post.likes.splice(index, 1);
    await post.save();
    res.json({ message: 'Post unliked successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});