import React, { useState } from 'react';
import './Loginpage.css'
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [redirectPage, setRedirectPage]= useState(false)

const apiUrl = 'http://localhost:4000';


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      //using localstorage (beta)
      if(data.success){
        //using localstorage (beta)
        localStorage.setItem('blogUserToken', data.token);
        setRedirectPage(true)
    }

      console.log(data);
    } catch (error) {
      console.log(error);
      setRedirectPage(false)
    }
    
}

  if(redirectPage){
   return <Navigate to={'/'}/>
  }

  

  return (
    <>
    <Navbar/>
    <div className="login-page">
      
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="input-field"
              required
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'}
            </span>

          </div>

        </div>
        <span>Doesn't have account ? <Link to={'/register'}>Register</Link></span>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
    </>
  );
}

export default Loginpage;
