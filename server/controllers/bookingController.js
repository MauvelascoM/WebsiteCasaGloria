// server/controllers/bookingController.js
const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  console.log('Received booking payload:', req.body);
  try {
  const { checkInDate, checkOutDate, guests, roomId, optionalServices, guest, paymentMethod } = req.body;

    if (!selectedRoom || !checkInDate || !checkOutDate || !guest?.fullName || !guest?.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate a unique bookingId (e.g., timestamp + random)
    const bookingId = `BK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const booking = new Booking({
  checkInDate,
  checkOutDate,
  guests,
  roomId,
  services: optionalServices || {},
  guest,
  paymentMethod: paymentMethod || 'onArrival',
  bookingId
});

    await booking.save();

    console.log('Booking created:', booking);
    res.status(201).json({ message: 'Booking successful', bookingId: booking.bookingId });
  } catch (err) {
    console.error('Booking creation failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('room');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('room').populate('user', 'name email');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
