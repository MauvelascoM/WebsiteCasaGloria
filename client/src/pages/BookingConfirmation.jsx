// client/src/pages/BookingConfirmation.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function BookingConfirmation() {
  const location = useLocation();
  const { bookingId } = location.state || {};

  return (
    <div>
      <h2>Booking Confirmed</h2>
      <p>Your booking has been successfully created.</p>
      {bookingId && <p><strong>Booking ID:</strong> {bookingId}</p>}
    </div>
  );
}