// BookingStep5.jsx – Guest Info + Confirm Booking
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
//import './BookingStep5.css';

export default function BookingStep5() {
  const { bookingData, setBookingData } = useBooking();
  const navigate = useNavigate();

  const [guestInfo, setGuestInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setGuestInfo({ ...guestInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const payload = {
  checkInDate: bookingData.checkInDate,
  checkOutDate: bookingData.checkOutDate,
  guests: bookingData.guests,
  selectedRoom: bookingData.selectedRoom,
  guest: guestInfo,
  paymentMethod: ''
};

      const res = await axios.post('https://websitecasagloria.onrender.com/api/bookings', payload);

      setBookingData({ ...bookingData, bookingId: res.data.bookingId });
      navigate('/booking/confirmation');
    } catch (err) {
      console.error(err);
      setError('Failed to complete.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step-container">
      <h2>Step 5: Guest Info & Confirm</h2>

      <input
        name="fullName"
        placeholder="Full Name"
        value={guestInfo.fullName}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={guestInfo.email}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone"
        value={guestInfo.phone}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Address"
        value={guestInfo.address}
        onChange={handleChange}
      />

      {error && <p className="error">{error}</p>}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Booking...' : 'Confirm Booking'}
      </button>
    </div>
  );
} 
