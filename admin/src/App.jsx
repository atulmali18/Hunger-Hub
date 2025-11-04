import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import Login from "./pages/Login";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";

const App = () => {
  return (
    <>
      {/* Toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes inside Dashboard Layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/orders" replace />} />
          <Route path="add" element={<Add />} />
          <Route path="list" element={<List />} />
          <Route path="orders" element={<Order />} />
        </Route>

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/orders" replace />} />
      </Routes>
    </>
  );
};

export default App;
