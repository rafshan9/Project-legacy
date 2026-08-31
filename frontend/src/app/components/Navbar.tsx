'use client';

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import UserMenu from "./UserMenu";
import { categories } from "../constants/categories";

interface NavbarProps {
    isStatic?: boolean;
}

const Navbar = ({ isStatic }: NavbarProps) => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileActiveCategory, setMobileActiveCategory] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const closeMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);
    const loginModal = useLoginModal();
    const router = useRouter();

    const handleBecomeHostClick = () => {
        if (!userId) {
            loginModal.onOpen();
        } else {
            router.push('/sell-your-car');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUserId('logged-in');
        } else {
            setUserId(null);
        }
    }, []);

    return (
        <nav className={`w-full z-50 sticky top-0 ${pathname === '/' ? 'block' : 'hidden md:block'}`}>

            {/* TIER 1: Dark Blue Top Bar */}
            <div className="w-full px-4 lg:px-6 bg-primary z-50 py-3">
                <div className="max-w-[1500px] mx-auto flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-3 gap-x-2 lg:gap-6">

                    {/* LEFT: Logo & Location */}
                    <div className="flex items-center gap-2 lg:gap-6 flex-shrink-0">
                        {/* Hamburger Icon (Mobile Only) */}
                        <button 
                            className="text-white p-1 md:hidden hover:bg-white/10 rounded-md transition" 
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>

                        <Link href='/' className="flex items-center gap-2">
                            <svg className="w-8 h-8 text-white hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            <span className="text-white font-bold text-xl sm:text-2xl tracking-tight">FreshMart</span>
                        </Link>

                        <div className="hidden lg:flex items-center gap-2 text-white cursor-pointer hover:bg-white/10 p-2 rounded-lg transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <div className="flex flex-col text-xs">
                                <span className="opacity-70">Select your delivery</span>
                                <span className="font-bold">location</span>
                            </div>
                        </div>
                    </div>

                    {/* CENTER: Search */}
                    <div className="w-full lg:flex-1 flex justify-center max-w-2xl order-last lg:order-none mt-2 lg:mt-0">
                        <div className="w-full flex bg-white rounded-md overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search your products"
                                className="w-full px-4 py-2 outline-none text-black text-sm lg:text-base"
                            />
                            <button className="bg-accent px-6 flex items-center justify-center hover:bg-yellow-500 transition">
                                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: User Menu */}
                    <div className="flex flex-row items-center gap-2 lg:gap-4 flex-shrink-0 text-white">
                        
                        {/* Cart Icon */}
                        <Link href="/cart" className="flex items-center gap-1 hover:bg-white/10 p-2 rounded-lg transition relative">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            <span className="hidden sm:inline font-medium text-sm">Cart</span>
                            <div className="absolute top-0 right-0 sm:right-auto sm:left-5 bg-accent text-gray-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                3
                            </div>
                        </Link>

                        {!userId ? (
                            <button onClick={loginModal.onOpen} className="flex items-center gap-2 font-medium hover:bg-white/10 p-2 rounded-lg transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                <span className="hidden sm:inline">Sign in / Sign up</span>
                            </button>
                        ) : (
                            <div className="bg-white/10 rounded-full">
                                <UserMenu currentUser={userId} closeMenu={closeMenu} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* TIER 2: White Links Bar */}
            <div className="w-full px-6 bg-white border-b border-gray-200 z-40 hidden md:block shadow-sm">
                <div className="max-w-[1500px] mx-auto flex flex-row items-center justify-between py-3 text-sm font-bold text-gray-700">

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 cursor-pointer hover:text-primary text-xs whitespace-nowrap">
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            <span>SHOP BY CATEGORY</span>
                        </div>

                        <div className="hidden lg:flex items-center gap-4 whitespace-nowrap shrink-0 overflow-x-auto scrollbar-hide text-[11px]">
                            <span className="cursor-pointer hover:text-primary shrink-0">SUMMER FEST</span>
                            <span className="cursor-pointer hover:text-primary shrink-0">GREAT DEALS</span>
                            <span className="cursor-pointer hover:text-primary shrink-0">BUY & SAVE MORE</span>
                            <span className="cursor-pointer hover:text-primary shrink-0">OUR BRANDS</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-gray-500 font-medium whitespace-nowrap shrink-0 ml-2 text-xs">
                        <span className="flex items-center gap-1 cursor-pointer hover:text-primary">
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                            Our outlets
                        </span>
                        <span className="flex items-center gap-1 cursor-pointer hover:text-primary">
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            Help line
                        </span>
                    </div>
                </div>
            </div>

            {/* MOBILE SIDEBAR OVERLAY */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] flex md:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="relative w-72 h-full bg-white shadow-xl overflow-y-auto z-10 flex flex-col transform transition-transform duration-300 ease-in-out">
                        <div className="p-4 bg-primary flex items-center justify-between text-white shadow-md">
                            <span className="font-bold text-xl tracking-wide">Categories</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="py-2">
                            {categories.map((category) => (
                                <div key={category.name} className="border-b border-gray-100 last:border-none">
                                    <div 
                                        className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-gray-50 transition"
                                        onClick={() => {
                                            setMobileActiveCategory(
                                                mobileActiveCategory === category.name ? null : category.name
                                            );
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{category.icon}</span>
                                            <span className="font-medium text-gray-800">{category.name}</span>
                                        </div>
                                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${mobileActiveCategory === category.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                    {mobileActiveCategory === category.name && (
                                        <div className="bg-gray-50 px-4 py-2 flex flex-col gap-2 shadow-inner border-y border-gray-100">
                                            {category.subcategories.map((sub, idx) => (
                                                <div key={idx} className="text-sm text-gray-600 py-2 pl-10 cursor-pointer hover:text-primary transition">
                                                    {sub}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </nav>
    );
};

export default Navbar;