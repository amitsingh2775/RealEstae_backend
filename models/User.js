// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  //  viewedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }] 
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
