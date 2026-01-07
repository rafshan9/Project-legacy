'use client';

import { useState, useEffect } from "react";
import React from 'react';
import Link from 'next/link';
import apiService from "@/app/services/apiService";
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
    const router = useRouter(); 
    const [isHost, setIsHost] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                // Reuse the 'me' endpoint to get the is_host boolean
                const data = await apiService.get('/api/auth/me/');
                setIsHost(data.is_host);
            } catch (error) {
                console.error("Failed to fetch user status", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserStatus();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/'; 
    };

    if (isLoading) return <div className="pt-32 text-center">Loading...</div>;

    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-4 pb-24">
            <h1 className="text-3xl font-semibold mb-6">Profile</h1>
            
            <Link 
                href="/my-profile" 
                className="flex items-center gap-4 mb-8 p-3 -mx-3 rounded-xl hover:bg-gray-50 transition active:scale-[0.98]"
            >
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-gray-500">?</span>
                </div>
                <div>
                    <h2 className="text-xl font-medium">My Profile</h2>
                    <p className="text-gray-500 text-sm">Account details and settings</p>
                </div>
            </Link>

            <div className="flex flex-col border-t border-gray-200">
                <Link 
                    href="/my-reservations" 
                    className="w-full py-4 border-b border-gray-100 text-black font-medium active:bg-gray-50 transition"
                >
                    My Trips
                </Link>
                
                <Link 
                    href="/wishlist" 
                    className="w-full py-4 border-b border-gray-100 text-black font-medium active:bg-gray-50 transition"
                >
                    My Favorites
                </Link>

                {/* CONDITIONAL SELLER LINK */}
                {isHost ? (
                    <Link 
                        href="/add" // Make sure this matches your actual filename (e.g., /add-listing/page.tsx)
                        className="w-full py-4 border-b border-gray-100 text-black font-medium active:bg-gray-50 transition"
                    >
                        List your car
                    </Link>
                ) : (
                    <Link 
                        href="/sell-your-car" // This should be your verification/onboarding page
                        className="w-full py-4 border-b border-gray-100 text-black font-medium active:bg-gray-50 transition"
                    >
                        Become a seller
                    </Link>
                )}

                <Link 
                    href="/my-listings" 
                    className="w-full py-4 border-b border-gray-100 text-black font-medium active:bg-gray-50 transition"
                >
                    My Properties
                </Link>

                <button 
                    onClick={handleLogout}
                    className="w-full text-left py-4 text-rose-500 font-semibold active:bg-gray-50 transition"
                >
                    Logout
                </button>
            </div>
        </main>
    );
}

export default ProfilePage;