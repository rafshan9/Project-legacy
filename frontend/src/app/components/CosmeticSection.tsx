'use client';
import { useRef } from "react";
import CosmeticCard from "./CosmeticCard";

const CosmeticSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -350 : 350;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Dummy data mimicking the screenshot
    const cosmetics = [
        {
            id: "1",
            title: "CeraVe Hydrating Facial Cleanser",
            image: "/product_1.png",
            price: 149,
            oldPrice: 220,
            discount: "$71",
            weight: "236ml",
        },
        {
            id: "2",
            title: "CeraVe Moisturizing Cream",
            image: "/product_2.png",
            price: 243,
            oldPrice: 270,
            discount: "$27",
            tag: "New",
            weight: "340g",
        },
        {
            id: "3",
            title: "CeraVe Foaming Facial Cleanser",
            image: "/product_3.png",
            price: 149,
            oldPrice: 220,
            discount: "$71",
            weight: "236ml",
        },
        {
            id: "4",
            title: "CeraVe Renewing SA Cleanser",
            image: "/product_4.png",
            price: 225,
            weight: "237ml",
        },
        {
            id: "5",
            title: "CeraVe AM Facial Moisturizing Lotion",
            image: "/product_5.png",
            price: 130,
            weight: "89ml",
        },
        {
            id: "6",
            title: "CeraVe PM Facial Moisturizing Lotion",
            image: "/product_6.png",
            price: 200,
            weight: "89ml",
        },
        {
            id: "7",
            title: "CeraVe Daily Moisturizing Lotion",
            image: "/product_7.png",
            price: 180,
            weight: "236ml",
        },
        {
            id: "8",
            title: "CeraVe Healing Ointment",
            image: "/product_8.png",
            price: 210,
            weight: "144g",
        }
    ];

    return (
        <div className="w-full mt-12 pb-8">
            
            {/* Top Banner (Responsive) */}
            <div className="w-full rounded-2xl overflow-hidden mb-10 shadow-sm border border-gray-100">
                <img 
                    src="/cerave.jpeg" 
                    alt="CeraVe Banner" 
                    className="w-full h-auto object-contain bg-gray-50" 
                />
            </div>

            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-8 text-center uppercase tracking-wide">REFRESH WITH CERAVE</h2>

            {/* Horizontal Product Carousel */}
            <div className="relative w-full group">
                <div
                    ref={scrollRef}
                    className="w-full overflow-x-auto pb-6 scrollbar-hide flex gap-4 sm:gap-6 px-1"
                >
                    {cosmetics.map((item) => (
                        <div key={item.id} className="w-48 sm:w-56 shrink-0">
                            <CosmeticCard item={item} />
                        </div>
                    ))}
                </div>

                {/* Left Scroll Button */}
                <div
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-10 h-10 bg-yellow-400 text-gray-900 shadow-lg flex items-center justify-center cursor-pointer hover:bg-yellow-500 hover:scale-110 active:scale-95 transition-all z-10 opacity-0 group-hover:opacity-100 hidden md:flex rounded-full"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </div>
                
                {/* Right Scroll Button */}
                <div
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 w-10 h-10 bg-yellow-400 text-gray-900 shadow-lg flex items-center justify-center cursor-pointer hover:bg-yellow-500 hover:scale-110 active:scale-95 transition-all z-10 opacity-0 group-hover:opacity-100 hidden md:flex rounded-full"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            </div>
            
        </div>
    );
};

export default CosmeticSection;
