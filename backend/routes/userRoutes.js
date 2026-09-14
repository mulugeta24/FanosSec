const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateUser, getUserStats } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, admin, getUserStats);
router.route('/').get(protect, admin, getUsers);
router.route('/:id').get(protect, admin, getUserById).put(protect, admin, updateUser);

module.exports = router;
