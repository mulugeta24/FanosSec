const express = require('express');
const router = express.Router();
const { submitContact, getContacts, updateContact } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(submitContact).get(protect, admin, getContacts);
router.route('/:id').put(protect, admin, updateContact);

module.exports = router;
