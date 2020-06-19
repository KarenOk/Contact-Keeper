const express = require("express");
const router = express.Router();

// @route   /api/auth/
// @desc    Login a user
// @access  Public
router.post("/", (req, res) => {
    res.send("Login a user");
});

// @route   /api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", (req, res) => {
    res.send("Get a logged in user");
});

module.exports = router;