// backend/controllers/propertyController.js
const Property = require('../models/Property');

// Get all properties
const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();  // Fetch all properties from the DB
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties' });
    }
};

// Add a new property (for testing, or adding dummy data)
const addProperty = async (req, res) => {
    try {
        const newProperty = await new Property(req.body);
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(400).json({ message: 'Error adding property' });
    }
};
const getPropertyById = async (req, res) => {
    try {
      const propertyId = req.params.id;
      
      // Find property by ID
      const property = await Property.findById(propertyId);
  
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      res.status(200).json(property);
    } catch (err) {
      console.error('Error fetching property:', err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
module.exports = {
    getAllProperties,
    addProperty,
    getPropertyById
};
