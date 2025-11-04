import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import LoginPopup from "../components/LoginPopup/LoginPopup";

/**
 * Layout for all user-facing routes
 * Handles Navbar, Footer, and Login Popup
 */
const UserLayout = ({ showLogin, setShowLogin }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Login Popup */}
            {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

            {/* Navbar */}
            <Navbar setShowLogin={setShowLogin} />

            {/* Main content (page changes via Outlet) */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default UserLayout;
