const QuestionBank = require('../models/QuestionBank');

// @desc    Get all questions from bank
// @route   GET /api/question-bank
// @access  Private/Admin
const getQuestions = async (req, res) => {
    try {
        const { category, difficulty, type, course } = req.query;
        const filter = { isActive: true };
        
        if (category) filter.category = category;
        if (difficulty) filter.difficulty = difficulty;
        if (type) filter.type = type;
        if (course) filter.course = course;
        
        const questions = await QuestionBank.find(filter)
            .populate('course', 'title')
            .sort({ createdAt: -1 });
        
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single question by ID
// @route   GET /api/question-bank/:id
// @access  Private/Admin
const getQuestionById = async (req, res) => {
    try {
        const question = await QuestionBank.findById(req.params.id)
            .populate('course', 'title');
        
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new question
// @route   POST /api/question-bank
// @access  Private/Admin
const createQuestion = async (req, res) => {
    try {
        const { questionText, category, difficulty, type, options, correctAnswer, explanation, points, tags, course } = req.body;
        
        const question = await QuestionBank.create({
            questionText,
            category,
            difficulty,
            type,
            options,
            correctAnswer,
            explanation,
            points,
            tags,
            course
        });
        
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create question', error: error.message });
    }
};

// @desc    Update question
// @route   PUT /api/question-bank/:id
// @access  Private/Admin
const updateQuestion = async (req, res) => {
    try {
        const question = await QuestionBank.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        
        res.json(question);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update question', error: error.message });
    }
};

// @desc    Delete question
// @route   DELETE /api/question-bank/:id
// @access  Private/Admin
const deleteQuestion = async (req, res) => {
    try {
        const question = await QuestionBank.findByIdAndDelete(req.params.id);
        
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        
        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete question', error: error.message });
    }
};

// @desc    Get random questions for quiz generation
// @route   GET /api/question-bank/random
// @access  Private/Admin
const getRandomQuestions = async (req, res) => {
    try {
        const { category, difficulty, count = 10 } = req.query;
        const filter = { isActive: true };
        
        if (category) filter.category = category;
        if (difficulty) filter.difficulty = difficulty;
        
        const questions = await QuestionBank.aggregate([
            { $match: filter },
            { $sample: { size: parseInt(count) } }
        ]);
        
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getRandomQuestions
};
