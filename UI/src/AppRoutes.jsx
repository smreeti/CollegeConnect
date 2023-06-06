import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import MainDirectory from './components/MainDirectory.jsx';
import NotFound from './NotFound.jsx';
import HomeComponent from './components/HomeComponent.jsx';
import SignupComponent from './components/SignupComponent.jsx';
import ResetPasswordComponent from './components/ResetPassword.jsx';
import EmailSentComponent from './components/EmailSentComponent.jsx';
import UpdatePasswordComponent from './components/UpdatePassword.jsx';

export default function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const accessToken = localStorage.getItem('jwt');
        const refreshToken = localStorage.getItem('refreshToken');

        const currentPath = window.location.pathname;

        // Exclude authentication check for login and signup routes
        if (currentPath === '/' || currentPath === '/signup')
          return;

        if (!accessToken || !refreshToken) {
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
      <Route path="/resetPassword" element={<ResetPasswordComponent />} />
      <Route path="/emailSent" element={<EmailSentComponent />} />
      <Route path="/updatePassword/:id" element={<UpdatePasswordComponent />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}