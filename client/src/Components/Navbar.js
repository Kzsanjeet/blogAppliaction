import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {

  const userToken = localStorage.getItem('blogUserToken');
  const [redirectPage,setRedirectPage] = useState(false)

  const logoutHandler = ()=>{
    //removing the token
    const confirmLogout = window.confirm("Are you sure want to logout?")
    if(confirmLogout){
      localStorage.removeItem('blogUserToken')
      setRedirectPage(true)
    }
  }
  if(redirectPage){
    return <Navigate to={'/login'}/>
  }

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
        {userToken ? <li><button onClick={()=>logoutHandler()}>Logout</button></li> : <li><Link to="/login">Login</Link></li>}
       

      </ul>
    </nav>
  );
}

export default Navbar;
