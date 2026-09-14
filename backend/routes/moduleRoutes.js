const express = require('express');
const router = express.Router();
const {
    getModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule
} = require('../controllers/moduleController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getModules)
    .post(protect, admin, createModule);

router.route('/:id')
    .get(getModuleById)
    .put(protect, admin, updateModule)
    .delete(protect, admin, deleteModule);

module.exports = router;
