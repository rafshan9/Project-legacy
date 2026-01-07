'use client';

import Image from "next/image";

// We define that this component now expects a 'title' from the parent
interface ListingHeadProps {
    title: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({ title }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        
        {/* LEFT: Dynamic Title from Database */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
        </h1>

        {/* RIGHT: Buttons (Stay the same) */}
        <div className="flex flex-row gap-4">
            <button className="flex items-center gap-2 text-sm font-semibold hover:bg-gray-100 px-4 py-2 rounded-lg transition underline md:no-underline">
                <Image src="/icon-share.svg" alt="Share" width={16} height={16} />
                Share
            </button>

            <button className="flex items-center gap-2 text-sm font-semibold hover:bg-gray-100 px-4 py-2 rounded-lg transition underline md:no-underline">
                <Image src="/icon-heart.svg" alt="Save" width={16} height={16} />
                Save
            </button>
        </div>
    </div>
  );
};

export default ListingHead;