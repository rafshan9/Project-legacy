'use client'; 

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import InquirySidebar from "@/app/components/listing/InquirySidebar";
import ListingHead from "@/app/components/listing/ListingHead";
import ListingPhotos from "@/app/components/listing/ListingPhotos";
import ListingInfo from "@/app/components/listing/ListingInfo";
import ListingAmenities from "@/app/components/listing/ListingFeatures";
import ListingReviews from "@/app/components/listing/ListingReviews";
import ListingMap from "@/app/components/listing/ListingMap";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar"; 
import Link from "next/link";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

const ListingPage = () => {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
const handleDelete = async () => {
  const confirmed = window.confirm("Are you sure you want to delete this listing?");
  if(!confirmed) return;
  const response = await apiService.deleteListing(params.listingId as string);
  if(response.success){
    router.push('/');
  }
}
  useEffect(() => {
    const id = localStorage.getItem('userId'); 
    setUserId(id);
    const fetchListing = async () => {
      if (params.listingId) {
        const data = await apiService.getListingDetail(params.listingId as string);
        setListing(data);
      }
    };
    fetchListing();
  }, [params.listingId]);


  // --- 1. THE WAITING ROOM (Loading State) ---
  if (!listing) {
      return (
        <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
        </div>
      );
  }

  // --- 2. THE MAIN EVENT (Happy Path) ---
 
  return (
    <div>
      <main className="max-w-7xl mx-auto pt-4 md:pt-32 pb-24 px-6">
      <ListingHead 
        title={listing.title} 
      />
      <ListingPhotos 
        mainImage={listing.image} 
        images={listing.images} 
      />
      {listing.landlord.id.toString() === userId?.toString() && (
            <div className="flex gap-4 mt-6">
                {/* EDIT BUTTON */}
                <Link 
                    href={`/listings/${params.listingId}/edit`}
                    className="py-2 px-6 bg-gray-200 hover:bg-gray-300 text-black rounded-xl transition font-semibold"
                >
                    Edit Listing
                </Link>

                {/* DELETE BUTTON (Existing) */}
                <button 
                    onClick={handleDelete}
                    className="py-2 px-6 bg-rose-500 hover:bg-red-700 text-white rounded-xl transition cursor-pointer font-semibold"
                >
                    Delete Listing
                </button>
            </div>
        )}
        <div className="grid grid-cols-1 xl:grid-cols-7 gap-10 mt-8">
            
            {/* LEFT SIDE */}
            <div className="col-span-4 flex flex-col gap-10">
                <ListingInfo listing={listing} />
                <ListingAmenities amenities={listing.amenities} />
                
            </div>
           
        </div>
        <div className="flex flex-col gap-10 mt-10 pt-10">
                <ListingReviews 
                  listing={listing} 
                />
                <ListingMap center={[51.505, -0.09]}/>
            </div>
            <Footer />
      </main>
    </div>
  );
}

export default ListingPage;