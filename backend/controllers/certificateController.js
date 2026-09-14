const Certificate = require('../models/Certificate');
const Course = require('../models/Course');
const { generateCertificatePDF } = require('../utils/pdfGenerator');
const path = require('path');

// @desc    Fetch all certificates for logged in user
// @route   GET /api/certificates
// @access  Private
const getMyCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find({ user: req.user._id }).populate('course', 'title');
        res.json(certificates);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Generate a certificate
// @route   POST /api/certificates
// @access  Private
const generateCertificate = async (req, res) => {
    try {
        const { courseId } = req.body;

        // Check if certificate already exists
        const existingCert = await Certificate.findOne({ user: req.user._id, course: courseId });
        if (existingCert) {
            return res.status(400).json({ message: 'Certificate already generated for this course' });
        }

        const course = await Course.findById(courseId);
        if (!course) {
             return res.status(404).json({ message: 'Course not found' });
        }

        const certificateId = `CCH-${Math.floor(100000 + Math.random() * 900000)}`;
        const fileName = `${certificateId}.pdf`;
        const outputPath = path.join(__dirname, '..', 'public', 'certificates', fileName);

        // Generate the PDF file physically
        await generateCertificatePDF({
             userName: req.user.name,
             courseName: course.title,
             certificateId: certificateId,
             issuedAt: new Date()
        }, outputPath);

        const certificate = new Certificate({
            user: req.user._id,
            course: courseId,
            certificateId,
            pdfUrl: `/public/certificates/${fileName}` // Save static path
        });

        const createdCertificate = await certificate.save();
        res.status(201).json(createdCertificate);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get ALL certificates (admin only)
// @route   GET /api/certificates/all
// @access  Private/Admin
const getAllCertificates = async (req, res) => {
    try {
        const { search, page = 1, limit = 20 } = req.query;
        const query = {};

        if (search) {
            query.certificateId = { $regex: search, $options: 'i' };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await Certificate.countDocuments(query);
        const certificates = await Certificate.find(query)
            .populate('user', 'name email')
            .populate('course', 'title category')
            .sort({ issuedAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.json({ certificates, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Verify a certificate by ID (public)
// @route   GET /api/certificates/verify/:certId
// @access  Public
const verifyCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findOne({ certificateId: req.params.certId })
            .populate('user', 'name email')
            .populate('course', 'title category');

        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found. Please check the ID and try again.' });
        }

        res.json({
            valid: true,
            certificateId: certificate.certificateId,
            studentName: certificate.user?.name || 'Verified Graduate',
            courseName: certificate.course?.title || 'FANOS SEC Certification',
            issuedAt: certificate.issuedAt,
            status: certificate.status || 'active',
            issuer: 'FANOS SEC Cybersecurity Academy'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update certificate status (admin only)
// @route   PUT /api/certificates/:id/status
// @access  Private/Admin
const updateCertificateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['active', 'revoked', 'expired'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const certificate = await Certificate.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('user', 'name email').populate('course', 'title');

        if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
        res.json(certificate);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getMyCertificates, generateCertificate, getAllCertificates, verifyCertificate, updateCertificateStatus };
