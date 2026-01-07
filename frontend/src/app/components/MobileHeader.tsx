'use client';

import { usePathname, useRouter } from 'next/navigation';

const MobileHeader = () => {
    const pathname = usePathname();
    const router = useRouter();

    if (pathname === '/') return null;

    return (
        <div className="w-ful px-4 py-3 md:hidden ">
            <button 
            onClick={() => router.back()}
            className="relative z-[100] p-3 bg-white rounded-full shadow-md border border-gray-200 md:hidden flex items-center justify-center active:scale-95 transition"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-5 h-5"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </button>
        </div>
        
    );
};

export default MobileHeader;