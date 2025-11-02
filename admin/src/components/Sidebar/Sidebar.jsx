import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const menuItems = [
    { icon: assets.add_icon, label: "Add Food", to: "/add" },
    { icon: assets.order_icon, label: "List Foods", to: "/list" },
    { icon: assets.add_icon, label: "Orders", to: "/orders" },
    { icon: assets.profile_image, label: "Profile", to: "/profile" },
    { icon: assets.logout_icon, label: "Logout", to: "/logout" },
];

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="h-screen w-64 bg-gradient-to-b from-orange-50 to-white shadow-xl flex flex-col justify-between py-8 px-5 border-r border-orange-100">

            {/* Menu Section */}
            <nav className="flex flex-col gap-3 flex-1">
                {menuItems.map((item, idx) => (
                    <Link
                        key={item.label}
                        to={item.to}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 
              ${activeIndex === idx
                                ? "bg-orange-500 text-white shadow-md scale-[1.02]"
                                : "hover:bg-orange-100 text-gray-700 hover:text-orange-600"
                            }`}
                        onClick={() => setActiveIndex(idx)}
                    >
                        <img
                            src={item.icon}
                            alt={item.label}
                            className={`w-5 h-5 ${activeIndex === idx ? "invert brightness-0" : ""
                                }`}
                        />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Footer Section */}
            <div className="text-center text-sm text-gray-400 mt-10">
                <p>&copy; {new Date().getFullYear()} <span className="text-orange-500 font-semibold">Hunger Hub</span></p>
                <p className="text-xs mt-1">Admin Dashboard</p>
            </div>
        </div>
    );
};

export default Sidebar;
