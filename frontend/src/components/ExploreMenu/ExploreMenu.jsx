import React from "react";
import { menu_list } from "../../assets/assets.js";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section id="explore-menu" className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 text-center bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-3 sm:mb-4">
          Explore our menu
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          Discover a variety of delicious dishes crafted to satisfy every
          craving.
        </p>

        {/* Menu Grid */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
          {menu_list.map((item, index) => (
            <div
              onClick={() => setCategory((prev) => prev === item.menu_name? "All" : item.menu_name)}
              key={index}
              className="flex flex-col items-center bg-white rounded-xl p-3 sm:p-4 hover:shadow-lg hover:scale-105 transition transform duration-300 cursor-pointer min-w-[100px] sm:min-w-[120px]"
            >
              {/* Image */}
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={"w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full mb-2 sm:mb-3" + (category === item.menu_name ? " border-2 border-orange-500 p-1 " : "")}
              />

              {/* Name */}
              <h2 className="text-xs sm:text-sm font-semibold text-gray-800 text-center">
                {item.menu_name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreMenu;
