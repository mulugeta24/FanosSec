const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
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
    category: {
        type: String,
        required: true,
        enum: [
            'Web Security',
            'Network Security',
            'Digital Forensics',
            'Cryptography',
            'OSINT',
            'Privilege Escalation',
            'Reverse Engineering'
        ]
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard', 'Insane'],
        default: 'Easy'
    },
    points: {
        type: Number,
        required: true,
        default: 50
    },
    description: {
        type: String,
        required: true
    },
    scenario: {
        type: String,
        default: ''
    },
    instructions: {
        type: String,
        default: ''
    },
    hints: [{
        text: String,
        cost: {
            type: Number,
            default: 0
        }
    }],
    flag: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    author: {
        type: String,
        default: 'FANOS SEC Elite Team'
    },
    solvedCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge;
