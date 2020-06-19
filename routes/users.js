const express = require("express");
const router = express.Router();


// @route   api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", (req, res) => res.send("Register a user"));

module.exports = router;