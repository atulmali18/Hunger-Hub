import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({_id,category,description,image,name,price,}) => {
    
  
  const { cartItems, setCartItems, addToCart, removeToCart } = useContext(StoreContext);

  return (
    <div className='w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
        <img 
          src={image} 
          alt={name} 
          className='w-full h-48 object-cover'
        />
        <div className='p-5'>
          <h3 className='text-lg font-semibold text-gray-800 mb-2 truncate'>{name}</h3>
          <p className='text-gray-600 text-sm mb-3 line-clamp-2 h-10'>{description}</p>
          
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-1'>
              <img src={assets.rating_starts} alt="rating" className='w-20 h-4' />
              <span className='text-sm text-gray-600 font-medium'>4.5</span>
            </div>
            <span className='bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-medium'>
              {category}
            </span>
          </div>
          
          <div className='flex justify-between items-center'><p className="text-xl font-bold text-green-600">₹{price}</p>

            {!cartItems[_id] ? (
              <button 
                className='bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105'
                onClick={() => addToCart(_id)}
              >
                Add to Cart
              </button>
            ) : (
              <div className='flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2'>
                <button 
                  className='bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-700 w-8 h-8 rounded-full text-lg font-bold transition-all duration-200 hover:scale-110 flex items-center justify-center' 
                  onClick={() => removeToCart(_id)}
                >
                  −
                </button>
                <span className='text-gray-800 text-lg font-semibold min-w-[20px] text-center'>{cartItems[_id]}</span>
                <button 
                  className='bg-orange-500 cursor-pointer hover:bg-orange-600 text-white w-8 h-8 rounded-full text-lg font-bold transition-all duration-200 hover:scale-110 flex items-center justify-center' 
                  onClick={() => {
                    addToCart(_id);
                  }}

                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default FoodItem