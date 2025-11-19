
import React from "react";

const ExploreMenuSkeleton = () => {
    return (
        <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 text-center bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-3 sm:mb-4">
                    {/* loader heading */}
                    <div className="h-8 w-1/3 bg-gray-300 rounded mx-auto animate-pulse"></div>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
                    {/* loader paragraph */}
                    <div className="h-4 w-2/3 bg-gray-300 rounded mx-auto animate-pulse"></div>
                </p>

                <div className="flex flex-wrap justify-center gap-4 px-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center bg-white rounded-xl p-4 min-w-[100px] sm:min-w-[120px] animate-pulse"
                        >
                            <div className="w-20 h-20 bg-gray-300 rounded-full mb-3"></div>
                            <div className="w-16 h-4 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExploreMenuSkeleton;
