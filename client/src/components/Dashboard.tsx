import { MantineProvider, Button } from '@mantine/core';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('token');  // Returns true if token exists
};
  
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    navigate('/');  // Redirect to login page after logging out
  };


  return (
    <MantineProvider>
    <nav>
    {!isLoggedIn() ? (
      <>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </>
    ) : (
      <>
        <div>
        Welcome, {name} <Button variant="filled" onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</Button>
        </div>
      </>
    )}
  </nav>
  </MantineProvider>

  );
};

export default Dashboard;
