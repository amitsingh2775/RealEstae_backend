// backend/models/Property.js
const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    price: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: Number, required: true }, // in sq. feet
    description: { type: String, required: true },
    image: {
        type: String,
        default: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
});

module.exports = mongoose.model('Property', PropertySchema);

