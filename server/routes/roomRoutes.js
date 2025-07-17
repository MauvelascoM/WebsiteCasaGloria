// server/routes/roomRoutes.js
const express = require('express');
const Room = require('../models/Room');
const {
  getRooms,
  addRoom,
  getAvailableRooms
} = require('../controllers/roomController');
const { verifyToken, requireRole } = require('../middlewares/auth');

const router = express.Router();

router.get('/', getRooms);
router.get('/available', getAvailableRooms); 
router.post('/', verifyToken, requireRole('admin'), addRoom);
router.put('/:id/add-image', async (req, res) => {
  const { id } = req.params;
  const { images } = req.body;

  console.log('Incoming request:', { id, images });


  if (!images) {
    console.warn('Missing imageUrl');
    return res.status(400).json({ error: 'Image URL required' });
  }

  try {
    const room = await Room.findById(id);
    if (!room) {
      console.warn('Room not found:', id);
      return res.status(404).json({ error: 'Room not found' });
    }

    room.images.push(images);
    await room.save();
    console.log('Image added successfully');
    res.json({ message: 'Image added', room });
  } catch (err) {
    console.error('Failed to add image:', err);
    res.status(500).json({ error: 'Failed to add image' });
  }
});


module.exports = router;

