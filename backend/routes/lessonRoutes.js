const express = require('express');
const router = express.Router();
const {
    getLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson
} = require('../controllers/lessonController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getLessons)
    .post(protect, admin, createLesson);

router.route('/:id')
    .get(getLessonById)
    .put(protect, admin, updateLesson)
    .delete(protect, admin, deleteLesson);

module.exports = router;
