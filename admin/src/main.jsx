import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FoodProvider } from "./context/FoodContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FoodProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </FoodProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
