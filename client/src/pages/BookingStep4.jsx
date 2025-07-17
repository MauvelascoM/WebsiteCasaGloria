// BookingStep4.jsx – Booking Summary
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
//import './BookingStep4.css';

export default function BookingStep4() {
  const { bookingData } = useBooking();
  const navigate = useNavigate();

  const { checkInDate, checkOutDate, guests, selectedRoom, optionalServices } = bookingData;

  const totalNights = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);
  const roomCost = selectedRoom?.price || 0;
  const servicesCost =
    (optionalServices?.breakfast ? 10 : 0) +
    (optionalServices?.earlyCheckIn ? 15 : 0) +
    (optionalServices?.pets ? 20 : 0);
  const totalCost = totalNights * roomCost + servicesCost;

  return (
    <div className="step-container">
      <h2>Step 4: Booking Summary</h2>

  {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{
      width: '80%'
    }}></div>
      </div>
      <div className="summary-box">
        <p><strong>Check-In:</strong> {checkInDate}</p>
        <p><strong>Check-Out:</strong> {checkOutDate}</p>
        <p><strong>Guests:</strong> {guests}</p>
        <p><strong>Room:</strong> {selectedRoom?.name}</p>
        <p><strong>Price per night:</strong> ${roomCost}</p>
        <p><strong>Nights:</strong> {totalNights}</p>
        <p><strong>Services:</strong></p>
        <ul>
          {optionalServices?.breakfast && <li>Breakfast ($10)</li>}
          {optionalServices?.earlyCheckIn && <li>Early Check-In ($15)</li>}
          {optionalServices?.pets && <li>Pets Allowed ($20)</li>}
          {!optionalServices?.breakfast &&
            !optionalServices?.earlyCheckIn &&
            !optionalServices?.pets && <li>No additional services</li>}
        </ul>
        <p><strong>Total Cost:</strong> ${totalCost}</p>
      </div>

      <button onClick={() => navigate('/booking/step5')}>Proceed to Payment</button>
    </div>
  );
} 
