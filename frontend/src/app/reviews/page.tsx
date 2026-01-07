'use client';
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import ReviewCard from "@/app/components/listing/ReviewCard"; // We use your existing card!

const AllReviewsPage = () => {
  return (
    <div>
      <Navbar isStatic={true} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* HEADER: Back Button (Visual only) */}
        <div className="mb-8 cursor-pointer w-max hover:bg-gray-100 p-2 rounded-full -ml-2">
           <Image src="/icon-back.svg" width={18} height={18} alt="Back" /> 
           {/* If you don't have icon-back, use any generic arrow or just text "<" */}
        </div>

        {/* THE MAIN SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">

          {/* --- LEFT COLUMN (Sticky Sidebar) --- */}
          {/* hidden lg:block -> Hides on mobile (optional), shows on Desktop */}
          {/* sticky top-24 -> Sticks to the screen when scrolling */}
          <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 h-fit">
             
             {/* 1. The Guest Favorite Badge */}
             <div className="flex flex-col gap-2 mb-8">
                 <div className="flex items-center gap-2">
                    <Image src="/icon-leaf.svg" width={32} height={32} alt="" className="scale-x-[-1]" />
                    <span className="text-[64px] font-bold text-gray-900 leading-none">4.98</span>
                    <Image src="/icon-leaf.svg" width={32} height={32} alt="" />
                 </div>
                 <div className="text-center font-semibold text-xl pl-2">Guest Favourite</div>
                 <div className="text-center text-gray-500 text-sm pl-2">
                     One of the most loved homes on <br/> Haven, according to guests
                 </div>
             </div>

             {/* 2. Overall Ratings Histogram */}
             <div className="mb-8 py-6 border-b border-gray-200">
                <OverallRatingGraph />
             </div>

             {/* 3. The Categories (Cleanliness, etc) */}
             {/* We stack them vertically here instead of a grid */}
             <div className="flex flex-col gap-4">
                <CategoryRow label="Cleanliness" score="5.0" icon="/icon-cleaner.svg" />
                <CategoryRow label="Accuracy" score="5.0" icon="/icon-tick.svg" />
                <CategoryRow label="Check-in" score="5.0" icon="/icon-key.svg" />
                <CategoryRow label="Communication" score="5.0" icon="/icon-message.svg" />
                <CategoryRow label="Location" score="4.7" icon="/icon-map.svg" />
                <CategoryRow label="Value" score="4.9" icon="/icon-tag.svg" />
             </div>

          </div>


          {/* --- RIGHT COLUMN (Scrollable Feed) --- */}
          <div className="col-span-1 lg:col-span-8">
             
             {/* 1. Header & Search */}
             <div className="flex flex-col gap-6 mb-8">
                <h1 className="text-2xl font-bold">101 reviews</h1>
                
                {/* Search Input */}
                <div className="relative w-full">
                    <div className="absolute top-3 left-4 opacity-50">
                        <Image src="/icon-search.svg" width={18} height={18} alt="Search" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search all reviews" 
                        className="w-full bg-gray-100 rounded-full py-3 pl-12 pr-4 border-none outline-none text-gray-700 font-medium"
                    />
                </div>
             </div>

             {/* 2. Filter Pills (Horizontal Scroll) */}
             <div className="flex flex-wrap gap-3 mb-10">
                 <FilterPill label="All reviews" active={true} />
                 <FilterPill label="Cleanliness" count={33} />
                 <FilterPill label="TV" count={13} />
                 <FilterPill label="Comfort" count={43} />
                 <FilterPill label="Location" count={12} />
             </div>

             {/* 3. The Review List */}
             <div className="flex flex-col gap-10">
                 <ReviewCard 
                    name="John Cena" 
                    date="November 2025" 
                    img="/photo-1.jpg" 
                    comment="We booked the place at the very last minute due to changes in our flight schedule..." 
                 />
                 <ReviewCard 
                    name="Randy Orton" 
                    date="December 2025" 
                    img="/photo-2.jpg" 
                    comment="Overall is good just the Grab pickup/drop off point very hard to find..." 
                 />
                 <ReviewCard 
                    name="Batista" 
                    date="October 2025" 
                    img="/photo-3.jpg" 
                    comment="Clean, nice smell, good location. The bomb!" 
                 />
                 {/* Repeat to see scrolling effect */}
                 <ReviewCard name="The Rock" date="Jan 2026" img="/photo-4.jpg" comment="Cooking smell!" />
                 <ReviewCard name="Undertaker" date="Feb 2026" img="/photo-1.jpg" comment="Very quiet place." />
             </div>

          </div>

        </div>
      </main>
    </div>
  );
}

// --- LOCAL MINI-COMPONENTS (So you don't have to create new files) ---

const CategoryRow = ({label, score, icon}: any) => (
    <div className="flex items-center justify-between w-full max-w-sm">
        <div className="flex items-center gap-4">
             <Image src={icon} width={24} height={24} alt="" className="opacity-70"/>
             <span className="text-gray-700">{label}</span>
        </div>
        <span className="text-gray-900 font-semibold">{score}</span>
    </div>
)

const FilterPill = ({label, count, active}: any) => (
    <div className={`
        px-4 py-2 rounded-full border text-sm font-semibold cursor-pointer transition
        ${active ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-700 hover:border-black'}
    `}>
        {label} {count && <span className="opacity-70 ml-1">{count}</span>}
    </div>
)

const OverallRatingGraph = () => (
    <div className="flex flex-col gap-1 w-full max-w-sm">
        {[5, 4, 3, 2, 1].map((num) => (
             <div key={num} className="flex items-center gap-3 text-xs text-gray-700">
                 <span className="w-2">{num}</span>
                 <div className="flex-grow bg-gray-200 rounded-full h-1 overflow-hidden relative">
                    {num === 5 && <div className="bg-black h-full w-[90%] absolute"></div>}
                    {num === 4 && <div className="bg-black h-full w-[10%] absolute"></div>}
                 </div>
             </div>
        ))}
    </div>
)

export default AllReviewsPage;