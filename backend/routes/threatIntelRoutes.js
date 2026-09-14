const express = require('express');
const router = express.Router();
const {
    getThreatIntel,
    getThreatIntelById,
    createThreatIntel,
    updateThreatIntel,
    deleteThreatIntel
} = require('../controllers/threatIntelController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getThreatIntel)
    .post(protect, admin, createThreatIntel);

router.route('/:id')
    .get(getThreatIntelById)
    .put(protect, admin, updateThreatIntel)
    .delete(protect, admin, deleteThreatIntel);

module.exports = router;
