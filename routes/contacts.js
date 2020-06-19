const express = require("express");
const router = express.Router();

// @route   /api/contacts/
// @desc    Get all contacts for a user
// @access  Private
router.get("/", (req, res) => {
    res.send("Get all contacts");
});

// @route  /api/contacts/
// @desc    Create a new contact
// @access  Private
router.post("/", (req, res) => {
    res.send("Create a new contact");
});

// @route   /api/contacts/:id
// @desc    Update existing contact
// @access Private
router.put("/:id", (req, res) => {
    res.send("Update an existing contact");
});

// @route   /api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete("/:id", (req, res) => {
    res.send("Delete a user");
});

module.exports = router;