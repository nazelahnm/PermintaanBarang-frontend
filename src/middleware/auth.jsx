import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const checkToken = () => {
  const token = localStorage.getItem('accessToken');
  return !!token;
};

const PrivateRoute = ({ component: Component, path, redirectPath }) => {
  return (
    <Route
      path={path}
      element={checkToken() ? <Component /> : <Navigate to={redirectPath} />}
    />
  );
};

export default PrivateRoute;
