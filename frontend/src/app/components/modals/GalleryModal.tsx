'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

interface GalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: any[];
}

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, images }) => {
    const [showGallery, setShowGallery] = useState(false);
    const getUrl = (url: string) => url.startsWith('http') ? url : `http://127.0.0.1:8000${url}`;

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setShowGallery(true), 10);
        } else {
            setShowGallery(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[110] bg-white transition-all duration-500 overflow-y-auto ${showGallery ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <div className="sticky top-0 bg-white p-6 flex items-center z-20 border-b border-gray-100">
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <span className="ml-4 font-semibold text-black">All photos</span>
            </div>
    
            <div className="max-w-3xl mx-auto pb-20 px-4 mt-8 flex flex-col gap-6">
                {images.map((img, index) => (
                    <div key={index} className="w-full relative aspect-[3/2]">
                        <Image 
                            src={getUrl(img.image)} 
                            fill 
                            alt={`Gallery image ${index + 1}`} 
                            className="object-cover rounded-xl"
                            unoptimized
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryModal;