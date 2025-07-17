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
          <li><Link to="/rooms" className="navbar-link">Rooms</Link></li>
        </ul></div>
      <div className="nav-center"><img src="/IMAGOTIPO.jpg" alt="" width={50}/></div> 
      <div className="nav-right">
        <span>📞 +427 1 650 602</span>
        <span className="book-now"><Link to="/booking/step1" className="navbar-link">📩 Book Now </Link></span>
      </div>
    </div>

    </nav>
  );
}
