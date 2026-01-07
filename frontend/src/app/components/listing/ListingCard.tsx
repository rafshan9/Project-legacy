'use client';

import Image from "next/image";
import Link from "next/link";
import { useCallback, MouseEvent } from "react";

interface ListingCardProps {
    data: {
        id: string;
        title: string;
        image: string;
        price: number;
        category: string;
        year?: number;
        make?: string;
        model?: string;
        average_rating?: number;
    };
    // ✅ Add these optional props to fix the error
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: any; // Accepted but optional
}

const ListingCard: React.FC<ListingCardProps> = ({ 
    data, 
    onAction, 
    disabled, 
    actionLabel, 
    actionId = "", 
    currentUser 
}) => {
    
    // Handle the button click (e.g., Delete property)
    const handleCancel = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation(); // Stop the click from opening the listing page
        
            if (disabled) {
                return;
            }
        
            if (onAction) {
                onAction(actionId);
            }
        }, [onAction, actionId, disabled]
    );

    return (
        <div className="col-span-1 group">
            <div className="flex flex-col gap-2 w-full">
                {/* 1. Main Image & Link */}
                <Link href={`/listings/${data.id}`} className="cursor-pointer">
                    <div className="aspect-square w-full relative overflow-hidden rounded-xl bg-gray-200">
                        <Image
                            fill
                            alt={data.title}
                            src={data.image}
                            className="object-cover h-full w-full group-hover:scale-110 transition"
                        />
                    </div>
                </Link>
                
                {/* 2. Listing Details */}
                <div className="font-semibold text-lg">
                    {data.make && data.model ? `${data.year} ${data.make} ${data.model}` : data.title}
                </div>
                <div className="font-light text-neutral-500">
                    {data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {data.price}
                    </div>
                    {!onAction && (
                        <div className="font-light"> / day</div>
                    )}
                </div>

                {/* 3. Action Button (Only shows if actionLabel is passed, e.g., "Delete property") */}
                {onAction && actionLabel && (
                    <button
                        disabled={disabled}
                        onClick={handleCancel}
                        className="bg-rose-500 text-white w-full py-2 rounded-lg font-semibold hover:bg-rose-600 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2 z-10 relative"
                    >
                        {actionLabel}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ListingCard;