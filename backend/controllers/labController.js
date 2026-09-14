const Lab = require('../models/Lab');

// @desc    Fetch all labs
// @route   GET /api/labs
// @access  Public
const getLabs = async (req, res) => {
    try {
        const labs = await Lab.find({}).populate('course', 'title');
        res.json(labs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Fetch single lab
// @route   GET /api/labs/:id
// @access  Public
const getLabById = async (req, res) => {
    try {
        const lab = await Lab.findById(req.params.id).populate('course', 'title');
        if (lab) {
            res.json(lab);
        } else {
            res.status(404).json({ message: 'Lab not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a lab
// @route   POST /api/labs
// @access  Private/Admin
const createLab = async (req, res) => {
    try {
        const { title, description, instructions, videoDemoUrl, codeSnippets, course } = req.body;
        const lab = new Lab({
            title,
            description,
            instructions,
            videoDemoUrl,
            codeSnippets,
            course
        });

        const createdLab = await lab.save();
        res.status(201).json(createdLab);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getLabs, getLabById, createLab };
