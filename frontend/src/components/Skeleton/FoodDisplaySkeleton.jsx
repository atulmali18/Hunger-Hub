// src/components/FoodDisplaySkeleton.jsx
import React from "react";

const FoodDisplaySkeleton = ({ count = 8 }) => {
    return (
        <div className="mt-8 sm:mt-10 mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center px-4">
                <div className="h-8 w-1/2 bg-gray-300 rounded mx-auto animate-pulse"></div>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
                {Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
                    >
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
                ))}
            </div>
        </div>
    );
};

export default FoodDisplaySkeleton;
