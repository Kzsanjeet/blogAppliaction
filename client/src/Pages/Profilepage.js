import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

function Profilepage() {
  // State to hold user information
  const [userInfo, setUserInfo] = useState(null);

  // Fetch user information from an API endpoint
  // Fetch user information from an API endpoint
 const fetchUserInfo = async () => {
  try {
    const response = await fetch('http://localhost:4000/user-info', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('blogUserToken')}`,
      },
    });

    const data = await response.json();
    console.log(data)
    setUserInfo(data);
  }
  catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  fetchUserInfo();
},[]);

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
