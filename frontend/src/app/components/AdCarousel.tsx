'use client';
import { useState, useEffect } from "react";
import Image from "next/image";

const AdCarousel = () => {
    const slides = [
        {
            id: 1,
            title: "Super Saver Deals!",
            subtitle: "Get up to 20% off on monthly groceries.",
            buttonText: "Shop Now",
            image: "/super_saver.jpg",
            alt: "Super Saver Deals"
        },
        {
            id: 2,
            title: "Fresh Organic Produce",
            subtitle: "Locally sourced, delivered to your door.",
            buttonText: "Explore",
            image: "/fresh_produce.jpeg",
            alt: "Fresh Organic Produce"
        },
        {
            id: 3,
            title: "Daily Dairy Needs",
            subtitle: "Fresh milk, cheese, and more.",
            buttonText: "View Dairy",
            image: "/daily_dairy.jpeg",
            alt: "Daily Dairy Needs"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        <div className="w-full relative h-[250px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8 shadow-sm flex items-center justify-center border border-gray-100 bg-gray-900 group">
            
            <Image 
                src={slides[currentIndex].image}
                alt={slides[currentIndex].alt}
                fill
                className="object-cover object-center"
                priority={currentIndex === 0}
                unoptimized
            />

            {/* Dark overlay to make text readable */}
            <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

            {/* Slide Content */}
            <div className="relative z-20 text-center space-y-2 sm:space-y-4 p-4 sm:p-8 max-w-3xl">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">{slides[currentIndex].title}</h2>
                <p className="text-gray-100 text-base sm:text-lg md:text-xl font-medium drop-shadow-md">{slides[currentIndex].subtitle}</p>
                <div className="inline-block mt-2 sm:mt-4 bg-accent text-gray-900 px-6 py-2 sm:px-8 sm:py-3 rounded-full font-bold text-sm sm:text-base shadow-lg cursor-pointer hover:bg-yellow-500 transition-all hover:scale-105 active:scale-95">
                    {slides[currentIndex].buttonText}
                </div>
            </div>

            {/* Navigation Arrows */}
            <div onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-white text-gray-800 transition opacity-0 group-hover:opacity-100 z-30">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </div>
            <div onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-white text-gray-800 transition opacity-0 group-hover:opacity-100 z-30">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
            
            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {slides.map((_, idx) => (
                    <div 
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 shadow-sm ${idx === currentIndex ? 'bg-primary w-8' : 'bg-white/80 hover:bg-white w-2.5'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdCarousel;
