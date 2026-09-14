const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructions: {
        type: String, // Step by step HTML text
        required: true,
    },
    videoDemoUrl: {
        type: String,
    },
    codeSnippets: [{
        language: String,
        code: String
    }],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    // Extended admin fields (additive)
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'Expert'], default: 'Medium' },
    category: { type: String, default: 'General' },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
    estimatedTime: { type: String, default: '30 minutes' },
    hints: [{ type: String }],
    objectives: [{ type: String }],
    tags: [{ type: String }],
    safetyNotice: { type: String },
    environment: { type: String }
}, {
    timestamps: true,
});

const Lab = mongoose.model('Lab', labSchema);
module.exports = Lab;
