'use client';
import { useRef } from "react";
import PropertyCard from "./PropertyCard";
import { ListingType } from "../types";

const RecommendedSection = ({ listings }: { listings: ListingType[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -350 : 350;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!listings || listings.length === 0) return null;

    return (
        <div className="w-full mt-8  ">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide px-2">Recommended For You</h2>

            <div className="relative w-full">
                <div
                    ref={scrollRef}
                    className="w-full overflow-x-auto pb-4 scrollbar-hide flex gap-6 px-1"
                >
                    {listings.map((listing) => (
                        <div key={listing.id} className="w-56 shrink-0">
                            <PropertyCard listing={listing} />
                        </div>
                    ))}
                </div>

                {/* Scroll Buttons */}
                <div
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-8 h-8 bg-accent text-gray-900 shadow-md flex items-center justify-center cursor-pointer hover:bg-yellow-500 z-10 hidden md:flex rounded-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </div>
                <div
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 w-8 h-8 bg-accent text-gray-900 shadow-md flex items-center justify-center cursor-pointer hover:bg-yellow-500 z-10 hidden md:flex rounded-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            </div>
        </div>
    );
};

export default RecommendedSection;
