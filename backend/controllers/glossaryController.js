const Glossary = require('../models/Glossary');

// @desc    Get all glossary terms
// @route   GET /api/glossary
// @access  Public
const getGlossaryTerms = async (req, res) => {
    try {
        const { category, search } = req.query;
        const filter = { isPublished: true };
        
        if (category) filter.category = category;
        if (search) {
            filter.$or = [
                { term: { $regex: search, $options: 'i' } },
                { definition: { $regex: search, $options: 'i' } }
            ];
        }
        
        const terms = await Glossary.find(filter)
            .populate('relatedTerms', 'term slug')
            .sort({ term: 1 });
        
        res.json(terms);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single glossary term by ID or slug
// @route   GET /api/glossary/:identifier
// @access  Public
const getGlossaryTermById = async (req, res) => {
    try {
        const term = await Glossary.findOne({
            $or: [
                { _id: req.params.identifier },
                { slug: req.params.identifier }
            ]
        }).populate('relatedTerms', 'term slug definition');
        
        if (!term) {
            return res.status(404).json({ message: 'Glossary term not found' });
        }
        
        res.json(term);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new glossary term
// @route   POST /api/glossary
// @access  Private/Admin
const createGlossaryTerm = async (req, res) => {
    try {
        const { term, slug, definition, detailedExplanation, category, aliases, relatedTerms, examples, references } = req.body;
        
        const glossaryTerm = await Glossary.create({
            term,
            slug,
            definition,
            detailedExplanation,
            category,
            aliases,
            relatedTerms,
            examples,
            references
        });
        
        res.status(201).json(glossaryTerm);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create glossary term', error: error.message });
    }
};

// @desc    Update glossary term
// @route   PUT /api/glossary/:id
// @access  Private/Admin
const updateGlossaryTerm = async (req, res) => {
    try {
        const term = await Glossary.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!term) {
            return res.status(404).json({ message: 'Glossary term not found' });
        }
        
        res.json(term);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update glossary term', error: error.message });
    }
};

// @desc    Delete glossary term
// @route   DELETE /api/glossary/:id
// @access  Private/Admin
const deleteGlossaryTerm = async (req, res) => {
    try {
        const term = await Glossary.findByIdAndDelete(req.params.id);
        
        if (!term) {
            return res.status(404).json({ message: 'Glossary term not found' });
        }
        
        res.json({ message: 'Glossary term deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete glossary term', error: error.message });
    }
};

module.exports = {
    getGlossaryTerms,
    getGlossaryTermById,
    createGlossaryTerm,
    updateGlossaryTerm,
    deleteGlossaryTerm
};
