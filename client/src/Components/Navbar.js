import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; 

const apiUrl = 'http://localhost:4000';

const Navbar = () => {
  const userToken = localStorage.getItem('blogUserToken');
  const [userInfo, setUserInfo] = useState([]);
  
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${apiUrl}/user-info `, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('blogUserToken')}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUserInfo(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const logoutHandler = () => {
    const confirmLogout = window.confirm("Are you sure want to logout?")
    if (confirmLogout) {
      localStorage.removeItem('blogUserToken');
    }
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/" activeClassName="active">yourThoughts</NavLink>
        {userInfo ? (
          <span className='identity'>({userInfo.firstname} {userInfo.lastname})</span>
        ) : null}
      </div>
      <ul className="nav-links">
        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/profile" activeClassName="active">Profile</NavLink></li>
        <li><NavLink to="/addblog" activeClassName="active">Add Blog</NavLink></li>
        <li><NavLink to="/setting" activeClassName="active">Settings</NavLink></li>
        {userToken ? (
          <li><button className='logout' onClick={logoutHandler}>Logout</button></li>
        ) : (
          <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
