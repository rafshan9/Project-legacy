'use client';

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import UserMenu from "./UserMenu";

interface NavbarProps {
    isStatic?: boolean;
}

const Navbar = ({ isStatic }: NavbarProps) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const closeMenu = useCallback(() => {
        setIsOpen(false);
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
        <nav className={`w-full z-50 bg-white ${isStatic ? 'relative border-b border-gray-200' : 'fixed top-0'} 
        ${pathname === '/' ? 'block' : 'hidden md:block'}`}>

            <div className="w-full px-6 bg-white z-50">
                {isStatic ? (
                    // VARIANT A: STATIC NAVBAR (Inner Pages)
                    // This stays the same, as it already has a small centered search pill
                    <div className="flex justify-between items-center py-4 gap-12">
                        <Link href='/' className="items-end gap-1 hidden md:flex">
                            <div className="text-primary font-medium text-lg hidden lg:block">Project Legacy</div>
                        </Link>

                        <div className="flex w-full md:w-auto md:min-w-[340px] flex-row items-center justify-between rounded-full py-2.5 px-4 shadow-sm hover:shadow-md cursor-pointer transition gap-4">
                            <div className="font-md text-text-secondary text-sm pl-2">Start your search</div>
                            <div className="p-2 bg-primary rounded-full text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                        </div>

                        <div className="hidden flex-row items-center gap-2 flex-shrink-0 md:flex">
                            <div onClick={handleBecomeHostClick} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer text-text-primary font-medium hidden lg:block">
                                Sell your car
                            </div>
                            <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer hidden md:block">
                                <Image src="/icon-globe.svg" alt="Language" width={32} height={32} />
                            </div>
                            <div onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer hidden md:block relative">
                                <Image src="/icon-hamburger.svg" alt="Menu" width={32} height={32} />
                                {isOpen && <UserMenu currentUser={userId} closeMenu={closeMenu} />}
                            </div>
                        </div>
                    </div>

                ) : (
                    // VARIANT B: MAIN NAVBAR (Home Page)
                    // ✅ CHANGED: Now a single row with Searchbar in the middle
                    <div className="flex flex-row items-center justify-between py-4 gap-4">

                        {/* LEFT: Logo */}
                        <Link href='/' className="items-end gap-1 hidden md:flex flex-shrink-0">
                        <Image 
                            src="/logo.svg" 
                            alt="Project Legacy Logo" 
                            width={48} 
                            height={48} 
                            priority // Ensures the logo loads immediately
                        />
                            <div className="text-primary font-medium text-lg hidden lg:block">Project Legacy</div>
                        </Link>

                        {/* CENTER: Searchbar (Now sits here!) */}
                        <div className="flex-1 flex justify-center">
                             <Searchbar />
                        </div>

                        {/* RIGHT: User Menu */}
                        <div className="flex flex-row items-center gap-2 flex-shrink-0">
                            <div onClick={handleBecomeHostClick} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer text-text-primary font-medium hidden lg:block">
                                Sell your car
                            </div>
                            <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer hidden md:block">
                                <Image src="/icon-globe.svg" alt="Language" width={32} height={32} />
                            </div>
                            <UserMenu
                            currentUser={userId} 
                            closeMenu={closeMenu}
                             />
                        </div>
                        
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;