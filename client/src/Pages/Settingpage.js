import React from 'react';
import { Link } from 'react-router-dom';
import './Setting.css'; 
import Navbar from '../Components/Navbar';

const Settingpage = () => {


  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('blogUserToken');
      window.location.href = '/login';
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="setting-page">
      <h1>Settings</h1>
      <div className="setting-options">
        <Link to="/update-profile" className="setting-link">Update Profile</Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        
      </div>
    </div>
    </>
    
  );
}

export default Settingpage;
