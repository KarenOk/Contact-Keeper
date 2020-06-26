const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");
const authMiddleware = require("../middleware/auth");


const router = express.Router();

// @route   /api/auth/
// @desc    Login a user
// @access  Public
router.post("/", [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty()
],
    async (req, res) => {

        const errors = await validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user)
                return res.status(400).json({ msg: "Invalid credentials." });

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch)
                return res.status(400).json({ msg: "Invalid credentials." });

            const jwtPayload = {
                user: { id: user.id }
            };

            jwt.sign(
                jwtPayload,
                config.get("jwtSecret"),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    return res.json({ token });
                }

            );


        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal server error.");
        }

    });

// @route   /api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error." });
    }

});

module.exports = router;