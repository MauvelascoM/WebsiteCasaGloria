// BookingStep1.jsx – Select dates and number of guests (with regular CSS)
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './BookingStep1.css';

export default function BookingStep1() {
  const { bookingData, setBookingData } = useBooking();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    checkInDate: bookingData.checkInDate || '',
    checkOutDate: bookingData.checkOutDate || '',
    guests: bookingData.guests || 1
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setBookingData({ ...bookingData, ...form });
    navigate('/booking/step2');
  };

  return (
    <div className="step-container">
      <h2>Step 1: Select Dates and Guests</h2>
  {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{
      width: '20%'
    }}></div>
      </div>
      
      <label>
        Check-In Date
        <input
          type="date"
          name="checkInDate"
          value={form.checkInDate}
          onChange={handleChange}
        />
      </label>

      <label>
        Check-Out Date
        <input
          type="date"
          name="checkOutDate"
          value={form.checkOutDate}
          onChange={handleChange}
        />
      </label>

      <label>
        Number of Guests
        <input
          type="number"
          name="guests"
          min="1"
          value={form.guests}
          onChange={handleChange}
        />
      </label>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
