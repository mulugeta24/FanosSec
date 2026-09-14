const express = require('express');
const router = express.Router();
const { getPaths, getPathById, createPath, updatePath, deletePath } = require('../controllers/pathController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getPaths).post(protect, admin, createPath);
router.route('/:id').get(getPathById).put(protect, admin, updatePath).delete(protect, admin, deletePath);

module.exports = router;
