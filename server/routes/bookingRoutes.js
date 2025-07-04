// server/routes/bookingRoutes.js
const express = require('express');
const { createBooking, getUserBookings, getAllBookings } = require('../controllers/bookingController');
const { verifyToken, requireRole } = require('../middlewares/auth');
const router = express.Router();

router.post('/', createBooking);
router.get('/me', verifyToken, getUserBookings);
router.get('/all', verifyToken, requireRole('admin'), getAllBookings);

module.exports = router;
