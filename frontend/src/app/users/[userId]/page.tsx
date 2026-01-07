'use client';

import { useState, useEffect } from "react";
import apiService from "@/app/services/apiService";
import { useParams } from "next/navigation";

const UserProfilePage = () => {
    const params = useParams();
    const userId = params.userId as string;

    const [landlord, setLandlord] = useState<any>(null);
    const [listings, setListings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // 1. Get the listings for this specific user
                // We assume your backend listing API supports filtering: /api/listings/?landlord=ID
                const listingsData = await apiService.getListings({ landlord: userId });
                setListings(listingsData);

                // 2. Extract landlord info from the first listing (A shortcut to avoid making a new API endpoint)
                if (listingsData.length > 0) {
                    setLandlord(listingsData[0].landlord);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    if (isLoading) {
        return <main className="max-w-[1500px] mx-auto px-6 pt-32 pb-12">Loading profile...</main>;
    }

    if (!landlord) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 pt-32 pb-12">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">User not found</h1>
                    <p className="text-gray-500">This user has no active listings.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-32 pb-12">
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                
                {/* LEFT COLUMN: Profile Card */}
                <div className="md:col-span-1">
                    <div className="sticky top-32">
                        
                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <h3 className="font-bold mb-4">{landlord.username}'s Confirmed Information</h3>
                            <div className="flex flex-col gap-2 text-gray-600">
                                <div className="flex gap-2 items-center">
                                    <span>✓</span> Identity verified
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span>✓</span> Email address verified
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span>✓</span> Phone number verified
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Their Listings */}
                <div className="md:col-span-3">
                    <h1 className="text-3xl font-bold mb-8">{landlord.username}'s listings</h1>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((listing: any) => (
                            <ListingCard 
                                key={listing.id} 
                                data={listing} 
                            />
                        ))}
                    </div>

                    {listings.length === 0 && (
                        <p className="text-gray-500">No active listings.</p>
                    )}
                </div>

            </div>
        </main>
    );
};

export default UserProfilePage;