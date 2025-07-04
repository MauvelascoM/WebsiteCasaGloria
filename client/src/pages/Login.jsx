// client/src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert('Logged in!');
    } catch {
      alert('Login failed');
    }
  };

  return (


<div class="login-container">
  <br /><br /><br /><br /><br /><br />
    <div class="welcome-section">
        <h1>Welcome Back</h1>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <div class="social-icons">
            <i>🔵</i>
            <i>🐦</i>
            <i>📸</i>
            <i>▶️</i>
        </div>
    </div>
    <div class ="login-form">
    <form onSubmit={handleSubmit}>
      <label >Direccion de Email:</label>
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <label >Contraseña:</label>
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
</div>

    </div>





  );
}
