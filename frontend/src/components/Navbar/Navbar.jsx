import { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";

const Navbar = ({ setShowLogin }) => {
  const [activeNav, setActiveNav] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartItems } = useContext(StoreContext);

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "menu", label: "Menu", path: "/#menu" },
    { id: "services", label: "Services", path: "/#services" },
    { id: "contact", label: "Contact", path: "/#contact" },
  ];

  const linkClasses = (id) =>
    `relative cursor-pointer transition 
     after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 
     after:bottom-0 after:h-[2px] after:bg-red-500 
     after:w-0 after:transition-all after:duration-300 
     hover:after:w-full ${
       activeNav === id ? "text-red-500 after:w-full" : "hover:text-red-400"
     }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
             <h1 className='text-xl sm:text-xl font-bold text-red-500 w-24 sm:w-32 cursor-pointer'>Hunger Hub</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex gap-6 lg:gap-8 text-gray-700 font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setActiveNav(item.id)}
                  className={linkClasses(item.id)}
                >
                  {item.label}
                </Link>
              ))}
            </ul>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <img
              src={assets.search_icon}
              alt="Search Icon"
              className="w-5 cursor-pointer hover:opacity-70"
            />
            <Link to="/cart" className="relative cursor-pointer">
              <img src={assets.basket_icon} alt="Cart Icon" className="w-6" />
              {Object.keys(cartItems).length > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </Link>
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 lg:px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition text-sm lg:text-base"
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              {mobileOpen ? (
                <span className="text-2xl">&times;</span>
              ) : (
                <span className="text-2xl">&#9776;</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <ul className="flex flex-col gap-4 p-4 text-gray-700 font-medium">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  setActiveNav(item.id);
                  setMobileOpen(false);
                }}
                className={`cursor-pointer ${
                  activeNav === item.id
                    ? "text-red-500"
                    : "hover:text-red-400"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Right Section */}
            <div className="flex items-center gap-4 border-t pt-4">
              <img
                src={assets.search_icon}
                alt="Search Icon"
                className="w-5 cursor-pointer hover:opacity-70"
              />
              <Link to="/cart" className="relative cursor-pointer">
                <img src={assets.basket_icon} alt="Cart Icon" className="w-6" />
                {Object.keys(cartItems).length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                )}
              </Link>
              <button
                onClick={() => {
                  setShowLogin(true);
                  setMobileOpen(false);
                }}
                className="ml-auto px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition text-sm"
              >
                Sign In
              </button>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
