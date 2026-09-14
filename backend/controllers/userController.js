const User = require('../models/User');

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const { role, status, search, page = 1, limit = 50 } = req.query;

        const query = {};
        if (role) query.role = role;
        if (status) query.status = status;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await User.countDocuments(query);
        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.json({ users, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get user by ID (admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update user status (suspend/activate) — admin only
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    try {
        const { status, role } = req.body;

        // Prevent admin from deactivating themselves
        if (req.params.id === req.user._id.toString() && status === 'suspended') {
            return res.status(400).json({ message: 'Cannot suspend your own account' });
        }

        const allowedUpdates = {};
        if (status && ['active', 'suspended'].includes(status)) allowedUpdates.status = status;
        if (role && ['admin', 'user'].includes(role)) {
            allowedUpdates.role = role;
            allowedUpdates.isAdmin = role === 'admin';
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            allowedUpdates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get user count stats (admin only)
// @route   GET /api/users/stats
// @access  Private/Admin
const getUserStats = async (req, res) => {
    try {
        const total = await User.countDocuments({ role: 'user' });
        const active = await User.countDocuments({ role: 'user', status: { $ne: 'suspended' } });
        const suspended = await User.countDocuments({ role: 'user', status: 'suspended' });
        const admins = await User.countDocuments({ role: 'admin' });
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const newThisWeek = await User.countDocuments({ role: 'user', createdAt: { $gte: sevenDaysAgo } });

        res.json({ total, active, suspended, admins, newThisWeek });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getUsers, getUserById, updateUser, getUserStats };
