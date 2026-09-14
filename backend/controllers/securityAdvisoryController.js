const SecurityAdvisory = require('../models/SecurityAdvisory');

// @desc    Get all security advisories
// @route   GET /api/security-advisories
// @access  Public
const getSecurityAdvisories = async (req, res) => {
    try {
        const { severity, vendor } = req.query;
        const filter = { isPublished: true };
        
        if (severity) filter.severity = severity;
        if (vendor) filter.vendor = vendor;
        
        const advisories = await SecurityAdvisory.find(filter)
            .populate('vulnerabilities')
            .sort({ publishedDate: -1 })
            .limit(50);
        
        res.json(advisories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single security advisory by ID
// @route   GET /api/security-advisories/:id
// @access  Public
const getSecurityAdvisoryById = async (req, res) => {
    try {
        const advisory = await SecurityAdvisory.findOne({
            $or: [
                { _id: req.params.id },
                { advisoryId: req.params.id }
            ]
        }).populate('vulnerabilities');
        
        if (!advisory) {
            return res.status(404).json({ message: 'Security advisory not found' });
        }
        
        res.json(advisory);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new security advisory
// @route   POST /api/security-advisories
// @access  Private/Admin
const createSecurityAdvisory = async (req, res) => {
    try {
        const { advisoryId, title, summary, content, severity, vendor, product, affectedVersions, patchedVersions, vulnerabilities, recommendations, references } = req.body;
        
        const advisory = await SecurityAdvisory.create({
            advisoryId,
            title,
            summary,
            content,
            severity,
            vendor,
            product,
            affectedVersions,
            patchedVersions,
            vulnerabilities,
            recommendations,
            references
        });
        
        res.status(201).json(advisory);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create security advisory', error: error.message });
    }
};

// @desc    Update security advisory
// @route   PUT /api/security-advisories/:id
// @access  Private/Admin
const updateSecurityAdvisory = async (req, res) => {
    try {
        const advisory = await SecurityAdvisory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!advisory) {
            return res.status(404).json({ message: 'Security advisory not found' });
        }
        
        res.json(advisory);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update security advisory', error: error.message });
    }
};

// @desc    Delete security advisory
// @route   DELETE /api/security-advisories/:id
// @access  Private/Admin
const deleteSecurityAdvisory = async (req, res) => {
    try {
        const advisory = await SecurityAdvisory.findByIdAndDelete(req.params.id);
        
        if (!advisory) {
            return res.status(404).json({ message: 'Security advisory not found' });
        }
        
        res.json({ message: 'Security advisory deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete security advisory', error: error.message });
    }
};

module.exports = {
    getSecurityAdvisories,
    getSecurityAdvisoryById,
    createSecurityAdvisory,
    updateSecurityAdvisory,
    deleteSecurityAdvisory
};
