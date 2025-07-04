// server/controllers/bookingController.js
const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    // Allow user or guest booking (optional user id)
    const { room, checkIn, checkOut, guestName } = req.body;
    const user = req.user?.id || null;

    if (!room || !checkIn || !checkOut) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    const booking = new Booking({ user, room, checkIn, checkOut, guestName, status: 'pending' });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
