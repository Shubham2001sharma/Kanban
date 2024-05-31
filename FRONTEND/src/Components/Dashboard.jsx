/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        if (!response.data.status) {
          navigate('/');
        }
      } catch (error) {
        console.error('Verification error:', error);
        navigate('/');
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = () => {
    console.log('Logging out...');
    const tokenBeforeClear = localStorage.getItem('token');
    console.log('Token before clear:', tokenBeforeClear); // Debugging log
    localStorage.clear();
    const tokenAfterClear = localStorage.getItem('token');
    console.log('Token after clear:', tokenAfterClear); // Debugging log
    navigate('/');
  };
  

  return (
    <>
      Hello, this is my dashboard
      <br /> <br />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Dashboard;
