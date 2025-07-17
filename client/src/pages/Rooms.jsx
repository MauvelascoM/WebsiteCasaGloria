import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Rooms.css'; // We'll create this CSS file

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/rooms')
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleNext = () => {

    navigate('/booking/step1');
  };

  return (
    <div className="rooms-container">
      <h2>Habitaciones Disponibles</h2>
      {rooms.map((room) => (
        <div key={room._id} className="room-card">
          <h3>{room.name}</h3>
          <p>{room.description}</p>
          <p><strong>Precio:</strong> ${room.price} / noche</p>
          <p><strong>Capacidad:</strong> {room.capacity} personas</p>

          <div className="image-gallery">
            {room.images.map((img, idx) => (
              <img key={idx} src={img} alt={`Imagen ${idx + 1}`} />
            ))}
          </div>
          <button onClick={handleNext}>Reservar!</button>
        </div>
      ))}
    </div>
  );
}
