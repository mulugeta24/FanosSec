const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
    duration: {
        type: String, // e.g., "2 hours"
    },
    fileUrl: {
        type: String,
        default: ''
    },
    fileType: {
        type: String,
        default: 'PDF'
    },
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }],
    isPublished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Module = mongoose.model('Module', moduleSchema);
module.exports = Module;
