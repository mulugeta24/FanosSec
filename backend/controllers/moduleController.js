const Module = require('../models/Module');
const Course = require('../models/Course');

// @desc    Get all modules
// @route   GET /api/modules
// @access  Public
const getModules = async (req, res) => {
    try {
        const { course } = req.query;
        const filter = course ? { course } : {};
        
        const modules = await Module.find(filter)
            .populate('course', 'title')
            .populate('lessons')
            .sort({ order: 1 });
        
        res.json(modules);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single module by ID
// @route   GET /api/modules/:id
// @access  Public
const getModuleById = async (req, res) => {
    try {
        const module = await Module.findById(req.params.id)
            .populate('course')
            .populate('lessons');
        
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }
        
        res.json(module);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new module
// @route   POST /api/modules
// @access  Private/Admin
const createModule = async (req, res) => {
    try {
        const { title, description, course, order, duration, fileUrl, fileType } = req.body;
        
        const module = await Module.create({
            title,
            description,
            course,
            order,
            duration,
            fileUrl: fileUrl || '',
            fileType: fileType || 'PDF'
        });
        
        res.status(201).json(module);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create module', error: error.message });
    }
};

// @desc    Update module
// @route   PUT /api/modules/:id
// @access  Private/Admin
const updateModule = async (req, res) => {
    try {
        const module = await Module.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }
        
        res.json(module);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update module', error: error.message });
    }
};

// @desc    Delete module
// @route   DELETE /api/modules/:id
// @access  Private/Admin
const deleteModule = async (req, res) => {
    try {
        const module = await Module.findByIdAndDelete(req.params.id);
        
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }
        
        res.json({ message: 'Module deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete module', error: error.message });
    }
};

module.exports = {
    getModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule
};
