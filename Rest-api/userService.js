// Import required modules
const mongoose = require('mongoose');

// Import User and Post models
const User = require('./models/User')
const Post = require('./models/Post')

// Create userService module
const userService = {
  // Check if the user is the owner of a post
  isOwner: async (userId, postId) => {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return { isOwner: false, message: 'Post not found' };
      }
      return { isOwner: post.author.equals(userId), post };
    } catch (err) {
      return { isOwner: false, message: err.message };
    }
  },

  // Like a post
  likePost: async (postId, userId) => {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return { message: 'Post not found' };
      }
      if (post.likes.includes(userId)) {
        return { message: 'You have already liked this post' };
      }
      post.likes.push(userId);
      await post.save();
      return { message: 'Post liked successfully' };
    } catch (err) {
      return { message: err.message };
    }
  },

  // Unlike a post
  unlikePost: async (postId, userId) => {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return { message: 'Post not found' };
      }
      const index = post.likes.indexOf(userId);
      if (index === -1) {
        return { message: 'You have not liked this post' };
      }
      post.likes.splice(index, 1);
      await post.save();
      return { message: 'Post unliked successfully' };
    } catch (err) {
      return { message: err.message };
    }
  }
};

// Export the userService module
module.exports = userService