const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
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
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            'Cyber Attack',
            'Data Breach',
            'Vulnerability',
            'Patch Release',
            'Security Tool',
            'Industry News',
            'Threat Actor',
            'Regulation',
            'Other'
        ],
        default: 'Industry News'
    },
    source: {
        type: String
    },
    sourceUrl: {
        type: String
    },
    imageUrl: {
        type: String
    },
    tags: [{
        type: String
    }],
    severity: {
        type: String,
        enum: ['Critical', 'High', 'Medium', 'Low', 'Info'],
        default: 'Info'
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        default: 'FANOS SEC Intelligence Team'
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

const News = mongoose.model('News', newsSchema);
module.exports = News;
