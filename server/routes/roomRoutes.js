// server/routes/roomRoutes.js
const express = require('express');
const { getRooms, addRoom } = require('../controllers/roomController');
const { verifyToken, requireRole } = require('../middlewares/auth');
const router = express.Router();

router.get('/', getRooms);
router.post('/', verifyToken, requireRole('admin'), addRoom);

module.exports = router;
