import React, { useState } from 'react';
import api from '../services/api';

export default function ImageUploader({ roomId }) {
  const [images, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  console.log('ImageUploader rendered for room:', roomId);
  const handleAddImage = async () => {
    
    try {
      await api.put(`/rooms/${roomId}/add-image`, { images });
      setMessage('Image added!');
      setImageUrl('');
    }


     catch (err) {
      console.error(err);
      setMessage('Failed to add');
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <input
        type="text"
        placeholder="Image URL"
        value={images}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleAddImage}>Add Image</button>
      <p>{message}</p>
    </div>
  );
}
