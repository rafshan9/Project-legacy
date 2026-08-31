'use client';
import Image from 'next/image';

interface CosmeticCardProps {
    item: {
        id: string;
        title: string;
        image: string;
        price: number;
        oldPrice?: number;
        discount?: string;
        weight: string;
        tag?: string;
    }
}

const CosmeticCard = ({ item }: CosmeticCardProps) => {
    return (
        <div className="group cursor-pointer bg-white w-full h-full rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col items-center p-3 sm:p-4 relative">
            
            {/* Discount Tag */}
            {item.discount && (
                <div className="absolute top-0 left-3 sm:left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-2 flex flex-col items-center shadow-sm z-10">
                    <span>{item.discount}</span>
                    <span>OFF</span>
                </div>
            )}
            
            {/* Custom Tag (like New or B1G1) */}
            {item.tag && (
                <div className={`absolute top-0 right-3 sm:right-4 text-white text-[10px] font-bold px-2 py-1 shadow-sm z-10 ${item.tag === 'New' ? 'bg-green-700' : 'bg-red-600'}`}>
                    {item.tag}
                </div>
            )}

            {/* Image container */}
            <div className="relative w-full aspect-[4/5] flex items-center justify-center mt-6 overflow-hidden bg-gray-50 rounded-lg p-2">
                <img
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-300" 
                />
            </div>
            
            {/* Delivery Text */}
            <div className="text-xs text-gray-500 italic mt-3 text-center">
                Delivery 1-2 hours
            </div>

            {/* Title */}
            <div className="text-sm font-bold text-gray-900 line-clamp-2 text-center mt-2 h-10 leading-5"> 
                {item.title} 
            </div>

            {/* Price Row */}
            <div className="flex flex-row items-baseline justify-center gap-1 mt-2 flex-wrap">
                {item.oldPrice && <span className="text-xs text-gray-500 line-through">${item.oldPrice}</span>}
                <span className="text-lg font-bold text-red-600">${item.price}</span>
                <span className="text-xs text-gray-500">Per Piece</span>
            </div>

            {/* Add to Bag Button */}
            <div className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 sm:px-4 rounded-full flex items-center justify-center gap-1 sm:gap-2 transition cursor-pointer text-xs sm:text-sm whitespace-nowrap">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                <span>Add to Bag</span>
            </div>
            
        </div>
    );
};

export default CosmeticCard;
