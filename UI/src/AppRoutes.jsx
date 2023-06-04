import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import MainDirectory from './components/MainDirectory.jsx';
import NotFound from './NotFound.jsx';
import HomeComponent from './components/HomeComponent.jsx';
import SignupComponent from './components/SignupComponent.jsx';

export default function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('user') !== null;

    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      {/* <div className="links">
        <Link to="/">Home</Link>
        <Link to="/signup">Sign up</Link>
      </div> */}
      <Routes>
        <Route path="/" element={<MainDirectory />} />
        {/* <Route path="/home" element={<HomeComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>

  );
}
