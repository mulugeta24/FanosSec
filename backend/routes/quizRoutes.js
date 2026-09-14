const express = require('express');
const router = express.Router();
const { getQuizzes, getQuizById, createQuiz } = require('../controllers/quizController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getQuizzes).post(protect, admin, createQuiz);
router.route('/:id').get(getQuizById);

module.exports = router;
