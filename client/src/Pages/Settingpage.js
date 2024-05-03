import React from 'react';
import { Link } from 'react-router-dom';
import './Setting.css'; 
import Navbar from '../Components/Navbar';

const Settingpage = () => {

  const userToken = localStorage.getItem('blogUserToken');


  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('blogUserToken');
      window.location.reload();
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="setting-page">
      <h1>Settings</h1>
      {userToken ? (
              <div className="setting-options">
              <Link to="/update-profile" className="setting-link">Update Profile</Link>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            ):(
              <h1>Please Login to continue...</h1>
            )}
    </div>
    </>
    
  );
}

export default Settingpage;
