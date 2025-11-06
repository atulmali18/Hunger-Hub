import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { useAuth } from "../../context/AuthContext";
import { StoreContext } from "../../context/StoreContext";
import { FiClipboard, FiBell, FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";

const Navbar = ({ setShowLogin }) => {
  const { user, logout } = useAuth();
  const { cartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // counts
  const cartCount = Object.values(cartItems || {}).reduce((s, v) => s + (v || 0), 0);
  const notificationsCount = 0; // replace with real data when available
  const ordersCount = 0; // replace with real data when available

  useEffect(() => {
    const onClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    window.addEventListener("click", onClickOutside);

    // Listen for show-login event from StoreContext
    const onShowLogin = () => {
      if (typeof setShowLogin === "function") setShowLogin(true);
    };
    window.addEventListener("show-login", onShowLogin);

    return () => {
      window.removeEventListener("click", onClickOutside);
      window.removeEventListener("show-login", onShowLogin);
    };
  }, [setShowLogin]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "menu", label: "Menu", path: "/#explore-menu" },
    { id: "services", label: "Services", path: "/services" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <img src={assets.logo} alt="Logo" className="w-52
               object-contain" />
            </Link>
          </div>

          {/* Center: Nav items (preserve old styling) */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center gap-6 text-gray-700 font-medium">
              {navItems.map((item) => (
                <li key={item.id}>
                <Link
                  to={item.path}
                  onClick={(e) => {
                    setActive(item.id);
                    if (item.path === "/#explore-menu") {
                      e.preventDefault();
                      const element = document.getElementById("explore-menu");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className={`px-3 py-2 rounded-md transition ${active === item.id ? "text-orange-500" : "hover:text-red-500"
                    }`}
                >
                  {item.label}
                </Link>
              </li>
              ))}
            </ul>
          </div>

          {/* Right: Orders, Notifications, Cart, Profile */}
          <div className="flex items-center gap-3">
            {/* Orders (only visible when logged in) */}
            {user && (
              <Link to="/orders" className="relative p-2 rounded hover:bg-gray-100" title="Orders" aria-label="Orders">
                <FiClipboard className="w-5 h-5 text-gray-700" />
                {ordersCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {ordersCount}
                  </span>
                )}
              </Link>
            )}

            {/* Notifications */}
            <button
              onClick={() => navigate("/notifications")}
              className="relative p-2 rounded hover:bg-gray-100"
              title="Notifications"
              aria-label="Notifications"
            >
              <FiBell className="w-5 h-5 text-gray-700" />
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {notificationsCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 rounded hover:bg-gray-100" title="Cart" aria-label="Cart">
              <FiShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              {user ? (
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                  title="Account"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-700 overflow-hidden">
                    {user?.name?.charAt(0)?.toUpperCase() || <FiUser className="w-4 h-4" />}
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-gray-700">{user?.name}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-4 py-1 rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
                >
                  Sign In
                </button>
              )}

              {profileOpen && user && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg overflow-hidden">
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                    <FiUser className="w-4 h-4" /> <span>Profile</span>
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                    <FiClipboard className="w-4 h-4" /> <span>My Orders</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                  >
                    <FiLogOut className="w-4 h-4" /> <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Open menu"
              >
                {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu / drawer */}
      <div className={`md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <img src={assets.logo} alt="Logo" className="w-28 object-contain" />
            <button onClick={() => setMobileOpen(false)} className="p-2 rounded hover:bg-gray-100"><FiX className="w-6 h-6" /></button>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={(e) => { 
                  setActive(item.id); 
                  setMobileOpen(false); 
                  if (item.path === "/#explore-menu") {
                    e.preventDefault();
                    const element = document.getElementById("explore-menu");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
                className={`px-3 py-2 rounded hover:bg-gray-50 ${active === item.id ? 'bg-gray-100 font-medium' : 'text-gray-700'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 border-t pt-4">
            <div className="flex items-center gap-3">
              {/* Mobile Orders (only when logged in) */}
              {user && (
                <Link to="/orders" onClick={() => setMobileOpen(false)} className="p-2 rounded hover:bg-gray-50">
                  <FiClipboard className="w-5 h-5 text-gray-700" />
                </Link>
              )}
              <button onClick={() => { setMobileOpen(false); navigate("/notifications"); }} className="p-2 rounded hover:bg-gray-50">
                <FiBell className="w-5 h-5 text-gray-700" />
              </button>
              <Link to="/cart" onClick={() => setMobileOpen(false)} className="p-2 rounded hover:bg-gray-50">
                <FiShoppingCart className="w-5 h-5 text-gray-700" />
              </Link>

              {user ? (
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="ml-auto px-4 py-2 bg-red-500 text-white rounded-full">
                  Logout
                </button>
              ) : (
                <button onClick={() => { setShowLogin(true); setMobileOpen(false); }} className="ml-auto px-4 py-2 bg-red-500 text-white rounded-full">
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* mobile backdrop */}
      {mobileOpen && <div onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/30 z-30 md:hidden"></div>}
    </nav>
  );
};

export default Navbar;
