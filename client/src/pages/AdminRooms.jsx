// client/src/pages/AdminRooms.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ImageUploader from '../components/imageuploader';
export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
console.log('Rooms state:', rooms);
  useEffect(() => {
    api.get('/rooms')
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Manage Rooms (Admin)</h2>
      {rooms.map((room) => (
        <div key={room._id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
          <h3>{room.name}</h3>
          <p>{room.description}</p>
          <p><strong>Price:</strong> ${room.price}</p>
          <p><strong>Capacity:</strong> {room.capacity}</p>
           <div>
      <h4>Images:</h4>
      <ImageUploader roomId={room._id} />
      {room.images?.map((img, idx) => (
        <img key={idx} src={img} alt="Room" style={{ width: '100px', marginRight: '8px' }} />
      ))}
    </div>
    
        </div>

      ))}
    </div>
  );
}
