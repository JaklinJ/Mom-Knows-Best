const mongoose = require('mongoose')

// Define schema for blog posts
const postSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        required: true
     },
    imageUrl: { 
        type: String, 
        match: /^https?:\/\//,
        required: true, 
    },
    location: { 
        type: String, 
        required: true
     },
     rating: {
        type: Number,
        required: true,
     },
    description: { 
        type: String, 
        required: true 
    },
    likes: [{
         type: mongoose.Types.ObjectId, 
         ref: 'User' 
        }],
    createdAt: {
         type: Date, default: Date.now 
        },
    author: {
         type: mongoose.Types.ObjectId, 
         ref: 'User' 
        }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;