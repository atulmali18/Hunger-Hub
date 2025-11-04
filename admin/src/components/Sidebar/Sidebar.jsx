import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaPlus, FaListUl, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";

const menuItems = [
    { icon: <FaPlus size={18} />, label: "Add Food", to: "/add" },
    { icon: <FaListUl size={18} />, label: "List Foods", to: "/list" },
    { icon: <IoFastFoodOutline size={18} />, label: "Orders", to: "/orders" },
    { icon: <FaUserCircle size={18} />, label: "Profile", to: "/profile" },
];

const Sidebar = ({ isOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside
            className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transform bg-white border-r border-gray-100 shadow-md transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
            <div className="flex flex-col justify-between h-full py-6 px-4">
                {/* Menu */}
                <nav className="flex flex-col gap-2 flex-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.to;
                        return (
                            <Link
                                key={item.label}
                                to={item.to}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                  ${isActive
                                        ? "bg-orange-500 text-white shadow-md"
                                        : "hover:bg-orange-100 text-gray-700 hover:text-orange-600"
                                    }`}
                            >
                                <span
                                    className={`text-lg ${isActive ? "text-white" : "text-orange-500"
                                        }`}
                                >
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg mt-2 font-medium transition-all duration-200 hover:bg-red-100 text-gray-700 hover:text-red-600"
                    >
                        <FaSignOutAlt size={18} className="text-red-500" />
                        <span>Logout</span>
                    </button>
                </nav>

                {/* Footer */}
                <div className="text-center text-sm text-gray-400 mt-6">
                    <p>
                        &copy; {new Date().getFullYear()}{" "}
                        <span className="text-orange-500 font-semibold">Hunger Hub</span>
                    </p>
                    <p className="text-xs">Admin Dashboard</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
