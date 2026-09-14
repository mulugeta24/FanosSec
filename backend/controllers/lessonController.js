const Lesson = require('../models/Lesson');
const Module = require('../models/Module');

// @desc    Get all lessons
// @route   GET /api/lessons
// @access  Public
const getLessons = async (req, res) => {
    try {
        const { module } = req.query;
        const filter = module ? { module } : {};
        
        const lessons = await Lesson.find(filter)
            .populate('module')
            .populate('resources')
            .sort({ order: 1 });
        
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single lesson by ID
// @route   GET /api/lessons/:id
// @access  Public
const getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id)
            .populate('module')
            .populate('resources');
        
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new lesson
// @route   POST /api/lessons
// @access  Private/Admin
const createLesson = async (req, res) => {
    try {
        const { title, description, module, order, type, content, videoUrl, duration, fileUrl, fileType } = req.body;
        
        const lesson = await Lesson.create({
            title,
            description,
            module,
            order,
            type,
            content,
            videoUrl,
            duration,
            fileUrl: fileUrl || '',
            fileType: fileType || 'PDF'
        });
        
        // Add lesson to module
        await Module.findByIdAndUpdate(module, {
            $push: { lessons: lesson._id }
        });
        
        res.status(201).json(lesson);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create lesson', error: error.message });
    }
};

// @desc    Update lesson
// @route   PUT /api/lessons/:id
// @access  Private/Admin
const updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        
        res.json(lesson);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update lesson', error: error.message });
    }
};

// @desc    Delete lesson
// @route   DELETE /api/lessons/:id
// @access  Private/Admin
const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndDelete(req.params.id);
        
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        
        // Remove lesson from module
        await Module.findByIdAndUpdate(lesson.module, {
            $pull: { lessons: lesson._id }
        });
        
        res.json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete lesson', error: error.message });
    }
};

module.exports = {
    getLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson
};
