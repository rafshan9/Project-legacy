'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import Image from "next/image";


const MobileBottomNav = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleProfileClick = () => {
        if (isLoggedIn) {
            router.push('/mobile-profile'); // Or /properties if you prefer
        } else {
            loginModal.onOpen();
        }
    };

    const handleWishlistClick = () => {
        if (isLoggedIn) {
            router.push('/favorites');
        } else {
            loginModal.onOpen();
        }
    };

    return (
        <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 z-50 md:hidden pb-safe">
            <div className="flex flex-row items-center justify-around py-3">
                
                {/* 1. EXPLORE (Home) */}
                <Link href="/">
                    <div className="flex flex-col items-center justify-center gap-1 cursor-pointer text-rose-500">
                        {/* Search Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                        </svg>
                        <div className="text-[10px] font-medium">Explore</div>
                    </div>
                </Link>

                {/* 2. WISHLISTS (Favorites) */}
                <div onClick={handleWishlistClick} className="flex flex-col items-center justify-center gap-1 cursor-pointer text-gray-500 hover:text-gray-800 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    <div className="text-[10px] font-medium">Wishlists</div>
                </div>

                {/* 3. LOG IN / PROFILE */}
                <div onClick={handleProfileClick} className="flex flex-col items-center justify-center gap-1 cursor-pointer text-gray-500 hover:text-gray-800 transition">
                    {isLoggedIn ? (
                        // Logged In Icon (User)
                         <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 relative">
                             {/* Simple generic avatar */}
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-400">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                         </div>
                    ) : (
                        // Logged Out Icon (Login Circle)
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    )}
                    <div className="text-[10px] font-medium">
                        {isLoggedIn ? 'Profile' : 'Log in'}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MobileBottomNav;