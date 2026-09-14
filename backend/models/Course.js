const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    theoryContent: {
        type: String, // HTML content
        required: false,
    },
    pdfUrl: {
        type: String, // Downloadable PDF
    },
    videoUrl: {
        type: String, // YouTube embed link
    },
    labs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lab'
    }],
    quizzes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    }],
    // Extended admin fields (additive — safe defaults)
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'published'
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        default: 'Beginner'
    },
    thumbnail: { type: String },
    tags: [{ type: String }],
    instructor: { type: String },
    estimatedHours: { type: Number, default: 0 },
    objectives: [{ type: String }],
    prerequisites: [{ type: String }],
    skills: [{ type: String }],
    featured: { type: Boolean, default: false },
    enrollmentCount: { type: Number, default: 0 }
}, {
    timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
