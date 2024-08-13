import React,{useState} from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';



const Navabr = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">My Blog</Link>
      </div>
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/writeblog">Write Blogs</Link></li>
      </ul>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        <span className="navbar-toggle-icon">&#9776;</span>
      </div>
    </nav>
  )
}

export default Navabr