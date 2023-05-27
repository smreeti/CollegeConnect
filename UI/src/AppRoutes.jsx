import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainDirectory from './components/MainDirectory.jsx';
import NotFound from './NotFound.jsx';
import HomeComponent from './components/HomeComponent.jsx';

export default function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<MainDirectory />} />

      <Route path="/home" element={<HomeComponent />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
