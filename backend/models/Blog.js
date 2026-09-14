const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String, // HTML content
        required: true,
    },
    author: {
        type: String,
        default: 'Mulugeta Ababi'
    },
    pdfUrl: {
        type: String, // Optional downloadable PDF
    },
    videoEmbedUrl: {
        type: String, // Optional YouTube/TikTok embed
    }
}, {
    timestamps: true,
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
