const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    certificateId: {
        type: String, // Unique identifier e.g., CCH-1001
        required: true,
        unique: true
    },
    issuedAt: {
        type: Date,
        default: Date.now
    },
    pdfUrl: {
        type: String, // Link to the generated PDF
    },
    // Extended admin fields (additive)
    status: {
        type: String,
        enum: ['pending', 'active', 'revoked', 'expired'],
        default: 'active'
    },
    score: { type: Number },
    notes: { type: String }
}, {
    timestamps: true,
});

const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;
