// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // This should correctly point to the User model
const generateToken = require('../utils/generateToken');

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const userExists = await User.findOne({ email });  // Check if user exists
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, password: bcrypt.hashSync(password, 10) });
        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
            console.log("wrong");
            
        }

        // Generate JWT token
        const token = generateToken(user._id);

        // Set token in a cookie with HttpOnly flag (for security)
        res.status(200).json({
            message: 'Login successful',
            token, // Include token here
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout user
const logoutUser = (req, res) => {
    // Clear the JWT cookie by setting it to expire in the past
    res.cookie('token', '', {
        httpOnly: true,   // Same security as when setting the token
        secure: process.env.NODE_ENV === 'production',  // Set to true in production for HTTPS
        expires: new Date(0),  // Expire the cookie immediately
    });

    res.json({ message: 'Logout successful' });
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the decoded token (added by middleware)
        
        const user = await User.findById(userId).select('-password'); // Exclude the password from the profile
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Return the user profile data (excluding password)
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, logoutUser,getUserProfile };
