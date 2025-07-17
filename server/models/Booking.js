
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  guests: { type: Number, required: true },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  services: {
    breakfast: { type: Boolean, default: false },
    earlyCheckIn: { type: Boolean, default: false },
    pets: { type: Boolean, default: false }
  },
  guest: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    address: String
  },
  paymentMethod: { type: String, default: 'onArrival' },
  bookingId: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
