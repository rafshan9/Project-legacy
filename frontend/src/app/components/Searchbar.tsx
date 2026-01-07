'use client'
import { useState } from 'react';
import Image from 'next/image'

const Searchbar = () => {
    const [make, setMake] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [zipCode, setZipCode] = useState('');
    return (
        <div className="w-full flex justify-center">

            
            {/* 1. MOBILE VIEW (Visible on Phone, Hidden on 'md' screens)  */}
           
            <div className="flex md:hidden flex-row items-center gap-3 bg-white rounded-full px-4 py-3 shadow-md w-full max-w-[300px] mx-auto cursor-pointer justify-center">
                <Image
                    src="/icon-search.svg"
                    alt="Search"
                    width={32}
                    height={32}
                />
                <div className="font-semibold text-sm text-text-secondary">
                    Find your project
                </div>
            </div>


    
            {/* 2. DESKTOP VIEW (Compact for Navbar) */}
            <div className="hidden md:flex flex-row justify-between items-center w-full max-w-[700px] py-2 px-4 rounded-full shadow-sm  mx-auto bg-white hover:shadow-md transition">

                {/* --- Make & Model --- */}
                <div className="flex flex-row items-center flex-1 gap-8 cursor-pointer">
                    <div className="flex flex-col">
                        <div className="text-text-main font-medium text-sm">Make & Model</div>
                        <input 
                            type="text"
                            placeholder="e.g. BMW E30"
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                            className="text-sm placeholder-gray-400 text-gray-700 outline-none bg-transparent w-full truncate"
                        />
                    </div>
                </div>


                {/* --- Max Price --- */}
                <div className="flex flex-col flex-1 px-6 border-x-2 border-gray-200">
                    <div className="text-text-main font-bold text-xs tracking-wider">Max Price</div>
                    <select 
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="text-sm text-gray-700 outline-none bg-transparent w-full cursor-pointer"
                    >
                        <option value="">Any Price</option>
                        <option value="1000">$1,000</option>
                        <option value="5000">$5,000</option>
                        <option value="10000">$10,000</option>
                        <option value="20000">$20,000</option>
                        <option value="50000">$50,000</option>
                    </select>
                </div>


                {/* --- Distance + Search Button --- */}
                <div className="flex flex-row items-center flex-1 justify-between pl-6">
                    <div className="flex flex-col">
                        <div className="text-text-main font-bold text-xs tracking-wider">Zip Code</div>
                        <input 
                            type="text"
                            placeholder="e.g. 90210"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="text-sm placeholder-gray-400 text-gray-700 outline-none bg-transparent w-24 truncate"
                        />
                    </div>

                    {/* THE SEARCH BUTTON (Kept mostly the same) */}
                    <div className="bg-primary hover:bg-primary-hover rounded-full w-12 h-12 flex items-center justify-center shadow-md transition text-white ml-4">
                        <Image
                            src="/icon-search.svg"
                            alt="Search Icon"
                            height={42}
                            width={42}
                            className="text-white"
                        />
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Searchbar;