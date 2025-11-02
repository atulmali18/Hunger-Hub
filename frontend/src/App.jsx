import React, { useState } from "react";
import Navbar from "../../frontend/src/components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { Toaster } from "react-hot-toast";

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" reverseOrder={false} />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <Navbar setShowLogin={setShowLogin} />

      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/order" element={<PlaceOrder />}></Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
