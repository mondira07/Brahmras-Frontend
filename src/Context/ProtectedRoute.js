// src/Context/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { authState } = useAuth();
  
  if (authState.loading) return <div>Loading...</div>; // You can replace this with a loading spinner

  return authState.isLoggedIn ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
