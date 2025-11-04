import React from "react";
import { assets } from "../../assets/assets";
import { FaBars, FaSearch, FaBell, FaMoon } from "react-icons/fa";

const Navbar = ({ onMenuClick }) => {
    return (
        <nav className="sticky top-0 z-60 flex h-16 items-center gap-3 bg-white px-4 shadow-sm ">
            {/* Left: Menu & Logo */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
                >
                    <FaBars className="h-5 w-5 text-gray-500" />
                </button>

                <div className="flex items-center gap-2">
                    <img
                        src={assets.logo}
                        alt="Hunger Hub"
                        className="w-32 object-contain"
                    />
                </div>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md ml-8">
                <div className="flex w-full items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
                    <FaSearch className="h-4 w-4 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Search (Ctrl+/)"
                        className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Right: Icons & Profile */}
            <div className="ml-auto flex items-center gap-4">
                {/* Theme Toggle */}
                <button className="rounded-lg p-2 hover:bg-gray-100">
                    <FaMoon className="h-5 w-5 text-gray-500" />
                </button>

                {/* Notifications */}
                <button className="rounded-lg p-2 hover:bg-gray-100 relative">
                    <FaBell className="h-5 w-5 text-gray-500" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-500" />
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-right">
                        <div className="text-sm font-medium">Admin User</div>
                        <div className="text-xs text-gray-500">administrator</div>
                    </div>
                    <img
                        src={assets.profile_image}
                        alt="Profile"
                        className="h-9 w-9 rounded-lg object-cover border border-gray-200"
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
