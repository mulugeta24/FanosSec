const AdminActivity = require('../models/AdminActivity');

// @desc    Get all admin activities (audit log)
// @route   GET /api/admin-activities
// @access  Private/Admin
const getAdminActivities = async (req, res) => {
    try {
        const { admin, action, entity, startDate, endDate, limit = 100 } = req.query;
        const filter = {};
        
        if (admin) filter.admin = admin;
        if (action) filter.action = action;
        if (entity) filter.entity = entity;
        
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }
        
        const activities = await AdminActivity.find(filter)
            .populate('admin', 'name email')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));
        
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single admin activity by ID
// @route   GET /api/admin-activities/:id
// @access  Private/Admin
const getAdminActivityById = async (req, res) => {
    try {
        const activity = await AdminActivity.findById(req.params.id)
            .populate('admin', 'name email');
        
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        
        res.json(activity);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Log admin activity
// @route   POST /api/admin-activities
// @access  Private/Admin
const logAdminActivity = async (req, res) => {
    try {
        const { action, entity, entityId, description, changes } = req.body;
        
        const activity = await AdminActivity.create({
            admin: req.user._id,
            action,
            entity,
            entityId,
            description,
            ipAddress: req.ip,
            userAgent: req.get('user-agent'),
            changes
        });
        
        res.status(201).json(activity);
    } catch (error) {
        res.status(400).json({ message: 'Failed to log activity', error: error.message });
    }
};

// @desc    Get admin activity statistics
// @route   GET /api/admin-activities/stats
// @access  Private/Admin
const getActivityStats = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const dateFilter = {};
        
        if (startDate || endDate) {
            dateFilter.createdAt = {};
            if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
            if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
        }
        
        const [actionStats, entityStats, adminStats] = await Promise.all([
            AdminActivity.aggregate([
                { $match: dateFilter },
                { $group: { _id: '$action', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]),
            AdminActivity.aggregate([
                { $match: dateFilter },
                { $group: { _id: '$entity', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]),
            AdminActivity.aggregate([
                { $match: dateFilter },
                { $group: { _id: '$admin', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ])
        ]);
        
        res.json({
            byAction: actionStats,
            byEntity: entityStats,
            byAdmin: adminStats
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAdminActivities,
    getAdminActivityById,
    logAdminActivity,
    getActivityStats
};
