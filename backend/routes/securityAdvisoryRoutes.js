const express = require('express');
const router = express.Router();
const {
    getSecurityAdvisories,
    getSecurityAdvisoryById,
    createSecurityAdvisory,
    updateSecurityAdvisory,
    deleteSecurityAdvisory
} = require('../controllers/securityAdvisoryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getSecurityAdvisories)
    .post(protect, admin, createSecurityAdvisory);

router.route('/:id')
    .get(getSecurityAdvisoryById)
    .put(protect, admin, updateSecurityAdvisory)
    .delete(protect, admin, deleteSecurityAdvisory);

module.exports = router;
