/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../../assets/assets.js";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative h-[34vw] flex items-center mx-40 rounded-1 mt-6"
      style={{
        backgroundImage: `url(${assets.header_img})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content with pure fade-in animation */}
      <motion.div
        className="relative z-10 max-w-2xl px-10 text-white"
        initial={{ opacity: 0 }}            // Start invisible
        animate={{ opacity: 1 }}            // Fade in
        exit={{ opacity: 0 }}               // Fade out (if unmounted)
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <h1 className="text-5xl font-extrabold mb-6 leading-snug">
          Order your <br /> favourite food here
        </h1>
        <p className="text-lg mb-8 leading-relaxed text-gray-200">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
          View Menu
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
