// src/component/RegistrationForm.jsx

import React, { useState } from 'react';
import {Link} from "react-router-dom";

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
      alert('Success:', data.message)

      } else {
        console.error(data.message); 
      alert('Error:', data.message)

      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error:', error)

    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          className='i1'
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p className='p1'>Alreay Account <Link  to="/login">Sign In</Link></p>
      </form>
    </div>
  );
};

export default RegistrationForm;
