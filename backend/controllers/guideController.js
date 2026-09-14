const Guide = require('../models/Guide');

// @desc    Get all guides
// @route   GET /api/guides
// @access  Public
const getGuides = async (req, res) => {
    try {
        const { category, difficulty } = req.query;
        const filter = { isPublished: true };
        
        if (category) filter.category = category;
        if (difficulty) filter.difficulty = difficulty;
        
        const guides = await Guide.find(filter)
            .sort({ createdAt: -1 });
        
        res.json(guides);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single guide by ID or slug
// @route   GET /api/guides/:identifier
// @access  Public
const getGuideById = async (req, res) => {
    try {
        const guide = await Guide.findOne({
            $or: [
                { _id: req.params.identifier },
                { slug: req.params.identifier }
            ]
        });
        
        if (!guide) {
            return res.status(404).json({ message: 'Guide not found' });
        }
        
        // Increment views
        guide.views += 1;
        await guide.save();
        
        res.json(guide);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new guide
// @route   POST /api/guides
// @access  Private/Admin
const createGuide = async (req, res) => {
    try {
        const { title, slug, description, category, difficulty, content, tableOfContents, estimatedTime, prerequisites, tools, tags, author } = req.body;
        
        const guide = await Guide.create({
            title,
            slug,
            description,
            category,
            difficulty,
            content,
            tableOfContents,
            estimatedTime,
            prerequisites,
            tools,
            tags,
            author
        });
        
        res.status(201).json(guide);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create guide', error: error.message });
    }
};

// @desc    Update guide
// @route   PUT /api/guides/:id
// @access  Private/Admin
const updateGuide = async (req, res) => {
    try {
        const guide = await Guide.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!guide) {
            return res.status(404).json({ message: 'Guide not found' });
        }
        
        res.json(guide);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update guide', error: error.message });
    }
};

// @desc    Delete guide
// @route   DELETE /api/guides/:id
// @access  Private/Admin
const deleteGuide = async (req, res) => {
    try {
        const guide = await Guide.findByIdAndDelete(req.params.id);
        
        if (!guide) {
            return res.status(404).json({ message: 'Guide not found' });
        }
        
        res.json({ message: 'Guide deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete guide', error: error.message });
    }
};

module.exports = {
    getGuides,
    getGuideById,
    createGuide,
    updateGuide,
    deleteGuide
};
