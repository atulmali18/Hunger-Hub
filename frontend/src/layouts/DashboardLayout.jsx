import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Admin/Navbar";
import Sidebar from "../components/Admin/Sidebar";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Admin Navbar */}
            <Navbar onMenuClick={toggleSidebar} />

            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar isOpen={isSidebarOpen} />

                {/* Main content area */}
                <main className="flex-1 p-6 md:p-8 transition-all duration-300 lg:ml-0">
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="flex flex-col bg-gray-50 mt-5 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </div>
    );
};

export default DashboardLayout;
