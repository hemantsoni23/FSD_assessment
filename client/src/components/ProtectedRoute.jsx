// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const token = Cookies?.get('accessToken');
  console.log(token);
  return token ? children : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;
