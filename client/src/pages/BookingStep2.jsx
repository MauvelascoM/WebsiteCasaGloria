// BookingStep2.jsx – Select Available Room
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
//import './BookingStep2.css';

export default function BookingStep2() {
  const { bookingData, setBookingData } = useBooking();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {

      if (!bookingData.checkInDate || !bookingData.checkOutDate) {
    console.warn('No booking data, redirecting...');
    navigate('/booking/step1');
    return;
  }
    const fetchAvailableRooms = async () => {
      try {
        const res = await axios.get('https://websitecasagloria.onrender.com/api/rooms/available', {
          params: {
            checkIn: bookingData.checkInDate,
            checkOut: bookingData.checkOutDate,
            guests: bookingData.guests
          }  
        });
        console.log('Full response:', res);
        console.log('res.data:', res.data);
        setRooms(res.data);
      } catch (err) {
        setError('Failed to load available rooms.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableRooms();
  }, [bookingData, navigate]);

  const handleSelect = (room) => {
    setBookingData({ ...bookingData, selectedRoom: room });
    navigate('/booking/step3');
  };

  if (loading) return <p className="loading"><br /><br />Loading rooms...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="step-container">
      <br /><br />
      <h2>Step 2: Select a Room</h2>
     
  {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{
      width: '40%'
    }}></div>
      </div>

      <div className="room-list">
        {rooms.map((room) => (
          <div key={room._id} className="room-card">
            <img src={room.images[0]} alt={room.name} className="room-image" />
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <p><strong>Price:</strong> ${room.price*(1-(4-bookingData.guests)*0.08)} / night</p>
            <p><strong>Capacity:</strong> {room.capacity} guests</p>
            <button onClick={() => handleSelect(room)}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
}
