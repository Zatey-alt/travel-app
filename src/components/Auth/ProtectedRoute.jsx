import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isLoggedIn } = useAuth();
  let location = useLocation();

  return isLoggedIn ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
