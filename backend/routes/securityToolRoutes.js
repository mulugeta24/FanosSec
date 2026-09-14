const express = require('express');
const router = express.Router();
const {
    getSecurityTools,
    getSecurityToolById,
    createSecurityTool,
    updateSecurityTool,
    deleteSecurityTool
} = require('../controllers/securityToolController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getSecurityTools)
    .post(protect, admin, createSecurityTool);

router.route('/:identifier')
    .get(getSecurityToolById)
    .put(protect, admin, updateSecurityTool)
    .delete(protect, admin, deleteSecurityTool);

module.exports = router;
