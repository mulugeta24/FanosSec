const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: ['PDF', 'Document', 'Image', 'Slide', 'Code', 'Tool', 'Link', 'Other'],
        required: true
    },
    fileUrl: {
        type: String
    },
    fileSize: {
        type: String // e.g., "2.5 MB"
    },
    category: {
        type: String,
        enum: [
            'Course Material',
            'Reference',
            'Tool',
            'Template',
            'Cheat Sheet',
            'Research Paper',
            'Guide',
            'Other'
        ],
        default: 'Course Material'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    downloadCount: {
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

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;
