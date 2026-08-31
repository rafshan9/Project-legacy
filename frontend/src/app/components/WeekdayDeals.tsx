'use client';
import { useRef } from "react";
import DealCard from "./DealCard";
import FreshDealsBanner from "./FreshDealsBanner";

const WeekdayDeals = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const categories = ["Ice Cream", "Noodles", "Full Cream Milk", "Regular Spice", "Pasta"];

    // Dummy Deals
    const deals = [
        { id: "1", title: "Igloo Ego Ice Cream 75ml", image: "https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=500&q=80", price: 70, oldPrice: 100, discount: 30, weight: "75ml" },
        { id: "2", title: "Igloo Cone Cornelli Classic 100ml", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&q=80", price: 54, oldPrice: 60, discount: 6, weight: "100ml" },
        { id: "3", title: "Igloo Black Forest Ice Cream 120ml", image: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=500&q=80", price: 63, oldPrice: 70, discount: 7, weight: "120ml" },
        { id: "4", title: "Polar Rocks Ice Cream", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&q=80", price: 44, oldPrice: 50, discount: 6, weight: "1 piece" },
    ];

    return (
        <div className="w-full flex flex-col lg:flex-row gap-6">
            <div
                className="flex-1 rounded-xl p-4 md:p-6 border border-gray-200 min-w-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/green_bg.jpeg')" }}
            >

                {/* Top Header Row */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">

                    {/* Title & Timer */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <h2 className="text-xl md:text-2xl text-white font-black text-gray-900 italic tracking-wide">WEEKDAY DEALS!!!</h2>

                        {/* Timer */}
                        <div className="flex items-center gap-1 text-white font-bold bg-white rounded-md p-1 shadow-sm border border-gray-100">
                            <div className="bg-red-600 px-2 py-1 rounded text-center leading-tight shadow-sm">
                                <div className="text-lg">04</div>
                                <div className="text-[8px] uppercase">Hours</div>
                            </div>
                            <div className="bg-red-600 px-2 py-1 rounded text-center leading-tight shadow-sm">
                                <div className="text-lg">55</div>
                                <div className="text-[8px] uppercase">Minutes</div>
                            </div>
                            <div className="bg-red-600 px-2 py-1 rounded text-center leading-tight shadow-sm">
                                <div className="text-lg">52</div>
                                <div className="text-[8px] uppercase">Seconds</div>
                            </div>
                            <div className="text-red-600 text-[10px] font-bold italic ml-1 mt-auto mb-1 uppercase">Left</div>
                        </div>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative w-full">
                    <div
                        ref={scrollRef}
                        className="w-full overflow-x-auto pb-4 scrollbar-hide flex gap-4"
                    >
                        {deals.map((item) => (
                            <div key={item.id} className="w-48 sm:w-56 shrink-0">
                                <DealCard item={item} />
                            </div>
                        ))}
                    </div>

                    {/* Arrows */}
                    <div
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-8 h-8 bg-accent text-gray-900 shadow-md flex items-center justify-center cursor-pointer hover:bg-yellow-500 z-10 hidden md:flex rounded-full"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </div>
                    <div
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-8 h-8 bg-accent text-gray-900 shadow-md flex items-center justify-center cursor-pointer hover:bg-yellow-500 z-10 hidden md:flex rounded-full"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                </div>
            </div>

            {/* Right Banner */}
            <div className="w-full lg:w-[350px] xl:w-[320px] shrink-0 mt-6 lg:mt-0">
                <FreshDealsBanner />
            </div>
        </div>
    );
};

export default WeekdayDeals;
