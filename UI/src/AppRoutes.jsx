import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import MainDirectory from './components/MainDirectory.jsx';
import NotFound from './NotFound.jsx';

export default function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<MainDirectory />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
