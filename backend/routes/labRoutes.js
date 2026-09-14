const express = require('express');
const router = express.Router();
const { getLabs, getLabById, createLab } = require('../controllers/labController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getLabs).post(protect, admin, createLab);
router.route('/:id').get(getLabById);

module.exports = router;
