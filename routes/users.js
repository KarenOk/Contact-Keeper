const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require('express-validator');

const User = require("../models/User");

const router = express.Router();

// @route   api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", [
    check("name", "No name provided.").not().isEmpty(),
    check("email", "Enter a valid email.").isEmail(),
    check("password", "Enter a password with 6 characters or more.").isLength({
        min: 6
    })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, password, email } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ msg: "A user with this email already exists." });

            user = await User({ name, password, email });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const jwtPayload = {
                user: { id: user.id }
            };

            jwt.sign(
                jwtPayload,
                config.get("jwtSecret"),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    return res.json({ token: token });
                });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Something went wrong on our end." });
        }

    });

module.exports = router;