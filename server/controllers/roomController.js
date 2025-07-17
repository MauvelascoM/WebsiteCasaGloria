// server/controllers/roomController.js
const Room = require('../models/Room');
const Booking = require('../models/Booking');

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addRoom = async (req, res) => {
  try {
    const { name, price, capacity, description, images } = req.body;
    const newRoom = new Room({ name, price, capacity, description, images });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAvailableRooms = async (req, res) => {
  const { checkIn, checkOut, guests } = req.query;

  try {
    const rooms = await Room.find({
      capacity: { $gte: guests }
    });

    const bookings = await Booking.find({
      $or: [
        { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } }
      ]
    });

    const bookedRoomIds = bookings.map(b => b.roomId.toString());

    const availableRooms = rooms.filter(
      room => !bookedRoomIds.includes(room._id.toString())
    );

    res.json(availableRooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
