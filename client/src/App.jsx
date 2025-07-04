// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Booking from './pages/Booking';




// A simple protected route component
const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Booking />} />
       
        <Route path="/checkout" element={<Checkout />} />
          {/* Example of a protected route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div>
                  <h2>Dashboard (protected)</h2>
                  {/* Here you will later add booking/room pages */}
                </div>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
