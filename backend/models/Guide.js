const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            'Getting Started',
            'Tutorial',
            'How-To',
            'Best Practices',
            'Security Guide',
            'Setup Guide',
            'Troubleshooting',
            'Other'
        ],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    content: {
        type: String, // HTML content
        required: true
    },
    tableOfContents: [{
        title: String,
        anchor: String
    }],
    estimatedTime: {
        type: String // e.g., "30 minutes"
    },
    prerequisites: [{
        type: String
    }],
    tools: [{
        type: String
    }],
    tags: [{
        type: String
    }],
    author: {
        type: String,
        default: 'FANOS SEC Team'
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Guide = mongoose.model('Guide', guideSchema);
module.exports = Guide;
