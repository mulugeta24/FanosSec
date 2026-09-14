const express = require('express');
const router = express.Router();
const {
    getGlossaryTerms,
    getGlossaryTermById,
    createGlossaryTerm,
    updateGlossaryTerm,
    deleteGlossaryTerm
} = require('../controllers/glossaryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getGlossaryTerms)
    .post(protect, admin, createGlossaryTerm);

router.route('/:identifier')
    .get(getGlossaryTermById)
    .put(protect, admin, updateGlossaryTerm)
    .delete(protect, admin, deleteGlossaryTerm);

module.exports = router;
