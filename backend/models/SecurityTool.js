const mongoose = require('mongoose');

const securityToolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
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
            'Network Scanner',
            'Vulnerability Scanner',
            'Exploitation',
            'Password Cracking',
            'Web Application',
            'Forensics',
            'Reverse Engineering',
            'Malware Analysis',
            'OSINT',
            'Cryptography',
            'Wireless',
            'Social Engineering',
            'Other'
        ],
        required: true
    },
    type: {
        type: String,
        enum: ['Open Source', 'Commercial', 'Freemium'],
        default: 'Open Source'
    },
    platform: [{
        type: String,
        enum: ['Linux', 'Windows', 'macOS', 'Web', 'Mobile', 'Cross-platform']
    }],
    officialWebsite: {
        type: String
    },
    githubUrl: {
        type: String
    },
    documentation: {
        type: String
    },
    installation: {
        type: String
    },
    usage: {
        type: String
    },
    examples: [{
        command: String,
        description: String
    }],
    features: [{
        type: String
    }],
    tags: [{
        type: String
    }],
    logo: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const SecurityTool = mongoose.model('SecurityTool', securityToolSchema);
module.exports = SecurityTool;
