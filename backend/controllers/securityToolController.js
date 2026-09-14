const SecurityTool = require('../models/SecurityTool');

// @desc    Get all security tools
// @route   GET /api/security-tools
// @access  Public
const getSecurityTools = async (req, res) => {
    try {
        const { category, type, platform } = req.query;
        const filter = { isPublished: true };
        
        if (category) filter.category = category;
        if (type) filter.type = type;
        if (platform) filter.platform = platform;
        
        const tools = await SecurityTool.find(filter)
            .sort({ rating: -1, name: 1 });
        
        res.json(tools);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single security tool by ID or slug
// @route   GET /api/security-tools/:identifier
// @access  Public
const getSecurityToolById = async (req, res) => {
    try {
        const tool = await SecurityTool.findOne({
            $or: [
                { _id: req.params.identifier },
                { slug: req.params.identifier }
            ]
        });
        
        if (!tool) {
            return res.status(404).json({ message: 'Security tool not found' });
        }
        
        res.json(tool);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new security tool
// @route   POST /api/security-tools
// @access  Private/Admin
const createSecurityTool = async (req, res) => {
    try {
        const { name, slug, description, category, type, platform, officialWebsite, githubUrl, documentation, installation, usage, examples, features, tags, logo, rating } = req.body;
        
        const tool = await SecurityTool.create({
            name,
            slug,
            description,
            category,
            type,
            platform,
            officialWebsite,
            githubUrl,
            documentation,
            installation,
            usage,
            examples,
            features,
            tags,
            logo,
            rating
        });
        
        res.status(201).json(tool);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create security tool', error: error.message });
    }
};

// @desc    Update security tool
// @route   PUT /api/security-tools/:id
// @access  Private/Admin
const updateSecurityTool = async (req, res) => {
    try {
        const tool = await SecurityTool.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!tool) {
            return res.status(404).json({ message: 'Security tool not found' });
        }
        
        res.json(tool);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update security tool', error: error.message });
    }
};

// @desc    Delete security tool
// @route   DELETE /api/security-tools/:id
// @access  Private/Admin
const deleteSecurityTool = async (req, res) => {
    try {
        const tool = await SecurityTool.findByIdAndDelete(req.params.id);
        
        if (!tool) {
            return res.status(404).json({ message: 'Security tool not found' });
        }
        
        res.json({ message: 'Security tool deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete security tool', error: error.message });
    }
};

module.exports = {
    getSecurityTools,
    getSecurityToolById,
    createSecurityTool,
    updateSecurityTool,
    deleteSecurityTool
};
