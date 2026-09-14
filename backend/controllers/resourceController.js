const Resource = require('../models/Resource');

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
const getResources = async (req, res) => {
    try {
        const { type, category, course } = req.query;
        const filter = {};
        
        if (type) filter.type = type;
        if (category) filter.category = category;
        if (course) filter.course = course;
        
        const resources = await Resource.find(filter)
            .populate('course', 'title')
            .populate('lesson', 'title')
            .sort({ createdAt: -1 });
        
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single resource by ID
// @route   GET /api/resources/:id
// @access  Public
const getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id)
            .populate('course')
            .populate('lesson');
        
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        
        // Increment download count
        resource.downloadCount += 1;
        await resource.save();
        
        res.json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new resource
// @route   POST /api/resources
// @access  Private/Admin
const createResource = async (req, res) => {
    try {
        const { title, description, type, fileUrl, fileSize, category, course, lesson } = req.body;
        
        const resource = await Resource.create({
            title,
            description,
            type,
            fileUrl,
            fileSize,
            category,
            course,
            lesson
        });
        
        res.status(201).json(resource);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create resource', error: error.message });
    }
};

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private/Admin
const updateResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        
        res.json(resource);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update resource', error: error.message });
    }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private/Admin
const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);
        
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        
        res.json({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete resource', error: error.message });
    }
};

module.exports = {
    getResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource
};
