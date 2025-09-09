import React from "react";
import { menu_list } from "../../assets/assets.js";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className="px-10 py-16 text-center bg-gray-50">
      <div className="max-w-7xl mx-auto ">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Explore our menu
        </h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover a variety of delicious dishes crafted to satisfy every
          craving.
        </p>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {menu_list.map((item, index) => (
            <div
              onClick={() => setCategory((prev) => prev === item.menu_name? "All" : item.menu_name)}
              key={index}
              className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg hover:scale-105 transition transform duration-300 cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={"w-24 h-24 object-cover rounded-full mb-4" + (category === item.menu_name ? " border-3 border-red-500 p-1 " : "")}

              />

              {/* Name */}
              <h2 className="text-lg font-semibold text-gray-800">
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
