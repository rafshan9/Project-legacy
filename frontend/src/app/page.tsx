'use client';
import Navbar from "./components/Navbar";
import PropertyCard from "./components/PropertyCard";
import Footer from "./components/Footer";
import {useState, useEffect} from "react";
import { ListingType } from "./types";


export default function Home() {
  const [listings, setListings] = useState<ListingType[]>([]);
  const getListings = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/listings/');
      const json = await response.json();
      
      console.log("Data fetched:", json.data);
      setListings(json.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getListings();
  }, []);
  return (
    <main>
      <Navbar />
      <div className="pt-32 pb-2 px-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {listings.map((listing) => {
          return (
            <PropertyCard 
              key={listing.id}
              listing={listing}
            />
          )
        })}
      </div>
      <Footer />
      
    </main>
    
  );
}