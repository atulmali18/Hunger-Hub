import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <footer className='bg-gray-800 text-white py-12 sm:py-16'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12'>
                    {/* Company Info */}
                    <div className='space-y-3 sm:space-y-4'>
                        <img src={assets.logo} alt="Hunger Hub Logo" className='w-40 sm:w-48 object-contain mb-2' />
                        <p className='text-white leading-relaxed text-sm sm:text-base'>
                            Delivering delicious meals to your doorstep with love and care.
                            Your satisfaction is our priority.
                        </p>
                        <div className='flex items-center gap-3'>
                            <img src={assets.facebook_icon} alt="Facebook" className='w-5 h-5 sm:w-6 sm:h-6 hover:scale-110 transition-transform duration-200 cursor-pointer' />
                            <img src={assets.twitter_icon} alt="Twitter" className='w-5 h-5 sm:w-6 sm:h-6 hover:scale-110 transition-transform duration-200 cursor-pointer' />
                            <img src={assets.linkedin_icon} alt="LinkedIn" className='w-5 h-5 sm:w-6 sm:h-6 hover:scale-110 transition-transform duration-200 cursor-pointer' />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className='space-y-3 sm:space-y-4'>
                        <h3 className='text-base sm:text-lg font-semibold mb-3 sm:mb-4'>Quick Links</h3>
                        <ul className='space-y-2'>
                            <li><a href="#" className='text-white hover:text-orange-500 transition-colors duration-200 text-sm sm:text-base'>Home</a></li>
                            <li><a href="#" className='text-white hover:text-orange-500 transition-colors duration-200 text-sm sm:text-base'>Menu</a></li>
                            <li><a href="#" className='text-white hover:text-orange-500 transition-colors duration-200 text-sm sm:text-base'>About Us</a></li>
                            <li><a href="#" className='text-white hover:text-orange-500 transition-colors duration-200 text-sm sm:text-base'>Contact</a></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className='space-y-3 sm:space-y-4'>
                        <h3 className='text-base sm:text-lg font-semibold mb-3 sm:mb-4'>Customer Service</h3>
                        <ul className='space-y-2'>
                            <li><a href="#" className='text-white hover:text-orange-500 transition-colors duration-200 text-sm sm:text-base'>Help Center</a></li>
                            <li><a href="#" className='text-white hover:text-orange-500 transition-colors duration-200 text-sm sm:text-base'>Track Order</a></li>
                            <li><a href="#" className='text-white hover:text-orange-500 transition-colors duration-200 text-sm sm:text-base'>Returns</a></li>
                            <li><a href="#" className='text-white hover:text-orange-500 transition-colors duration-200 text-sm sm:text-base'>FAQ</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className='space-y-3 sm:space-y-4'>
                        <h3 className='text-base sm:text-lg font-semibold mb-3 sm:mb-4'>Contact Info</h3>
                        <div className='space-y-2'>
                            <p className='text-gray-300 text-sm sm:text-base'>📞 +1 (555) 123-4567</p>
                            <p className='text-gray-300 text-sm sm:text-base'>✉️ info@hungerhub.com</p>
                            <p className='text-gray-300 text-sm sm:text-base'>📍 123 Food Street, City, State 12345</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className='border-t border-gray-600 my-6 sm:my-8'></div>

                {/* Bottom Section */}
                <div className='flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4'>
                    <p className='text-gray-400 text-xs sm:text-sm text-center sm:text-left'>
                        © 2025 Hunger Hub. All rights reserved.
                    </p>
                    <div className='flex items-center gap-4 sm:gap-6 text-xs sm:text-sm'>
                        <a href="#" className='text-gray-400 hover:text-orange-500 transition-colors duration-200'>Privacy Policy</a>
                        <a href="#" className='text-gray-400 hover:text-orange-500 transition-colors duration-200'>Terms of Service</a>
                        <a href="#" className='text-gray-400 hover:text-orange-500 transition-colors duration-200'>Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
