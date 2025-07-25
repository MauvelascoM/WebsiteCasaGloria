
// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const roomRoutes = require('./routes/roomRoutes');
const paypalRoutes = require('./routes/paypalRoutes');
// const roomAvailableRoutes = require('./routes/roomsAvailable');


dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'https://casagloriaclient.onrender.com',
   methods: ['GET', 'POST','PUT'],
   credentials: true
}));
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/paypal', paypalRoutes);
// app.use('/api/rooms/available', roomAvailableRoutes);


// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
