const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true }, // price per night
  capacity: { type: Number, required: true }, // max guests
  images: [String], // array of image URLs
  amenities: [String], // optional list like ['AC', 'WiFi']
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);
