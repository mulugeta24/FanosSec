const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    duration: {
        type: String // e.g., "15:30"
    },
    category: {
        type: String,
        enum: [
            'Tutorial',
            'Demonstration',
            'Lecture',
            'Lab Walkthrough',
            'Tool Guide',
            'Security Concept',
            'Other'
        ],
        default: 'Tutorial'
    },
    tags: [{
        type: String
    }],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    views: {
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

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
