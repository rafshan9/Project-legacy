'use client';

import Image from "next/image";
import Link from "next/link";

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
}

const ListingCard = ({ data }: ListingCardProps) => {
    return (
        <Link href={`/listings/${data.id}`} className="group cursor-pointer">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl bg-gray-200">
                    <Image
                        fill
                        alt={data.title}
                        src={data.image}
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                </div>
                
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
                </div>
            </div>
        </Link>
    );
};

export default ListingCard;