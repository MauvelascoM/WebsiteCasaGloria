import React, { useState } from 'react';
import api from '../services/api';

export default function AdminAddRoom() {
  const [roomData, setRoomData] = useState({
    name: '',
    description: '',
    price: '',
    capacity: '',
    images: '', // input for comma-separated URLs
  });

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...roomData,
        price: Number(roomData.price),
        capacity: Number(roomData.capacity),
        images: roomData.images.split(',').map(url => url.trim()).filter(Boolean),
      };
      await api.post('/rooms', payload);
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
      <input name="images" placeholder="Image URLs (comma-separated)" onChange={handleChange} />
      <button type="submit">Add Room</button>
    </form>
  );
}
