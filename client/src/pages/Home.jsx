import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useBooking } from '../context/BookingContext';





export default function Home() {

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
    <div className="hero-container" style={{ backgroundImage: `url(/hero.jpg)` }}>
    
      <div className="hero-text">
        <h1>Casa Gloria</h1>
        <h2>Tequisquiapan, Queretaro, Mexico</h2>
      </div>

<div className="hero-booking">

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

      <button onClick={handleNext}>Reservar!</button>
    </div>

    </div>
    

    
  );
}
