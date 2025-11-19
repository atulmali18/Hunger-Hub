import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);

  // -------------------- Fetch food items --------------------
  const fetchFoodList = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/food/list");

      if (res.data.success) {
        setFoodList(res.data.data);
      } else {
        toast.error("Failed to load food items");
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error("Server error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  // -------------------- Cart Functions --------------------
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
    toast.success("Added to cart!");
  };

  const removeToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[itemId];
      return newCart;
    });
    toast.success("Removed from cart!");
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, qty]) => {
      const itemInfo = food_list.find((p) => p._id === itemId);
      if (itemInfo) total += itemInfo.price * qty;
      return total;
    }, 0);
  };

  const contextValue = {
    food_list,
    loading,
    cartItems,
    addToCart,
    removeToCart,
    removeFromCart,
    getTotalCartAmount,
    setCartItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
