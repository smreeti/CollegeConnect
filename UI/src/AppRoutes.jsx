import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import MainDirectory from './components/MainDirectory.jsx';
import NotFound from './NotFound.jsx';
import HomeComponent from './components/HomeComponent.jsx';
import SignupComponent from './components/SignupComponent.jsx';

export default function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const accessToken = localStorage.getItem('jwt');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken || !refreshToken) {
          console.log("here");
          navigate('/');
          return;
        }

      } catch (error) {
        console.log('Error:', error);
        navigate('/');
      }
    };

    authenticateUser();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<MainDirectory />} />
      <Route path="/home" element={<HomeComponent />} />
      <Route path="/signup" element={<SignupComponent />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}