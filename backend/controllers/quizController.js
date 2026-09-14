const Quiz = require('../models/Quiz');

// @desc    Fetch all quizzes
// @route   GET /api/quizzes
// @access  Public
const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({}).populate('course', 'title.category');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Fetch single quiz
// @route   GET /api/quizzes/:id
// @access  Public
const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('course', 'title category');
        if (quiz) {
            res.json(quiz);
        } else {
            res.status(404).json({ message: 'Quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a quiz
// @route   POST /api/quizzes
// @access  Private/Admin
const createQuiz = async (req, res) => {
    try {
        const { title, course, questions } = req.body;
        const quiz = new Quiz({
            title,
            course,
            questions
        });

        const createdQuiz = await quiz.save();
        res.status(201).json(createdQuiz);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getQuizzes, getQuizById, createQuiz };
