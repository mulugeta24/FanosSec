const mongoose = require('mongoose');

const threatIntelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    threatType: {
        type: String,
        enum: [
            'APT',
            'Ransomware',
            'Malware',
            'Phishing',
            'DDoS',
            'Supply Chain Attack',
            'Zero-Day',
            'Botnet',
            'Trojan',
            'Other'
        ],
        required: true
    },
    severity: {
        type: String,
        enum: ['Critical', 'High', 'Medium', 'Low'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    threatActor: {
        name: String,
        description: String
    },
    indicators: [{
        type: {
            type: String,
            enum: ['IP', 'Domain', 'URL', 'Hash', 'Email', 'Other']
        },
        value: String
    }],
    affectedSectors: [{
        type: String
    }],
    geography: [{
        type: String
    }],
    ttps: [{
        type: String // MITRE ATT&CK TTPs
    }],
    mitigation: {
        type: String
    },
    references: [{
        title: String,
        url: String
    }],
    publishedDate: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const ThreatIntel = mongoose.model('ThreatIntel', threatIntelSchema);
module.exports = ThreatIntel;
