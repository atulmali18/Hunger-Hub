import { useState } from "react";
import { assets } from "../../assets/assets.js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="flex items-center justify-between py-4 px-12 bg-white shadow-md">
      {/* Logo */}
      <img src={assets.logo} alt="Logo" className="w-32 cursor-pointer" />

      {/* Navigation Links */}
      <ul className="flex gap-8 text-gray-700 font-medium">
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setIsMenuOpen(item.id)}
            className={`
              relative cursor-pointer transition 
              after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 
              after:bottom-0 after:h-[2px] after:bg-red-500 
              after:w-0 after:transition-all after:duration-300 
              hover:after:w-full
              ${
                isMenuOpen === item.id
                  ? "text-red-500 after:w-full"
                  : "hover:text-red-400"
              }
            `}
          >
            {item.label}
          </li>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer hover:opacity-70"
        />

        {/* Cart Icon with dot */}
        <div className="relative cursor-pointer">
          <img src={assets.basket_icon} alt="Cart" className="w-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>

        {/* Sign In Button */}
        <button className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
