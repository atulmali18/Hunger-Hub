import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import StoreContextProvider from "./context/StoreContext";
import { PlaceOrderProvider } from "./context/PlaceOrderContext";
import { FoodProvider } from "./context/Admin/FoodContext";
import { OrderProvider } from "./context/Admin/OrderContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StoreContextProvider>
          <FoodProvider>
            <OrderProvider>
              <PlaceOrderProvider>
                <App />
              </PlaceOrderProvider>
            </OrderProvider>
          </FoodProvider>
        </StoreContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
