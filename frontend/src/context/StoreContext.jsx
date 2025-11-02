import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [food_list, setFoodList] = useState([]); // dynamic food list
  const [cartItems, setCartItems] = useState({});

  // Fetch food items from backend
  const fetchFoodList = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/food/list");
      if (res.data.success) {
        setFoodList(res.data.data);
      } else {
        toast.error("Failed to load food items");
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error("Server error, please try again later");
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  // Cart Functions
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
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
