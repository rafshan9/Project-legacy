import Image from 'next/image';

const FreshDealsBanner = () => {
    return (
        <div className="w-full h-full min-h-[450px] xl:min-h-full relative rounded-xl overflow-hidden shadow-sm group cursor-pointer border border-gray-100">
            <Image
                src="/fresh_deals.png"
                alt="Fresh Deals"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
                unoptimized
            />
        </div>
    );
};

export default FreshDealsBanner;
