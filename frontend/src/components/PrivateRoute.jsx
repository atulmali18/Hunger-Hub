import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ adminOnly = false, children }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-500">Checking session...</div>
            </div>
        );
    }

    // Not logged in
    if (!isAuthenticated) {
        return <Navigate to={adminOnly ? "/admin/login" : "/login"} replace />;
    }

    // Logged in but not admin
    if (adminOnly && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children ?? <Outlet />;
};

export default PrivateRoute;
