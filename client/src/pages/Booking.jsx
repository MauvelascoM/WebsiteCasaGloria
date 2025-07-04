// client/src/pages/Booking.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

export default function Booking() {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestName, setGuestName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/rooms')
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/bookings', { room, checkIn, checkOut, guestName });
      alert('Booking created!');
      navigate('/confirmation', { state: { bookingId: res.data._id } });
    } catch (err) {
      console.error(err);
      alert('Booking failed');
    }
  };

  return (
    <div class = "contact-form">
      <br /><br /><br /><br />
    <form onSubmit={handleSubmit}>
      <h2>Create Booking</h2>
      <label>Selecciona una Habitacion:</label>
      <select value={room} onChange={(e) => setRoom(e.target.value)} required>
        <option value="">...</option>
        {rooms.map((r) => (
          <option key={r._id} value={r._id}>{r.name}</option>
        ))}
      </select>
      <br />
      <label>Dia de ingreso</label>
      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
      <br />
      <label>Dia de Salida</label>
      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
      <br />
      <label>Nombre:</label>
      <input placeholder="..." value={guestName} onChange={(e) => setGuestName(e.target.value)} />
      <button type="submit">Reservar!</button>
    </form>
    </div>
  );
}