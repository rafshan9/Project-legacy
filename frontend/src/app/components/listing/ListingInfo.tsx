'use client';
import Image from "next/image";
import Link from "next/link";


const ListingInfo = ({ listing }: { listing: any }) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      
      {/* 1. TOP TITLE & STATS */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{listing.category} in {listing.city}, {listing.country}</h2>
        <span className="text-gray-500 text-sm">
        {listing.year} · {listing.odometer} km · {listing.transmission} · {listing.fuel_type}
        </span>
      </div>
      

      {/* HOST INFO ROW */}
      <div className="flex flex-row items-center gap-4 border-b border-gray-200 pb-8">
          
          {/* Avatar Image */}
          <div className="relative w-12 h-12">
            <div className="w-full h-full rounded-full overflow-hidden relative"><Image src="/photo-main.jpg" fill className="object-cover" alt="Host" /></div>
            <div className="absolute bottom-0 -right-1 w-4 h-4 z-10"><Image src="/icon-shield.svg" fill alt="Superhost" className="object-contain" /></div>
               
          </div>

          {/* Seller name */}
          <div className="flex flex-col">
              <div className="font-semibold text-base">Sold by {listing.landlord.username}</div>
              <div className="text-gray-500 text-sm">Verified Seller</div>
          </div>

      </div>

      {/* 4. CAR DESCRIPTION */}
      <div className="py-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold mb-4">About this vehicle</h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">
              {listing.description}
          </p>
      </div>
    </div>
  );
};

export default ListingInfo;