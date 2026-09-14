const express = require('express');
const router = express.Router();
const { enroll, getProgress, updateTopic, issueCertificate } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:courseId', protect, enroll);
router.get('/:courseId', protect, getProgress);
router.patch('/:courseId/topic', protect, updateTopic);
router.post('/:courseId/certificate', protect, issueCertificate);

module.exports = router;
