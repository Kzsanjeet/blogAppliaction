import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {

  const userToken = localStorage.getItem('blogUserToken');


  const [userInfo, setUserInfo] = useState([]);




  const fetchUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/user-info', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('blogUserToken')}`,
        },
      });
  
      const data = await response.json();
      if(data.success){
        setUserInfo(data.user);
      }
      // console.log(data.user._id)
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUserInfo();
  },[]);

  const logoutHandler = ()=>{
    //removing the token
    const confirmLogout = window.confirm("Are you sure want to logout?")
    if(confirmLogout){
      localStorage.removeItem('blogUserToken')
      window.location.reload();
      
    }
  }
 

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">yourThoughts</Link>
        {userInfo ? (
          <span className='identity'>({userInfo.firstname} {userInfo.lastname})</span>
        ):null}
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/addblog">Add Blog</Link></li>
        <li><Link to="/setting">Settings</Link></li>
        {userToken ? <li><button className='logout' onClick={()=>logoutHandler()}>Logout</button></li> : <li><Link to="/login">Login</Link></li>}
  
      </ul>
    </nav>
  );
}

export default Navbar;
