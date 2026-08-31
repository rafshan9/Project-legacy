'use client';

const SaleBanner = () => {
    return (
        <div className="w-full h-full min-h-[400px] xl:min-h-[500px] bg-red-600 rounded-xl overflow-hidden relative flex flex-col items-center pt-10 px-4 text-center shadow-lg border border-red-700">
            
            {/* Header Text */}
            <h2 className="relative z-20 text-4xl md:text-5xl font-extrabold text-white leading-tight italic mb-4 drop-shadow-md">
                Special<br/>Savings!
            </h2>
            
            {/* Image Container */}
            <div className="absolute bottom-0 left-0 right-0 h-[75%]">
                {/* Gradient for smooth transition from red background */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-red-600 z-10 h-20"></div>
                <img 
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" 
                    alt="Grocery Bag" 
                    className="w-full h-full object-cover object-center opacity-95"
                />
            </div>

            {/* Circular badge */}
            <div className="absolute bottom-6 right-6 bg-white text-red-600 rounded-full w-24 h-24 flex items-center justify-center font-bold text-xl leading-5 shadow-2xl border-[4px] border-red-100 z-20 transform rotate-12">
                BIG<br/>SALE
            </div>
        </div>
    );
};

export default SaleBanner;
