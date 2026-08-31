'use client';
import Image from 'next/image';

interface DealCardProps {
    item: {
        id: string;
        title: string;
        image: string;
        price: number;
        oldPrice: number;
        discount: number;
        weight: string;
    }
}

const DealCard = ({ item }: DealCardProps) => {
    return (
        <div className="group cursor-pointer bg-white w-full h-full rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col items-center p-4 relative">

            {/* Discount Tag */}
            <div className="absolute top-0 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-2 flex flex-col items-center shadow-sm">
                <span>${item.discount}</span>
                <span>OFF</span>
            </div>

            {/* Image container */}
            <div className="relative w-full aspect-[4/3] flex items-center justify-center mt-6 overflow-hidden rounded-md">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
            </div>

            {/* Delivery Text */}
            <div className="text-xs text-gray-500 italic mt-2 text-center">
                Delivery 1-2 hours
            </div>

            {/* Title */}
            <div className="text-sm font-bold text-gray-900 line-clamp-2 text-center mt-2 h-10 leading-5">
                {item.title}
            </div>

            {/* Price Row */}
            <div className="flex flex-row items-baseline justify-center gap-1 mt-2 flex-wrap">
                <span className="text-xs text-gray-500 line-through">${item.oldPrice}</span>
                <span className="text-lg font-bold text-primary">${item.price}</span>
                <span className="text-xs text-gray-500">Per Piece</span>
            </div>

            {/* Add to Bag Button */}
            <div className="mt-4 w-full bg-primary hover:bg-primary-hover text-white font-bold py-2 px-2 sm:px-4 rounded-full flex items-center justify-center gap-1 sm:gap-2 transition cursor-pointer text-xs sm:text-sm whitespace-nowrap">
                <span>+ Add to Bag</span>
            </div>

        </div>
    );
};

export default DealCard;
