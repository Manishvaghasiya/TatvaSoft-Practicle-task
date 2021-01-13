const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        required: false,
        default: false
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;