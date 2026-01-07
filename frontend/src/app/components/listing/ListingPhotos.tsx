'use client';

import { useState } from "react";
import Image from 'next/image';
import GalleryModal from "../modals/GalleryModal";
interface ListingPhotosProps {
    mainImage: string;
    images: any[];
}

const ListingPhotos: React.FC<ListingPhotosProps> = ({ mainImage, images }) => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const getUrl = (url: string) => url.startsWith('http') ? url : `http://127.0.0.1:8000${url}`;
    const gallery = images?.filter(img => img.category === 'gallery') || [];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[60vh] min-h-[300px] rounded-xl overflow-hidden relative">
    
    {/* 1. THE MAIN IMAGE (Left Side) */}
    <div className="col-span-2 relative cursor-pointer hover:opacity-90 transition">
        <Image
            src={getUrl(mainImage)} 
            fill
            alt="Main Listing"
            className="object-cover w-full h-full"
            unoptimized
        />
    </div>

    {/* 2. THE SECONDARY IMAGES (Right Side) */}
    <div className="col-span-2 grid grid-cols-2 gap-2 h-full">
        {gallery.slice(0, 4).map((img, index) => (
            <div key={index} className="relative cursor-pointer hover:opacity-90 transition">
                <Image 
                    src={getUrl(img.image)} 
                    fill 
                    alt="Gallery" 
                    className="object-cover" 
                    unoptimized 
                />
            </div>
        ))}
        
        {/* Fillers for empty slots */}
        {gallery.length < 4 && Array.from({ length: 4 - gallery.length }).map((_, i) => (
            <div key={i} className="bg-gray-100 relative" />
        ))}


                    {/* THE BUTTON */}
                    <button 
                        onClick={() => setIsGalleryOpen(true)} 
                        className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-900 font-semibold text-sm cursor-pointer hover:bg-gray-100 transition text-black"
                    >
                        Show all photos
                    </button>
                </div>
            </div>

            {/* Use the new reusable Gallery Modal */}
            <GalleryModal 
                isOpen={isGalleryOpen} 
                onClose={() => setIsGalleryOpen(false)} 
                images={images} 
            />
        </>
    );
};

export default ListingPhotos;