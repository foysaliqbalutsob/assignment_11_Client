import React from 'react';
import useAuth from '../Hooks/useauth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className='flex justify-center items-center'>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/registration" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
