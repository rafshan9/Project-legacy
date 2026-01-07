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
        /* MATCHING THE FOLDER STRUCTURE:
           Since your folder is [listingId], the link must point to /listings/[ID]
        */
        <Link href={`/listings/${listing.id}`} className="group cursor-pointer">
            <div className="flex flex-col w-full gap-2">
                
                {/* Image container */}
                <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                        src={imageUrl || '/placeholder.jpg'} // Fallback if image is missing
                        alt={listing.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition" 
                        unoptimized
                    />
                    
                    <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-xs font-semibold shadow-xl">
                        Guest Favourite
                    </div>
                    <div className="absolute top-3 right-3">
                        <Image src="/icon-heart-transparent.svg" alt="Save" width={24} height={24} />
                    </div>
                </div>
                
                {/* Dynamic Title */}
                <div className="text-sm font-bold text-gray-900"> 
                    {listing.title} 
                </div>

                {/* Info Row */}
                <div className="flex flex-row items-center justify-between mt-1">
                    
                    {/* Dynamic Price */}
                    <div className="text-sm font-semibold text-gray-900"> 
                        ${listing.price} <span className="font-normal text-gray-500">night</span>
                    </div> 

                    {/* Rating Placeholder */}
                    <div className="flex flex-row items-center gap-1">
                        <Image src="/icon-star.svg" alt="Rating" width={12} height={12} />
                        <span className="text-xs font-semibold">4.95</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;