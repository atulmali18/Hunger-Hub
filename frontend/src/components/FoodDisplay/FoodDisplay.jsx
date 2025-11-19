import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

// 🔥 Skeleton Component (inline so no extra file needed)
const FoodSkeleton = () => {
  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-5 space-y-3">
        <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
        <div className="w-full h-4 bg-gray-300 rounded"></div>
        <div className="w-full h-4 bg-gray-300 rounded"></div>
        <div className="flex justify-between mt-4">
          <div className="w-20 h-5 bg-gray-300 rounded"></div>
          <div className="w-16 h-5 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const FoodDisplay = ({ category }) => {
  const { food_list, loading } = useContext(StoreContext); // 🔥 get loading from context

  return (
    <div className='mt-8 sm:mt-10 mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10'>

      <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center px-4'>
        Top Dishes near you
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto'>

        {/* 🔥 SHOW SKELETON WHILE LOADING */}
        {loading && Array.from({ length: 8 }).map((_, i) => <FoodSkeleton key={i} />)}

        {/* 🔥 ACTUAL FOOD CARDS WHEN LOADED */}
        {!loading &&
          food_list.map((food, index) => {
            if (category === "All" || food.category === category) {
              return <FoodItem key={index} {...food} />;
            }
            return null;
          })
        }
      </div>
    </div>
  );
};

export default FoodDisplay;
