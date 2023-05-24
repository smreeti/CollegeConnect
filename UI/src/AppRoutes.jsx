import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent.jsx';
import NotFound from './NotFound.jsx';

export default function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<LoginComponent />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
