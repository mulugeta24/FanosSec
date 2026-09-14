const mongoose = require('mongoose');

const cheatSheetSchema = new mongoose.Schema({
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
            'Programming',
            'Linux Commands',
            'Network Security',
            'Web Security',
            'Penetration Testing',
            'Forensics',
            'Cryptography',
            'Tools',
            'Other'
        ],
        required: true
    },
    content: {
        type: String, // HTML/Markdown content
        required: true
    },
    sections: [{
        title: String,
        content: String,
        commands: [{
            command: String,
            description: String,
            example: String
        }]
    }],
    tags: [{
        type: String
    }],
    pdfUrl: {
        type: String
    },
    downloadCount: {
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

const CheatSheet = mongoose.model('CheatSheet', cheatSheetSchema);
module.exports = CheatSheet;
