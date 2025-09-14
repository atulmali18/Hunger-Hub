import { useState } from "react";
import { assets } from "../../assets/assets.js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={assets.logo} alt="Logo" className="w-24 sm:w-32 cursor-pointer" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <ul className="flex gap-6 lg:gap-8 text-gray-700 font-medium">
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
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
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
            <button className="px-4 lg:px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition text-sm lg:text-base">
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  onClick={() => {
                    setIsMenuOpen(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    block px-3 py-2 rounded-md text-base font-medium cursor-pointer transition
                    ${
                      isMenuOpen === item.id
                        ? "text-red-500 bg-red-50"
                        : "text-gray-700 hover:text-red-500 hover:bg-gray-50"
                    }
                  `}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile Right Section */}
              <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 mt-4">
                <div className="flex items-center gap-4">
                  <img
                    src={assets.search_icon}
                    alt="Search"
                    className="w-5 cursor-pointer hover:opacity-70"
                  />
                  <div className="relative cursor-pointer">
                    <img src={assets.basket_icon} alt="Cart" className="w-6" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition text-sm">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
