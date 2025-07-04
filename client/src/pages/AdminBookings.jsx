// client/src/pages/AdminBookings.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get('/bookings')
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Bookings (Admin)</h2>
      {bookings.map((booking) => (
        <div key={booking._id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
          <p><strong>Guest:</strong> {booking.guestName || booking.user?.name || 'N/A'}</p>
          <p><strong>Room:</strong> {booking.room.name}</p>
          <p><strong>Check In:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
          <p><strong>Check Out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {booking.status}</p>
        </div>
      ))}
    </div>
  );
}
