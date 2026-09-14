const mongoose = require('mongoose');

const glossarySchema = new mongoose.Schema({
    term: {
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
    definition: {
        type: String,
        required: true
    },
    detailedExplanation: {
        type: String
    },
    category: {
        type: String,
        enum: [
            'Network Security',
            'Application Security',
            'Cryptography',
            'Threat Intelligence',
            'Compliance',
            'Identity & Access',
            'Incident Response',
            'General',
            'Other'
        ],
        default: 'General'
    },
    aliases: [{
        type: String
    }],
    relatedTerms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Glossary'
    }],
    examples: [{
        type: String
    }],
    references: [{
        title: String,
        url: String
    }],
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Glossary = mongoose.model('Glossary', glossarySchema);
module.exports = Glossary;
