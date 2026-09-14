const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        enum: ['theory', 'video', 'lab', 'quiz', 'document'],
        default: 'theory'
    },
    content: {
        type: String, // HTML content for theory pages
    },
    videoUrl: {
        type: String
    },
    fileUrl: {
        type: String,
        default: ''
    },
    fileType: {
        type: String,
        default: 'PDF'
    },
    duration: {
        type: String // e.g., "15 minutes"
    },
    resources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    }],
    isPublished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;
