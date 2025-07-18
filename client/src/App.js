
// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Rooms from './pages/Rooms';
import AdminAddRoom from './pages/AdminAddRoom';
import AdminRooms from './pages/AdminRooms';
import Home from './pages/Home';
import { BookingProvider } from './context/BookingContext';
import BookingRoutes from './pages/BookingRoutes';



// A simple protected route component
const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/booking/*" element={<BookingRoutes />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/checkout" element={<Checkout />} />
              
              {/* Protected Booking Routes */}
              {/* <Route
                path="/booking/*"
                element={
                  <PrivateRoute>
                    <BookingRoutes />
                  </PrivateRoute>
                }
              /> */}

              <Route path="/adminaddroom" element={<AdminAddRoom />} />
              <Route path="/adminrooms" element={<AdminRooms />} />
            </Routes>
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
