import { Link } from 'react-router-dom';
import './Navbar.css'; 

export default function Navbar() {
  return (
    <nav className="navbar">


   <div className="navbar">
      <div className="nav-left">    
        
         <ul className="navbar-menu">
            <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/login" className="navbar-link">Login</Link></li>
          <li><Link to="/register" className="navbar-link">Register</Link></li>
          {/* <li><Link to="/booking" className="navbar-link">Booking</Link></li> */}
        </ul></div>
      <div className="nav-center"><img src="/IMAGOTIPO.jpg" alt="" width={50}/></div> 
      <div className="nav-right">
        <span>📞 +41 22 779 33 33</span>
        <span className="book-now"><Link to="/booking" className="navbar-link">📩 Book Now </Link></span>
      </div>
    </div>

    </nav>
  );
}
