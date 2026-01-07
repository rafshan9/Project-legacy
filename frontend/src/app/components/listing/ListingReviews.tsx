'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

const ListingReviews = ({ listing }: { listing: any }) => {
  const router = useRouter();
  const reviews = listing.reviews || [];
  const average = listing.average_rating || 0;

  // State
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. CORRECT WAY TO LOAD USER (Matches your LoginModal)
  useEffect(() => {
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('userName');

      if (userId && userName) {
          // Reconstruct the user object so the logic below works
          setCurrentUser({
              id: userId,
              username: userName
          });
      }
  }, []);

  // Logic Checks
  // We use "==" loosely because localStorage is always a string, but the API might send a number
  const isOwner = currentUser?.id == listing.landlord.id;
  
  // Check if this username already exists in the reviews list
  const hasReviewed = reviews.some((r: any) => r.user_name === currentUser?.username);

  const submitReview = async () => {
      if (!currentUser) {
          alert("Please login to leave a review.");
          return;
      }
      setIsSubmitting(true);
      
      try {
          const response = await apiService.postReview(listing.id, rating, comment);
          if (response) {
              setComment(""); 
              router.refresh(); 
          }
      } catch (error) {
          console.error(error);
          alert("Failed to submit review.");
      } finally {
          setIsSubmitting(false);
      }
  }

  return (
    <div className="flex flex-col gap-8 border-b border-gray-200 pb-12 pt-8">
      
      <h2 className="text-2xl font-semibold">Seller Reviews</h2>
      
      {/* RATING CARD */}
      <div className="flex flex-col items-center justify-center text-center my-6 relative">
          <div className="relative inline-block">
             <div className="absolute -left-20 w-24 h-24 hidden md:block">
                 <Image src="/icon-leaf.svg" fill alt="" className="object-contain scale-x-[-1]" />
             </div>
             <div className="absolute -right-20 w-24 h-24 hidden md:block">
                 <Image src="/icon-leaf.svg" fill alt="" className="object-contain" />
             </div>
             <span className="text-[80px] font-bold leading-none text-gray-900 relative z-10">
                 {Number(average).toFixed(2)}
             </span>
          </div>
          <div className="font-semibold text-4xl mt-4">Top Rated Seller</div>
          <div className="text-gray-500 text-sm max-w-xs mx-auto mt-1">
               Based on {reviews.length} community reviews
          </div>
      </div>

      {/* WRITE A REVIEW FORM */}
      {!isOwner && !hasReviewed && currentUser && (
          <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 max-w-2xl mx-auto w-full">
              <h3 className="font-semibold text-lg mb-4">Leave a Review</h3>
              
              <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-2xl transition hover:scale-110 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                          ★
                      </button>
                  ))}
              </div>

              <textarea 
                  className="w-full border border-gray-200 rounded-lg p-4 h-32 focus:outline-black mb-4"
                  placeholder="How was the car? Was the seller honest?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
              />

              <button 
                  onClick={submitReview}
                  disabled={isSubmitting}
                  className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50"
              >
                  {isSubmitting ? 'Posting...' : 'Post Review'}
              </button>
          </div>
      )}
      
      {/* Messages if form is hidden */}
      {isOwner && (
          <div className="text-center text-gray-500 italic text-sm">(You cannot review your own listing)</div>
      )}
      {hasReviewed && (
          <div className="text-center text-green-600 font-medium text-sm">✓ You have already reviewed this seller</div>
      )}

      {/* REVIEWS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {reviews.length > 0 ? (
            reviews.map((review: any) => (
                <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <p className="text-gray-500 col-span-2 text-center">No reviews yet.</p>
          )}
      </div>
    </div>
  );
};

const ReviewCard = ({ review }: { review: any }) => {
    return (
        <div className="flex flex-col gap-4 border border-gray-100 p-4 rounded-xl bg-gray-50/50">
            <div className="flex flex-row items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <Image 
                        src={review.avatar_url || "/photo-main.jpg"} 
                        fill 
                        className="object-cover" 
                        alt={review.user_name} 
                    /> 
                </div>
                <div>
                    <div className="font-semibold text-base">{review.user_name}</div>
                    <div className="text-gray-500 text-xs">
                        {new Date(review.created_at).toLocaleDateString()}
                    </div>
                </div>
            </div>
            <div>
                <div className="flex text-xs mb-2 text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-gray-700 text-base leading-relaxed">
                    {review.comment}
                </div>
            </div>
        </div>
    )
}

export default ListingReviews;