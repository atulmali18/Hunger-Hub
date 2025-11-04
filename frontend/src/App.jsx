import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Context & Auth
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./context/AuthContext";



// User Pages
import { Home } from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Orders from "./pages/Orders/Orders";
import Verify from "./pages/Verify/Verify";
import UserLayout from "./layouts/UserLayout";


// Admin Pages
import AdminLogin from "./pages/Admin/Login";
import Add from "./pages/Admin/Add";
import List from "./pages/Admin/List";
import Order from "./pages/Admin/Order";
import DashboardLayout from "./layouts/DashboardLayout";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* -------------------- USER ROUTES -------------------- */}
        <Route
          path="/"
          element={<UserLayout showLogin={showLogin} setShowLogin={setShowLogin} />}
        >
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<PlaceOrder />} />
          <Route path="orders" element={<Orders />} />
          <Route path="verify" element={<Verify />} />
        </Route>

        {/* -------------------- ADMIN ROUTES -------------------- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute adminOnly>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/admin/orders" replace />} />
          <Route path="add" element={<Add />} />
          <Route path="list" element={<List />} />
          <Route path="orders" element={<Order />} />
        </Route>

        {/* -------------------- FALLBACK -------------------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
