import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

function Profilepage() {
  // State to hold user information
  const [userInfo, setUserInfo] = useState(null);

  // Fetch user information from an API endpoint
  useEffect(() => {
    const token = localStorage.getItem('blogUserToken');
    fetch('http://localhost:4000/user-profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUserInfo(data.user);
        } else {
          console.error('Failed to fetch user information:', data.message);
        }
      })
      .catch(error => console.error('Error fetching user information:', error));
  }, []);

  return (
    <>
      <Navbar/>
      <div className="profile-page">
      <h1>Profile</h1>
      {userInfo ? (
        <div className="user-info">
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Role:</strong> {userInfo.role}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
    </>
  );
}

export default Profilepage;
