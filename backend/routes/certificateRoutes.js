const express = require('express');
const router = express.Router();
const { getMyCertificates, generateCertificate, getAllCertificates, verifyCertificate, updateCertificateStatus } = require('../controllers/certificateController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public: verify a certificate by certificateId
router.get('/verify/:certId', verifyCertificate);

// Admin: get all certificates
router.get('/all', protect, admin, getAllCertificates);

// Admin: update certificate status
router.put('/:id/status', protect, admin, updateCertificateStatus);

// User: get my certificates, generate certificate
router.route('/').get(protect, getMyCertificates).post(protect, generateCertificate);

module.exports = router;
