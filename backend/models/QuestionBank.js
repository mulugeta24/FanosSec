const mongoose = require('mongoose');

const questionBankSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            'Network Security',
            'Web Security',
            'Cryptography',
            'Operating Systems',
            'Programming',
            'Ethical Hacking',
            'Digital Forensics',
            'Incident Response',
            'Compliance',
            'General Security',
            'Other'
        ],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    type: {
        type: String,
        enum: ['Multiple Choice', 'True/False', 'Short Answer', 'Code'],
        default: 'Multiple Choice'
    },
    options: [{
        type: String
    }],
    correctAnswer: {
        type: String,
        required: true
    },
    explanation: {
        type: String
    },
    points: {
        type: Number,
        default: 1
    },
    tags: [{
        type: String
    }],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    usageCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const QuestionBank = mongoose.model('QuestionBank', questionBankSchema);
module.exports = QuestionBank;
