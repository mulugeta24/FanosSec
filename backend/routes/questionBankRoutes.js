const express = require('express');
const router = express.Router();
const {
    getQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getRandomQuestions
} = require('../controllers/questionBankController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, admin, getQuestions)
    .post(protect, admin, createQuestion);

router.route('/random')
    .get(protect, admin, getRandomQuestions);

router.route('/:id')
    .get(protect, admin, getQuestionById)
    .put(protect, admin, updateQuestion)
    .delete(protect, admin, deleteQuestion);

module.exports = router;
