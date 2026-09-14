const CheatSheet = require('../models/CheatSheet');

// @desc    Get all cheat sheets
// @route   GET /api/cheat-sheets
// @access  Public
const getCheatSheets = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = { isPublished: true };
        
        if (category) filter.category = category;
        
        const cheatSheets = await CheatSheet.find(filter)
            .sort({ title: 1 });
        
        res.json(cheatSheets);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single cheat sheet by ID or slug
// @route   GET /api/cheat-sheets/:identifier
// @access  Public
const getCheatSheetById = async (req, res) => {
    try {
        const cheatSheet = await CheatSheet.findOne({
            $or: [
                { _id: req.params.identifier },
                { slug: req.params.identifier }
            ]
        });
        
        if (!cheatSheet) {
            return res.status(404).json({ message: 'Cheat sheet not found' });
        }
        
        // Increment download count if PDF is accessed
        if (req.query.download === 'true') {
            cheatSheet.downloadCount += 1;
            await cheatSheet.save();
        }
        
        res.json(cheatSheet);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new cheat sheet
// @route   POST /api/cheat-sheets
// @access  Private/Admin
const createCheatSheet = async (req, res) => {
    try {
        const { title, slug, description, category, content, sections, tags, pdfUrl } = req.body;
        
        const cheatSheet = await CheatSheet.create({
            title,
            slug,
            description,
            category,
            content,
            sections,
            tags,
            pdfUrl
        });
        
        res.status(201).json(cheatSheet);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create cheat sheet', error: error.message });
    }
};

// @desc    Update cheat sheet
// @route   PUT /api/cheat-sheets/:id
// @access  Private/Admin
const updateCheatSheet = async (req, res) => {
    try {
        const cheatSheet = await CheatSheet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!cheatSheet) {
            return res.status(404).json({ message: 'Cheat sheet not found' });
        }
        
        res.json(cheatSheet);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update cheat sheet', error: error.message });
    }
};

// @desc    Delete cheat sheet
// @route   DELETE /api/cheat-sheets/:id
// @access  Private/Admin
const deleteCheatSheet = async (req, res) => {
    try {
        const cheatSheet = await CheatSheet.findByIdAndDelete(req.params.id);
        
        if (!cheatSheet) {
            return res.status(404).json({ message: 'Cheat sheet not found' });
        }
        
        res.json({ message: 'Cheat sheet deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete cheat sheet', error: error.message });
    }
};

module.exports = {
    getCheatSheets,
    getCheatSheetById,
    createCheatSheet,
    updateCheatSheet,
    deleteCheatSheet
};
