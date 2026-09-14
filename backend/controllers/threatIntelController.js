const ThreatIntel = require('../models/ThreatIntel');

// @desc    Get all threat intelligence
// @route   GET /api/threat-intel
// @access  Public
const getThreatIntel = async (req, res) => {
    try {
        const { threatType, severity } = req.query;
        const filter = { isPublished: true };
        
        if (threatType) filter.threatType = threatType;
        if (severity) filter.severity = severity;
        
        const threatIntel = await ThreatIntel.find(filter)
            .sort({ publishedDate: -1 })
            .limit(50);
        
        res.json(threatIntel);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single threat intelligence by ID
// @route   GET /api/threat-intel/:id
// @access  Public
const getThreatIntelById = async (req, res) => {
    try {
        const threatIntel = await ThreatIntel.findById(req.params.id);
        
        if (!threatIntel) {
            return res.status(404).json({ message: 'Threat intelligence not found' });
        }
        
        res.json(threatIntel);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new threat intelligence
// @route   POST /api/threat-intel
// @access  Private/Admin
const createThreatIntel = async (req, res) => {
    try {
        const { title, threatType, severity, description, threatActor, indicators, affectedSectors, geography, ttps, mitigation, references } = req.body;
        
        const threatIntel = await ThreatIntel.create({
            title,
            threatType,
            severity,
            description,
            threatActor,
            indicators,
            affectedSectors,
            geography,
            ttps,
            mitigation,
            references
        });
        
        res.status(201).json(threatIntel);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create threat intelligence', error: error.message });
    }
};

// @desc    Update threat intelligence
// @route   PUT /api/threat-intel/:id
// @access  Private/Admin
const updateThreatIntel = async (req, res) => {
    try {
        const threatIntel = await ThreatIntel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!threatIntel) {
            return res.status(404).json({ message: 'Threat intelligence not found' });
        }
        
        res.json(threatIntel);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update threat intelligence', error: error.message });
    }
};

// @desc    Delete threat intelligence
// @route   DELETE /api/threat-intel/:id
// @access  Private/Admin
const deleteThreatIntel = async (req, res) => {
    try {
        const threatIntel = await ThreatIntel.findByIdAndDelete(req.params.id);
        
        if (!threatIntel) {
            return res.status(404).json({ message: 'Threat intelligence not found' });
        }
        
        res.json({ message: 'Threat intelligence deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete threat intelligence', error: error.message });
    }
};

module.exports = {
    getThreatIntel,
    getThreatIntelById,
    createThreatIntel,
    updateThreatIntel,
    deleteThreatIntel
};
