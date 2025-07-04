// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Booking from './pages/Booking';
import AdminAddRoom from './pages/AdminAddRoom';
import Home from './pages/Home';



// A simple protected route component
const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
<AuthProvider>
        <Router>
      
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>

    </Router>
</AuthProvider>
    // <AuthProvider>
    //   <Router>
    //     <Routes>
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/register" element={<Register />} />
    //        <Route path="/booking" element={<Booking />} />
    //       <Route path="/adminaddroom" element={<AdminAddRoom />} />
    //     <Route path="/checkout" element={<Checkout />} />
    //       {/* Example of a protected route */}
    //       <Route
    //         path="/dashboard"
    //         element={
    //           <PrivateRoute>
    //             <div>
    //               <h2>Dashboard (protected)</h2>
    //               {/* Here you will later add booking/room pages */}
    //             </div>
    //           </PrivateRoute>
    //         }
    //       />
    //       <Route path="*" element={<Navigate to="/login" />} />
    //     </Routes>
    //   </Router>
    // </AuthProvider>
  );
}

export default App;
