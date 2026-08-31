'use client';
import Navbar from "./components/Navbar";
import PropertyCard from "./components/PropertyCard";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import AdCarousel from "./components/AdCarousel";
import CategoryCarousel from "./components/CategoryCarousel";
import RecommendedSection from "./components/RecommendedSection";
import WeekdayDeals from "./components/WeekdayDeals";
import CosmeticSection from "./components/CosmeticSection";
import SaleBanner from "./components/SaleBanner";
import DummyProductGrid from "./components/DummyProductGrid";
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
    <main className="min-h-screen flex flex-col bg-gray-50">
      
      {/* The main content area starts below the sticky navbar */}
      <div className="flex-1 max-w-[1500px] w-full mx-auto flex flex-row">
        
        {/* Left Sidebar */}
        <Sidebar />

        {/* Right Main Content */}
        <div className="flex-1 p-6 md:p-8 overflow-hidden w-full max-w-full">
            <AdCarousel />
            <CategoryCarousel />

        </div>
      </div>

      {/* Full width sections below sidebar */}
      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-8 pb-10">
          {/* Recommended Section */}
          <div className="w-full">
              <RecommendedSection listings={listings} />
          </div>

          {/* Weekday Deals Row */}
          <div className="w-full mt-10">
              <WeekdayDeals />
          </div>

          {/* Dummy Products Grid (Fresh Produce) */}
          <DummyProductGrid />

          {/* Cosmetic Section */}
          <div className="w-full mt-10">
              <CosmeticSection />
          </div>
      </div>
      
      <Footer />
      
    </main>
    
  );
}