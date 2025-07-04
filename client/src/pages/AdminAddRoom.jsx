import React, { useState } from 'react';
import api from '../services/api';

export default function AdminAddRoom() {
  const [roomData, setRoomData] = useState({
    name: '',
    description: '',
    price: '',
    capacity: '',
  });

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/rooms', roomData);
      alert('Room added!');
    } catch (err) {
      console.error(err);
      alert('Failed to add room');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Room</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
      <input name="capacity" type="number" placeholder="Capacity" onChange={handleChange} required />
      <button type="submit">Add Room</button>
    </form>
  );
}
