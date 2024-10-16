// backend/routes/propertyRoutes.js

const express = require('express');
const router = express.Router();
//const { getRecommendations } = require('../controllers/recommendationController');
const { getAllProperties,addProperty,getPropertyById } = require('../controllers/propertyController');

// Route to handle AI property recommendations
// router.get('/recommendations/:userId', getRecommendations); 
router.get('/properties', getAllProperties);
router.post('/properties', addProperty);
router.get('/properties/:id', getPropertyById);

module.exports = router;
