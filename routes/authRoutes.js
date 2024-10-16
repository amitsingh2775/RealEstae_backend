// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser,getUserProfile } = require('../controllers/authController');
const authMiddleware=require('../middleware/authMiddleware')

// Route for registering a new user
router.post('/register', registerUser);

// Route for logging in
router.post('/login', loginUser);

// Route for logging out
router.post('/logout', logoutUser);
router.get('/profile', authMiddleware, getUserProfile);
module.exports = router;
