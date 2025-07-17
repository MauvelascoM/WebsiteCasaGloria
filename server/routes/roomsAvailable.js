// GET /api/rooms/available
// router.get('rooms/available', async (req, res) => {
//   const { checkIn, checkOut, guests } = req.query;

//   try {
//     const rooms = await Room.find({
//       capacity: { $gte: guests }
//     });

//     // Filter rooms based on existing bookings
//     const bookings = await Booking.find({
//       $or: [
//         { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } }
//       ]
//     });

//     const bookedRoomIds = bookings.map(b => b.roomId.toString());

//     const availableRooms = rooms.filter(
//       room => !bookedRoomIds.includes(room._id.toString())
//     );

//     res.json(availableRooms);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });
