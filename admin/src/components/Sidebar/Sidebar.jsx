import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

const menuItems = [
    { icon: assets.add_icon, label: "Add Item", to: "/add" },
    { icon: assets.order_icon, label: "List Item", to: "/list" },
    { icon: assets.add_icon, label: "Orders", to: "/orders" },
    { icon: assets.profile_image, label: "Profile", to: "/profile" },
    { icon: assets.logout_icon, label: "Logout", to: "/logout" },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="h-screen w-60 bg-white shadow-lg flex flex-col py-8 px-4">
            <nav className="flex flex-col gap-4 flex-1">
                {menuItems.map((item, idx) => (
                    <Link
                        key={item.label}
                        to={item.to}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                            ${activeIndex === idx ? 'bg-orange-100 text-orange-600 font-semibold' : 'hover:bg-gray-100 text-gray-700'}
                        `}
                        onClick={() => setActiveIndex(idx)}
                    >
                        <img src={item.icon} alt={item.label} className="w-6 h-6" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="mt-auto text-xs text-gray-400 text-center">
                &copy; {new Date().getFullYear()} Hunger Hub
            </div>
        </div>
    )
}

export default Sidebar
