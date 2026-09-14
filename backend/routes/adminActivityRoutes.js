const express = require('express');
const router = express.Router();
const {
    getAdminActivities,
    getAdminActivityById,
    logAdminActivity,
    getActivityStats
} = require('../controllers/adminActivityController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, admin, getAdminActivities)
    .post(protect, admin, logAdminActivity);

router.route('/stats')
    .get(protect, admin, getActivityStats);

router.route('/:id')
    .get(protect, admin, getAdminActivityById);

module.exports = router;
