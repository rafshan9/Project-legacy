'use client';

import Image from 'next/image';
import Link from "next/link";
import { ListingType } from "../types";

interface PropertyCardProps {
    listing: ListingType;
}

const PropertyCard = ({ listing }: PropertyCardProps) => {
    // Ensure the image URL points to your Django backend
    let imageUrl = listing.image;
    if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = `http://127.0.0.1:8000${imageUrl}`;
    }

    return (
        <div className="group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col items-center p-4">
            
            {/* Image container */}
            <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden rounded-md mb-2">
                <Image
                    src={imageUrl || '/placeholder.jpg'} // Fallback if image is missing
                    alt={listing.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition duration-300" 
                    unoptimized
                />
            </div>
            
            {/* Delivery Text */}
            <div className="text-xs text-gray-500 italic mt-2 text-center">
                Delivery 1-2 hours
            </div>

            {/* Title */}
            <div className="text-sm font-bold text-gray-900 line-clamp-2 text-center mt-2 h-10 leading-5"> 
                {listing.title} 
            </div>

            {/* Price Row */}
            <div className="flex flex-row items-baseline justify-center gap-1 mt-2">
                <span className="text-lg font-bold text-primary">${listing.price}</span>
                <span className="text-xs text-gray-500">Per Piece</span>
            </div>

            {/* Weight Dropdown Dummy */}
            <div className="mt-3 border border-gray-300 rounded px-3 py-1 text-xs text-gray-600 flex items-center gap-4 cursor-pointer hover:border-gray-400 transition">
                <span>{listing.weight || '1kg'}</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>

            {/* Add to Bag Button */}
            <div className="mt-4 w-full bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-full flex items-center justify-center gap-2 transition cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                <span>Add to Bag</span>
            </div>
            
        </div>
    );
};

export default PropertyCard;