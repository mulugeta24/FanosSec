const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['General', 'Maintenance', 'New Feature', 'Event', 'Security Alert', 'Other'],
        default: 'General'
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    },
    targetAudience: {
        type: String,
        enum: ['All', 'Students', 'Instructors', 'Admins'],
        default: 'All'
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    dismissible: {
        type: Boolean,
        default: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;
