const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById, createBlog } = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getBlogs).post(protect, admin, createBlog);
router.route('/:id').get(getBlogById);

module.exports = router;
