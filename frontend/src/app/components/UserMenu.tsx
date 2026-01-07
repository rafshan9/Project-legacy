'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";

interface UserMenuProps {
    currentUser?: string | null;
    // Fix 1: Make this optional with '?' so Navbar doesn't crash if it's missing
    closeMenu?: () => void; 
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser, closeMenu }) => {
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
        // Refresh to clear state
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
        setIsOpen(false); 
        // Fix 2: Only call if the function exists
        if (closeMenu) closeMenu();
        router.push(path);
    };

    const onHavenYourHome = () => {
        setIsOpen(false);
        // Fix 3: Only call if the function exists
        if (closeMenu) closeMenu();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        const userJson = localStorage.getItem('user_data');
        if (!userJson) {
            return router.push('/sell-your-car'); 
        }

        const userData = JSON.parse(userJson);

        if (userData.is_host) {
            router.push('/add');
        } else {
            router.push('/sell-your-car');
        }
    };

    return (
        <div ref={menuRef} className="relative">
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

            {isOpen && (
                <div className="absolute rounded-xl shadow-lg w-max min-w-[180px] bg-white overflow-hidden right-0 top-12 text-sm z-50 ">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
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