'use client';

import { useState, useEffect } from "react";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AddPropertyPage = () => {
    const router = useRouter();

    // 1. Basic Data State
    const [data, setData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Project',
        make: '',
        model: '',
        year: '',
        odometer: '',
        transmission: 'manual',
        fuel_type: 'petrol',
        country: '',
        city: '',
        address: '',
    });

    // 2. NEW: Features State
    const [features, setFeatures] = useState<string[]>([]);
    
    // The list of available options
    const featureOptions = [
        "Sunroof", "Leather Seats", "Navigation", "Bluetooth", 
        "Backup Camera", "Heated Seats", "Apple CarPlay", "Android Auto",
        "Keyless Entry", "Turbo", "Alloy Wheels", "Cruise Control",
        "Service Records", "Rust Free", "Modified"
    ];

    const toggleFeature = (feature: string) => {
        if (features.includes(feature)) {
            setFeatures(features.filter(f => f !== feature)); // Remove
        } else {
            setFeatures([...features, feature]); // Add
        }
    };

    const [thumbnail, setThumbnail] = useState<File | null>(null); 
    const [gallery, setGallery] = useState<File[]>([]);
    const [detailImages, setDetailImages] = useState<{file: File | null, label: string}[]>(
        [{file: null, label: 'Engine Bay'}]
    );

    const submitForm = async () => {
        if (!data.title || !thumbnail) {
            alert("Please provide at least a title and a main thumbnail.");
            return;
        }

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('make', data.make);
        formData.append('model', data.model);
        formData.append('year', data.year);
        formData.append('odometer', data.odometer);
        formData.append('transmission', data.transmission);
        formData.append('fuel_type', data.fuel_type);
        formData.append('country', data.country);
        formData.append('city', data.city);
        formData.append('address', data.address);
        
        // NEW: Send Features as a JSON string
        // (This maps to the 'amenities' JSONField in your backend)
        formData.append('amenities', JSON.stringify(features));

        formData.append('image', thumbnail);

        gallery.forEach((file) => {
            formData.append('gallery_images', file);
        });

        detailImages.forEach((item, index) => {
            if (item.file) {
                formData.append(`detail_image_${index}`, item.file);
                formData.append(`detail_label_${index}`, item.label);
            }
        });

        const response = await apiService.createListing(formData);

        if (response.success) {
            router.push('/');
        } else {
            console.error(response.errors);
            alert("Something went wrong. Check console.");
        }
    };

    useEffect(() => {
        // Simple auth check (optional)
        const user = JSON.parse(localStorage.getItem('user_data') || '{}');
    }, [router]);

    return (
        <main className="mt-12 max-w-[1500px] mx-auto pt-4 md:pt-32 pb-24 px-6">
            <h1 className="text-2xl font-bold mb-6 text-black">Sell your car</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    {/* BASIC INFO */}
                    <div className="space-y-4">
                        <input 
                            placeholder="Title (e.g. 1988 BMW E30 Project)" 
                            className="w-full border border-gray-200 p-4 rounded-xl text-black outline-none focus:border-black transition" 
                            onChange={(e) => setData({...data, title: e.target.value})} 
                        />
                        <textarea 
                            placeholder="Description..." 
                            className="w-full border border-gray-200 p-4 rounded-xl text-black h-32 outline-none focus:border-black transition" 
                            onChange={(e) => setData({...data, description: e.target.value})} 
                        />
                        
                        <div className="w-full">
                            <input 
                                type="number" 
                                placeholder="Price ($)" 
                                className="w-full border border-gray-200 p-4 rounded-xl text-black outline-none focus:border-black transition" 
                                onChange={(e) => setData({...data, price: e.target.value})} 
                            />
                        </div>

                        {/* CAR SPECS GRID */}
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                                placeholder="Year" type="number"
                                className="w-full border border-gray-200 p-4 rounded-xl text-black outline-none focus:border-black transition"
                                onChange={(e) => setData({...data, year: e.target.value})} 
                            />
                            <input 
                                placeholder="Make" 
                                className="w-full border border-gray-200 p-4 rounded-xl text-black outline-none focus:border-black transition"
                                onChange={(e) => setData({...data, make: e.target.value})} 
                            />
                            <input 
                                placeholder="Model" 
                                className="w-full border border-gray-200 p-4 rounded-xl text-black outline-none focus:border-black transition"
                                onChange={(e) => setData({...data, model: e.target.value})} 
                            />
                            <input 
                                placeholder="Odometer (km)" type="number"
                                className="w-full border border-gray-200 p-4 rounded-xl text-black outline-none focus:border-black transition"
                                onChange={(e) => setData({...data, odometer: e.target.value})} 
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <select 
                                className="w-full border border-gray-200 p-4 rounded-xl text-black bg-white outline-none" 
                                onChange={(e) => setData({...data, transmission: e.target.value})}
                            >
                                <option value="manual">Manual</option>
                                <option value="automatic">Automatic</option>
                            </select>

                            <select 
                                className="w-full border border-gray-200 p-4 rounded-xl text-black bg-white outline-none" 
                                onChange={(e) => setData({...data, fuel_type: e.target.value})}
                            >
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="electric">Electric</option>
                            </select>
                        </div>
                    </div>

                    {/* NEW: FEATURES SECTION */}
                    <div className="pt-6 border-t border-gray-200 space-y-4">
                        <h3 className="font-bold text-black">Features & Equipment</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {featureOptions.map((feature) => (
                                <div 
                                    key={feature}
                                    onClick={() => toggleFeature(feature)}
                                    className={`
                                        cursor-pointer p-3 rounded-xl text-sm font-medium border transition select-none
                                        ${features.includes(feature) 
                                            ? 'bg-black text-white border-black' 
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}
                                    `}
                                >
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DETAIL PHOTOS SECTION */}
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-black">Detail Photos</h3>
                            <button 
                                onClick={() => setDetailImages([...detailImages, {file: null, label: ''}])}
                                className="text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md transition"
                            >
                                + Add Row
                            </button>
                        </div>
                        
                        {detailImages.map((item, index) => (
                            <div key={index} className="flex gap-4 items-end border border-gray-200 p-4 rounded-xl bg-gray-50">
                                <div className="w-1/3">
                                    <label className="text-xs text-gray-500 mb-1 block">Label</label>
                                    <input 
                                        type="text" placeholder="e.g. Engine" value={item.label}
                                        onChange={(e) => {
                                            const newImages = [...detailImages];
                                            newImages[index].label = e.target.value;
                                            setDetailImages(newImages);
                                        }}
                                        className="w-full border p-2 rounded-lg text-sm outline-none"
                                    />
                                </div>
                                <div className="w-2/3">
                                    <label className="text-xs text-gray-500 mb-1 block">Photo</label>
                                    <input 
                                        type="file" accept="image/*"
                                        onChange={(e) => {
                                            const newImages = [...detailImages];
                                            newImages[index].file = e.target.files?.[0] || null;
                                            setDetailImages(newImages);
                                        }}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:brightness-90 cursor-pointer"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* LOCATION & MAIN PHOTOS (Kept same as before) */}
                    <div className="pt-6 border-t border-gray-200 space-y-4">
                        <h3 className="font-bold text-lg text-black">Location</h3>
                        <input 
                            placeholder="Address" 
                            className="w-full border border-gray-200 p-4 rounded-xl text-black outline-none focus:border-black transition" 
                            onChange={(e) => setData({...data, address: e.target.value})} 
                        />
                        <div className="flex gap-4">
                            <input 
                                placeholder="City" 
                                className="w-full border border-gray-200 p-4 rounded-xl text-black outline-none focus:border-black transition" 
                                onChange={(e) => setData({...data, city: e.target.value})} 
                            />
                            <input 
                                placeholder="Country" 
                                className="w-full border border-gray-200 p-4 rounded-xl text-black outline-none focus:border-black transition" 
                                onChange={(e) => setData({...data, country: e.target.value})} 
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-black">Main Cover Photo</label>
                            <input type="file" accept="image/*" 
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:brightness-90 cursor-pointer"
                                onChange={(e) => setThumbnail(e.target.files?.[0] || null)} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 text-black">Gallery Photos</label>
                            <input type="file" multiple 
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:brightness-90 cursor-pointer"
                                accept="image/*" onChange={(e) => setGallery(Array.from(e.target.files || []))} 
                            />
                        </div>
                    </div>

                    <button 
                        onClick={submitForm} 
                        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:brightness-90 transition shadow-lg mt-6"
                    >
                        List Vehicle
                    </button>
                </div>

                {/* PREVIEW SIDEBAR */}
                <div className="hidden md:block">
                    <div className="sticky top-32 p-6 border border-gray-200 rounded-2xl shadow-sm bg-gray-50">
                        <h2 className="font-bold text-gray-400 mb-4 text-sm uppercase">Live Preview</h2>
                        <div className="aspect-video bg-gray-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                           {thumbnail ? (
                               <img src={URL.createObjectURL(thumbnail)} className="w-full h-full object-cover" alt="Preview" />
                           ) : (
                               <p className="text-gray-400 italic">Main Cover Image</p>
                           )}
                        </div>
                        <h3 className="font-bold text-lg text-black">{data.title || "Your Vehicle Title"}</h3>
                        <p className="text-gray-600">${data.price || "0"}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {data.make && <span className="bg-white px-3 py-1 text-xs border rounded-full">{data.make}</span>}
                            {data.year && <span className="bg-white px-3 py-1 text-xs border rounded-full">{data.year}</span>}
                        </div>
                        
                        {/* LIVE FEATURES PREVIEW */}
                        {features.length > 0 && (
                             <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-400 uppercase mb-2">Selected Features</p>
                                <div className="flex flex-wrap gap-1">
                                    {features.map(f => (
                                        <span key={f} className="text-[10px] bg-gray-200 px-2 py-1 rounded">{f}</span>
                                    ))}
                                </div>
                             </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AddPropertyPage;