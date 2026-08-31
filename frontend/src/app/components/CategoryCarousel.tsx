'use client';
import { useRef } from "react";

const CategoryCarousel = () => {
    // We will show exactly 8 categories as requested
    const items = [
        { name: 'Eggs', image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=500&q=80', color: 'bg-yellow-400' },
        { name: 'Tea', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&q=80', color: 'bg-yellow-400' },
        { name: 'Soft Drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80', color: 'bg-yellow-400' },
        { name: 'Frozen', image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=500&q=80', color: 'bg-yellow-400' },
        { name: 'Coffee', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80', color: 'bg-yellow-400' },
        { name: 'Meat', image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=500&q=80', color: 'bg-yellow-400' },
        { name: 'Vegetables', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=500&q=80', color: 'bg-yellow-400' },
        { name: 'Snacks', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&q=80', color: 'bg-yellow-400' },
    ];

    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-full mb-8">
            <div 
                ref={scrollRef} 
                className="w-full overflow-x-auto pb-4 scrollbar-hide"
            >
                <div className="flex gap-4 w-max">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center w-36 sm:w-48 group cursor-pointer">
                            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 shadow-sm border border-gray-100 group-hover:shadow-md transition">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className={`px-6 py-2 rounded-full font-bold text-sm text-gray-900 shadow-sm ${item.color}`}>
                                {item.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Scroll Buttons */}
            <div 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/3 -translate-y-1/2 -ml-4 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 z-10 hidden md:flex border border-gray-100"
            >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </div>
            <div 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/3 -translate-y-1/2 -mr-4 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 z-10 hidden md:flex border border-gray-100"
            >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
        </div>
    );
};

export default CategoryCarousel;
