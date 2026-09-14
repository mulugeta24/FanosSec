const Contact = require('../models/Contact');

// @desc    Submit a contact message
// @route   POST /api/contacts
// @access  Public
const submitContact = async (req, res) => {
    try {
        const { name, email, message, fileUrl } = req.body;
        const contact = new Contact({ name, email, message, fileUrl });
        const submittedContact = await contact.save();
        res.status(201).json(submittedContact);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) return res.status(404).json({ message: 'Not found' });
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { submitContact, getContacts, updateContact };
