import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {

  const userToken = localStorage.getItem('blogUserToken');

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">yourThoughts</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/addblog">Add Blog</Link></li>
        <li><Link to="/setting">Settings</Link></li>
        {userToken ? <li><Link to="/logout">Logout</Link></li> : <li><Link to="/login">Login</Link></li>}
       

      </ul>
    </nav>
  );
}

export default Navbar;
