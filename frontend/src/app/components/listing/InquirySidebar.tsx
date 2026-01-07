'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useMessageHostModal from "@/app/hooks/useMessageHostModal"; // Import the message modal hook
import { useState, useEffect } from "react";

interface InquirySidebarProps {
  price: number;
  listing: any; // We don't need dateRange anymore
}

const InquirySidebar = ({ 
  price, 
  listing
}: InquirySidebarProps) => {

  const loginModal = useLoginModal();
  const messageModal = useMessageHostModal();
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
     const userId = localStorage.getItem('userId');
     setCurrentUser(userId);
  }, []);

  const onCreateInquiry = () => {
      if (!currentUser) {
          return loginModal.onOpen();
      }
      // Open the message modal to contact seller
      messageModal.onOpen(); 
  }

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden shadow-xl p-6 sticky top-28">
      
      {/* 1. PRICE HEADER */}
      <div className="flex flex-col gap-1 mb-6">
          <div className="flex flex-row items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">$ {price.toLocaleString()}</span>
          </div>
          <div className="font-light text-neutral-500 text-sm">
              Fixed Price (Negotiable)
          </div>
      </div>

      {/* 2. CALL TO ACTION */}
      <div className="flex flex-col gap-3">
          <button 
            onClick={onCreateInquiry}
            className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition shadow-lg"
          >
            Contact Seller
          </button>
          
          <div className="text-center text-xs text-gray-400 mt-2">
             You won't be charged yet.
          </div>
      </div>

      {/* 3. SAFETY BADGE (Optional but nice for cars) */}
      <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3">
           <div className="p-2 bg-rose-50 rounded-full text-rose-500">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
               </svg>
           </div>
           <div className="text-xs text-gray-500 font-medium">
               Verified Ownership
           </div>
      </div>

    </div>
  );
};

export default InquirySidebar;