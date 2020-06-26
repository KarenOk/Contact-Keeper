const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const User = require("../models/User");
const Contact = require("../models/Contact");
const authMiddleware = require("../middleware/auth");

// @route   /api/contacts/
// @desc    Get all contacts for a user
// @access  Private
router.get("/", authMiddleware, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ name: "asc" });
        return res.json(contacts);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Internal server error.");
    }
    res.send("Get all contacts");
});

// @route  /api/contacts/
// @desc    Create a new contact
// @access  Private
router.post("/", [authMiddleware, [
    check('name', 'Name is required.').exists()
]], async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { name, email, phone, type } = req.body;
    try {
        let contact = Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        contact = await contact.save();

        return res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// @route   /api/contacts/:id
// @desc    Update existing contact
// @access Private
router.put("/:id", authMiddleware, async (req, res) => {
    const { name, email, type, phone } = req.body;

    const contactInfo = {};
    if (name) contactInfo.name = name;
    if (phone) contactInfo.phone = phone;
    if (email) contactInfo.email = email;
    if (type) contactInfo.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact)
            return res.status(404).json({ msg: "Contact not found." });

        if (contact.user.toString() !== req.user.id)
            return res.status(401).json({ msg: "You're not authorized to update this contact." });

        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactInfo },
            { new: true });

        return res.json(contact);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error.");
    }
});

// @route   /api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: "Contact not found" });

        if (contact.user.toString() !== req.user.id)
            return res.status(401).json({ msg: "You are not authorized to delete this contact." });

        await Contact.findByIdAndRemove(req.params.id);

        return res.json({ msg: "Contact deleted succesfully" });

    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;