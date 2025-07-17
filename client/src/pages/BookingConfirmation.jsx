// client/src/pages/BookingConfirmation.jsx
// import React from 'react';
// import { useLocation } from 'react-router-dom';

// export default function BookingConfirmation() {
//   const location = useLocation();
//   const { bookingId } = location.state || {};

//   return (
//     <div>
//       <h2>Booking Confirmed</h2>
//       <p>Your booking has been successfully created.</p>
//       {bookingId && <p><strong>Booking ID:</strong> {bookingId}</p>}
//     </div>
//   );
// }

// BookingConfirmation.jsx – Final Confirmation Screen
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
//import './BookingConfirmation.css';

export default function BookingConfirmation() {
  const { bookingData } = useBooking();
  const navigate = useNavigate();

  if (!bookingData.bookingId) {
    return (
      <div className="step-container">
        <h2>No Booking Found</h2>
        <button onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  return (
    <div className="step-container">
      <h2>✅ Booking Confirmed!</h2>
      <p>Your booking ID is:</p>
      <p className="booking-id">{bookingData.bookingId}</p>
      <p>Thank you for your reservation. We look forward to your stay.</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
} 
