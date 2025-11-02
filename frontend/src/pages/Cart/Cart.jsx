import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    cartItems,
    food_list,
    addToCart,
    removeToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);

  const { user } = useUser();
  const navigate = useNavigate();

  const deliveryFee = 60;
  const totalAmount = getTotalCartAmount() + deliveryFee;

  const handleDecrease = (itemId) => {
    if (cartItems[itemId] > 1) {
      removeToCart(itemId);
    } else {
      // if quantity is 1, removing should clear item completely
      removeFromCart(itemId);
    }
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      toast.error("Please login to proceed to checkout");
      // trigger global event to open login modal (Navbar listens for this)
      window.dispatchEvent(new CustomEvent("show-login"));
      return;
    }
    navigate("/order");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center sm:text-left">
          🛒 Your Cart
        </h1>

        {/* If cart is empty */}
        {Object.keys(cartItems).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
              alt="Empty Cart"
              className="w-32 mb-6 opacity-80"
            />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 text-sm">
              Add some delicious items to start your order 🍽️
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                Items in Your Cart
              </h2>

              <div className="divide-y divide-gray-100">
                {Object.keys(cartItems).map((itemId) => {
                  const item = food_list.find((food) => food._id === itemId);
                  if (!item) return null;

                  return (
                    <div
                      key={itemId}
                      className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={`http://localhost:4000/images/${item.image}`}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                        />
                        <div>
                          <h3 className="font-medium text-gray-800 text-base">
                            {item.name}
                          </h3>
                          <p className="text-gray-500 text-sm">₹{item.price}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 justify-between sm:justify-end w-full sm:w-auto">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                          <button
                            onClick={() => handleDecrease(itemId)}
                            disabled={!cartItems[itemId]}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-gray-800 text-base font-semibold min-w-[24px] text-center">
                            {cartItems[itemId]}
                          </span>
                          <button
                            onClick={() => addToCart(itemId)}
                            className="bg-orange-500 hover:bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-all hover:scale-110 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(itemId)}
                          className="text-red-500 hover:text-red-600 font-medium text-sm transition cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{getTotalCartAmount()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-semibold text-gray-800 text-base">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
