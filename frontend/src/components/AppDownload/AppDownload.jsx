import React from 'react'
import { assets } from '../../assets/assets'

const AppDownload = () => {
    return (
        <section className='bg-gray-50 text-gray-800 py-12 sm:py-16 lg:py-20'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-8 sm:mb-12'>
                    <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-800'>
                        Download Our Mobile App
                    </h2>
                    <p className='text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4'>
                        For a better experience, download our app now and enjoy exclusive offers, 
                        faster ordering, and personalized recommendations.
                    </p>
                </div>
                
                <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6'>
                    <div className='group cursor-pointer transform hover:scale-105 transition-all duration-300'>
                        <img 
                            src={assets.app_store} 
                            alt="Download on App Store" 
                            className='h-12 sm:h-14 lg:h-16 w-auto shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300'
                        />
                    </div>
                    <div className='group cursor-pointer transform hover:scale-105 transition-all duration-300'>
                        <img 
                            src={assets.play_store} 
                            alt="Get it on Google Play" 
                            className='h-12 sm:h-14 lg:h-16 w-auto shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300'
                        />
                    </div>
                </div>
                
                <div className='mt-8 sm:mt-12 text-center'>
                    <p className='text-gray-500 text-xs sm:text-sm'>
                        Available on iOS and Android devices
                    </p>
                </div>
            </div>
        </section>
    )
}

export default AppDownload
