const express = require('express');
const router = express.Router();
const {
    getCheatSheets,
    getCheatSheetById,
    createCheatSheet,
    updateCheatSheet,
    deleteCheatSheet
} = require('../controllers/cheatSheetController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getCheatSheets)
    .post(protect, admin, createCheatSheet);

router.route('/:identifier')
    .get(getCheatSheetById)
    .put(protect, admin, updateCheatSheet)
    .delete(protect, admin, deleteCheatSheet);

module.exports = router;
