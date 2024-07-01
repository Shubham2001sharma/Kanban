/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideNavbar from './SideNavbar';

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
        const response = await axios.get('kanban-backend-woad.vercel.app
/verify', {
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
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/');
  };
  
  

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-gray-300 pb-2">
          Dashboard
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg text-gray-700 mb-4">
            Welcome to your Dashboard!
          </p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
