import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {
    const{ food_list } = useContext(StoreContext);
  return (
    <div className='mt-8 sm:mt-10 mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10'>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center px-4'>Top Dishes near you</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto'>
            {food_list.map((food, index) => {
              if(category === "All" || food.category === category){
                return <FoodItem key={index} {...food}/>
              }
            })}        
        </div>
    </div>
  )
}
 
export default FoodDisplay