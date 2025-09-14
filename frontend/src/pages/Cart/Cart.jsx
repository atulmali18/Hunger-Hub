import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Your Cart</h1>
        
        {Object.keys(cartItems).length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500">Add some delicious items to get started!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Cart Items</h2>
              <div className="space-y-4">
                {Object.keys(cartItems).map((itemId) => {
                  const item = food_list.find(food => food._id === itemId);
                  if (!item) return null;
                  
                  return (
                    <div key={itemId} className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.name}</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">${item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-sm sm:text-base font-medium">Qty: {cartItems[itemId]}</span>
                        <button 
                          onClick={() => removeFromCart(itemId)}
                          className="text-red-500 hover:text-red-700 text-sm sm:text-base"
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
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Subtotal:</span>
                  <span>${getTotalCartAmount()}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Delivery Fee:</span>
                  <span>$2.00</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-base sm:text-lg">
                    <span>Total:</span>
                    <span>${getTotalCartAmount() + 2}</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart