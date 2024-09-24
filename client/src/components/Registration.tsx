import { Button, MantineProvider } from '@mantine/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants';

const RegistrationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, confirm_password: confirmPassword }),
    });

    if (response.ok) {
      navigate('/login'); // Redirect to login page
    } else {
      alert('Registration failed');
    }
  };

  return (
    <MantineProvider>
    <div>
      <h1>Register</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <Button onClick={handleRegister}>Register</Button>
    </div>
    </MantineProvider>
  );
};

export default RegistrationPage;
