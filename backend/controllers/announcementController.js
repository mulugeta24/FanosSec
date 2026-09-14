const Announcement = require('../models/Announcement');

// @desc    Get all active announcements
// @route   GET /api/announcements
// @access  Public
const getAnnouncements = async (req, res) => {
    try {
        const { targetAudience, type } = req.query;
        const now = new Date();
        
        const filter = {
            isActive: true,
            startDate: { $lte: now },
            $or: [
                { endDate: { $exists: false } },
                { endDate: null },
                { endDate: { $gte: now } }
            ]
        };
        
        if (targetAudience) filter.targetAudience = { $in: [targetAudience, 'All'] };
        if (type) filter.type = type;
        
        const announcements = await Announcement.find(filter)
            .populate('author', 'name email')
            .sort({ priority: -1, createdAt: -1 });
        
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single announcement by ID
// @route   GET /api/announcements/:id
// @access  Public
const getAnnouncementById = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id)
            .populate('author', 'name email');
        
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        
        res.json(announcement);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new announcement
// @route   POST /api/announcements
// @access  Private/Admin
const createAnnouncement = async (req, res) => {
    try {
        const { title, message, type, priority, targetAudience, startDate, endDate, dismissible } = req.body;
        
        const announcement = await Announcement.create({
            title,
            message,
            type,
            priority,
            targetAudience,
            startDate,
            endDate,
            dismissible,
            author: req.user._id
        });
        
        res.status(201).json(announcement);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create announcement', error: error.message });
    }
};

// @desc    Update announcement
// @route   PUT /api/announcements/:id
// @access  Private/Admin
const updateAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        
        res.json(announcement);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update announcement', error: error.message });
    }
};

// @desc    Delete announcement
// @route   DELETE /api/announcements/:id
// @access  Private/Admin
const deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndDelete(req.params.id);
        
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        
        res.json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete announcement', error: error.message });
    }
};

module.exports = {
    getAnnouncements,
    getAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
};
