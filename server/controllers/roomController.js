// server/controllers/roomController.js
const Room = require('../models/Room');

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
    const { name, price, capacity, description, imageUrl } = req.body;
    const newRoom = new Room({ name, price, capacity, description, imageUrl });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
