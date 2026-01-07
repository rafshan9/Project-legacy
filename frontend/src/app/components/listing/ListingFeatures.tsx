import Image from 'next/image';

const ListingFeatures = ({ amenities }: { amenities: any }) => {
    
    // 1. CLEANING LOGIC (Parses the JSON string from Django)
    let sanitizedAmenities: string[] = [];
    try {
        if (Array.isArray(amenities)) {
            sanitizedAmenities = amenities;
        } else if (typeof amenities === 'string') {
            sanitizedAmenities = JSON.parse(amenities);
        }
    } catch (error) {
        console.error("Error parsing features:", error);
        sanitizedAmenities = [];
    }

    return (
      <div className="flex flex-col gap-6 border-b border-gray-200 pb-12 pt-8">
        <h2 className="text-2xl font-semibold">Car Specs & Features</h2>
        
        {/* 2. DISPLAY LOGIC: Simple Tags with Inline Icons */}
        <div className="flex flex-wrap gap-3">
            {sanitizedAmenities.length > 0 ? (
                sanitizedAmenities.map((item, index) => (
                    <div 
                        key={index} 
                        className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl"
                    >
                        {/* Generic Inline SVG Icon (Never breaks) */}
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2} 
                            stroke="currentColor" 
                            className="w-5 h-5 text-black"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <span className="text-gray-700 font-medium capitalize">
                            {item.toString()}
                        </span>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 italic">No features listed by seller.</p>
            )}
        </div>
      </div>
    );
};
  
export default ListingFeatures;