const mongoose = require('mongoose')

// Define schema for users
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    unique: true 
  },
  password: {
    type: String,
    required: true
  }
});

// Hash user password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;