'use client';

import dynamic from "next/dynamic";

// 1. We import the 'Map' component dynamically
// ssr: false means "Server Side Rendering: OFF"
const Map = dynamic(() => import('../Map'), { 
    ssr: false 
});

interface ListingMapProps {
    center?: number[]
}

const ListingMap = ({ center }: ListingMapProps) => {
    return (
        <div className="h-[40vh] w-full rounded-xl overflow-hidden mt-4">
            <Map center={center} />
        </div>
    );
}

export default ListingMap;