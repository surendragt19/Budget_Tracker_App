// src/component/LoginForm.jsx

import React, { useState } from 'react';
import {Link} from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email:username, password })
      });
      const data = await response.json();
      alert("Login Success")

      localStorage.setItem('token', data.token);
    location.href="/"

    } catch (error) {
      console.error('Error:', error);
      alert('Error:', error)
    }
  };


  return (
<>
    <div className="login-container">
    
      <form onSubmit={handleSubmit} className="login-form">
      
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p className='p1'>Don't Have an Account <Link  to="/register">Sign Up</Link></p>
      </form>
    </div>
    </>
  );
};

export default LoginForm;