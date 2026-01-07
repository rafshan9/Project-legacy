'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";

interface UserMenuProps {
    currentUser?: string | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const logout = () => {
        setIsOpen(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('user_data');
        window.location.href = '/'; 
    }
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const navigateTo = (path: string) => {
        setIsOpen(false); // Close the menu first
        router.push(path);
    };
    const onHavenYourHome = () => {
        // Close menu immediately
        setIsOpen(false);

        // 1. Not Logged In? -> Open Login Modal
        if (!currentUser) {
            return loginModal.onOpen();
        }

        // 2. Get User Data safely
        const userJson = localStorage.getItem('user_data');
        if (!userJson) {
            // Safety fallback if logged in but data is missing
            return router.push('/sell-your-car'); 
        }

        const userData = JSON.parse(userJson);

        // 3. Logic: Host? -> Add Listing. Not Host? -> Become Host.
        if (userData.is_host) {
            router.push('/add');
        } else {
            router.push('/sell-your-car'); // Use router.push, not navigateTo (since navigateTo closes menu which we already did)
        }
    };

    return (
        <div ref={menuRef} className="relative">
            {/* ORIGINAL HAMBURGER ICON BUTTON */}
            <div 
                onClick={toggleOpen}
                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition items-center justify-center hidden md:flex"
            >
                <Image 
                    src="/icon-hamburger.svg" 
                    alt="Menu" 
                    width={32} 
                    height={32} 
                />
            </div>

            {/* DROPDOWN MENU */}
            {isOpen && (
                <div className="absolute rounded-xl shadow-lg w-max min-w-[180px] bg-white overflow-hidden right-0 top-12 text-sm z-50 ">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            // LOGGED IN MENU
                            <>
                                <div 
                                    onClick={() => navigateTo('/my-profile')} 
                                    className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                                >
                                    My Profile
                                </div>
                                
                                <div onClick={() => navigateTo('/trips')} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                                    My Trips
                                </div>
                                <div onClick={() => navigateTo('/favorites')} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                                    My Favorites
                                </div>
                                <div onClick={onHavenYourHome}
                                className="px-4 py-3 hover:bg-neutral-100 transition">
                                    List your car
                                </div>
                                <hr className="border-neutral-200"/>
                                <div onClick={logout} className="px-4 py-3 hover:bg-neutral-100 transition text-rose-500">
                                    Logout
                                </div>
                            </>
                        ) : (
                            // GUEST MENU
                            <>
                                <div onClick={() => { setIsOpen(false); loginModal.onOpen(); }}
                                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                                    Log in
                                </div>
                                <div onClick={() => { setIsOpen(false); registerModal.onOpen(); }}className="px-4 py-3 hover:bg-neutral-100 transition">
                                    Sign up
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;