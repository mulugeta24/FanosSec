const express = require('express');
const router = express.Router();
const {
    getChallenges,
    getChallengeById,
    submitFlag,
    createChallenge,
    updateChallenge,
    deleteChallenge,
    getUserChallengeStats
} = require('../controllers/challengeController');
const { protect, admin } = require('../middleware/authMiddleware');

// Optional auth middleware helper: allows guests to view list/details, but attaches req.user if token present
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const optionalAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            req.user = await User.findById(decoded.id).select('-password');
        } catch (error) {
            // guest continue
        }
    }
    next();
};

router.route('/')
    .get(optionalAuth, getChallenges)
    .post(protect, admin, createChallenge);

router.get('/user/stats', protect, getUserChallengeStats);

router.route('/:id')
    .get(optionalAuth, getChallengeById)
    .put(protect, admin, updateChallenge)
    .delete(protect, admin, deleteChallenge);

router.post('/:id/submit', protect, submitFlag);

module.exports = router;
