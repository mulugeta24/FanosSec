const LearningPath = require('../models/LearningPath');

const getPaths = async (req, res) => {
    try {
        const paths = await LearningPath.find({}).populate('courses', 'title category description videoUrl pdfUrl');
        res.json(paths);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getPathById = async (req, res) => {
    try {
        const path = await LearningPath.findById(req.params.id).populate('courses');
        if (!path) return res.status(404).json({ message: 'Path not found' });
        res.json(path);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const createPath = async (req, res) => {
    try {
        const { title, description, difficulty, icon, color, courses, estimatedHours } = req.body;
        const path = await LearningPath.create({ title, description, difficulty, icon, color, courses, estimatedHours });
        res.status(201).json(path);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const updatePath = async (req, res) => {
    try {
        const path = await LearningPath.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!path) return res.status(404).json({ message: 'Path not found' });
        res.json(path);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const deletePath = async (req, res) => {
    try {
        await LearningPath.findByIdAndDelete(req.params.id);
        res.json({ message: 'Path deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getPaths, getPathById, createPath, updatePath, deletePath };
