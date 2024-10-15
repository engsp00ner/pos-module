import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Store';

const PrivateRoute: React.FC = () => {
  const { user, status } = useSelector((state: RootState) => state.auth);
  const token = localStorage.getItem('token'); // Check for token in localStorage

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Redirect to login if no user or token is found
  return user && token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
