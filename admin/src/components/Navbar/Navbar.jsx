import React from 'react'
import { assets } from '../../assets/assets'

const Navbar = () => {
    return (
        <div className="flex justify-between items-center p-4 shadow-md bg-white">
            <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-orange-600 underline">Hunger Hub Admin</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium hidden md:block">Welcome, Admin</span>
                <img className="h-12 w-12 rounded-full border-2 border-orange-200 object-cover" src={assets.profile_image} alt="Profile" />
            </div>
        </div>
    )
}

export default Navbar
