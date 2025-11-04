import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // while auth state is initializing, avoid flicker
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Checking session...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // allow nested <Route> by returning <Outlet /> when used as parent route
  return children ?? <Outlet />;
};

export default PrivateRoute;