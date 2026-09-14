const mongoose = require('mongoose');

const securityAdvisorySchema = new mongoose.Schema({
    advisoryId: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['Critical', 'High', 'Medium', 'Low'],
        required: true
    },
    vendor: {
        type: String
    },
    product: {
        type: String
    },
    affectedVersions: [{
        type: String
    }],
    patchedVersions: [{
        type: String
    }],
    vulnerabilities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vulnerability'
    }],
    recommendations: [{
        type: String
    }],
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

const SecurityAdvisory = mongoose.model('SecurityAdvisory', securityAdvisorySchema);
module.exports = SecurityAdvisory;
