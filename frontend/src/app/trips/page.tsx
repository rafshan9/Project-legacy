'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import Navbar from "@/app/components/Navbar";

const TripsPage = () => {
    const [reservations, setReservations] = useState<any[]>([]);

    // 1. Fetch data on load
    useEffect(() => {
        const getReservations = async () => {
            const data = await apiService.getReservations();
            setReservations(data);
        };

        getReservations();
    }, []);

    // 2. The Cancel Logic (Moved outside useEffect so the button can use it)
    const cancelTrip = async (id: string) => {
        // Send command to backend
        await apiService.deleteReservation(id);
        
        // Update the screen instantly
        const updatedReservations = reservations.filter((reservation) => reservation.id !== id);
        setReservations(updatedReservations);
        
        alert("Reservation cancelled!");
    };

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <Navbar />
            
            <div className="pt-8 pb-4">
                <h1 className="text-2xl font-bold">My Trips</h1>
                <p className="text-neutral-500 mt-2">Where you've been and where you're going</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
                {reservations.map((reservation) => (
                    <div key={reservation.id} className="cursor-pointer group">
                        <div className="relative overflow-hidden aspect-square w-full rounded-xl">
                            <Image
                                fill
                                src={reservation.listing.image_url || '/images/placeholder.jpg'}
                                alt="Listing"
                                className="object-cover h-full w-full group-hover:scale-110 transition"
                            />
                        </div>
                        <div className="font-semibold text-lg mt-2">
                            {reservation.listing.title}
                        </div>
                        <div className="font-light text-neutral-500">
                            {reservation.start_date} - {reservation.end_date}
                        </div>
                        
                        <div className="flex flex-row items-center gap-1">
                            <div className="font-semibold">
                                $ {reservation.total_price}
                            </div>
                            <div className="font-light">total</div>
                        </div>

                        {/* 3. ADD THIS BUTTON HERE */}
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                cancelTrip(reservation.id);
                            }}
                            style={{ backgroundColor: '#f43f5e', color: 'white' }}
                            className="mt-4 w-full py-2 rounded-lg hover:opacity-80 transition"
>
                        
                            Cancel reservation
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default TripsPage;