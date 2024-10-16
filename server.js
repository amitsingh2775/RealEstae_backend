// backend/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

dotenv.config();

// Update CORS configuration
const corsOptions = {
    origin: 'https://real-estate-lyart-rho.vercel.app/',  // The frontend URL
    credentials: true,  // Allow credentials (cookies)
};

// Initialize Express app
const app = express();

// Middleware
app.use(cors(corsOptions));  // Use updated CORS options
app.use(express.json()); // To parse JSON data
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/property', require('./routes/propertyRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
