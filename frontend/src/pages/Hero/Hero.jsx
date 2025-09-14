/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../../assets/assets.js";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative min-h-[60vh] sm:min-h-[70vh] lg:h-[34vw] flex items-center mx-4 sm:mx-8 lg:mx-40 rounded-lg mt-4 sm:mt-6"
      style={{
        backgroundImage: `url(${assets.header_img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
      
      {/* Content with pure fade-in animation */}
      <motion.div
        className="relative z-10 max-w-2xl px-4 sm:px-6 lg:px-10 text-white"
        initial={{ opacity: 0 }}            // Start invisible
        animate={{ opacity: 1 }}            // Fade in
        exit={{ opacity: 0 }}               // Fade out (if unmounted)
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight sm:leading-snug">
          Order your <br className="hidden sm:block" /> 
          <span className="sm:hidden"> </span>favourite food here
        </h1>
        <p className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed text-gray-100 sm:text-gray-200">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button className="bg-white text-gray-800 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md hover:bg-gray-100 transition text-sm sm:text-base">
          View Menu
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
