// /utils/generateToken.js
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',  // Token will expire in 30 days
    });
};

module.exports = generateToken;
