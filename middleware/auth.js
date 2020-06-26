const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
    const token = req.header('x-api-key');

    if (!token)
        return res.status(401).json({ msg: 'No token, unauthorized. ' });

    try {
        let payload = await jwt.verify(token, config.get("jwtSecret"));
        req.user = payload.user;
        next();

    } catch (error) {
        console.error(error.message);
        return res.status(401).json({ msg: "Invalid token." });
    }
};