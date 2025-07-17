// BookingStep3.jsx – Optional Services
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
//import './BookingStep3.css';

export default function BookingStep3() {
  const { bookingData, setBookingData } = useBooking();
  const navigate = useNavigate();

  const [services, setServices] = useState({
    breakfast: bookingData.optionalServices?.breakfast || false,
    earlyCheckIn: bookingData.optionalServices?.earlyCheckIn || false,
    pets: bookingData.optionalServices?.pets || false
  });

  const handleChange = (e) => {
    setServices({ ...services, [e.target.name]: e.target.checked });
  };

  const handleNext = () => {
    setBookingData({ ...bookingData, optionalServices: services });
    navigate('/booking/step4');
  };

  return (
    <div className="step-container">
      <h2>Step 3: Optional Services</h2>
  {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{
      width: '60%'
    }}></div>
      </div>
      <label>
        <input
          type="checkbox"
          name="breakfast"
          checked={services.breakfast}
          onChange={handleChange}
        />
        Breakfast
      </label>

      <label>
        <input
          type="checkbox"
          name="earlyCheckIn"
          checked={services.earlyCheckIn}
          onChange={handleChange}
        />
        Early Check-In
      </label>

      <label>
        <input
          type="checkbox"
          name="pets"
          checked={services.pets}
          onChange={handleChange}
        />
        Pets Allowed
      </label>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
