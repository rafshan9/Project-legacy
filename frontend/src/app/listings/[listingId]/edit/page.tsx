'use client';

import { useState, useEffect } from "react";
import apiService from "@/app/services/apiService";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

const EditListingPage = () => {
    const router = useRouter();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);

    // 1. STATE: Basic Fields
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

    // 2. STATE: Features Checklist
    const [features, setFeatures] = useState<string[]>([]);
    const [existingGallery, setExistingGallery] = useState<any[]>([]); 
    const [newGallery, setNewGallery] = useState<File[]>([]);
    
    // The list of available options (Must match Add Page)
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

    const [currentImage, setCurrentImage] = useState<string>(''); 
    const [newThumbnail, setNewThumbnail] = useState<File | null>(null);

    // 3. FETCH EXISTING DATA
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const listing = await apiService.getListingDetail(params.listingId as string); 
                setExistingGallery(listing.images || []);
                
                // Pre-fill Basic Data
                setData({
                    title: listing.title,
                    description: listing.description,
                    price: listing.price,
                    category: listing.category,
                    make: listing.make,
                    model: listing.model,
                    year: listing.year,
                    odometer: listing.odometer,
                    transmission: listing.transmission,
                    fuel_type: listing.fuel_type,
                    country: listing.country || '',
                    city: listing.city || '',
                    address: listing.address || '',
                });

                // Pre-fill Features (Handle String or Array format)
                if (listing.amenities) {
                    if (Array.isArray(listing.amenities)) {
                         setFeatures(listing.amenities);
                    } else if (typeof listing.amenities === 'string') {
                         try {
                             setFeatures(JSON.parse(listing.amenities));
                         } catch (e) {
                             setFeatures([]);
                         }
                    }
                }

                setCurrentImage(listing.image);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        
        if (params.listingId) fetchListing();
    }, [params.listingId, router]);

    const handleImageDelete = async (imageId: number) => {
        try {
            // 1. Call the API (We will add this to apiService in a second)
            const response = await apiService.deleteListingImage(params.listingId as string, imageId);
    
            if (response.success) {
                // 2. UI UPDATE: Remove the image from the state so it disappears instantly
                setExistingGallery(existingGallery.filter(img => img.id !== imageId));
                alert("Image deleted successfully");
            } else {
                alert("Failed to delete image from server");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("An error occurred while deleting.");
        }
    };

    // 4. SUBMIT UPDATE
    const submitForm = async () => {
        const formData = new FormData();
        // Loop through the newGallery files and append them
        newGallery.forEach((file) => {
            // The key MUST be 'gallery_images' because that's what we wrote in Django
            formData.append('gallery_images', file); 
        });
        // Append Basic Fields
        Object.keys(data).forEach(key => {
            formData.append(key, data[key as keyof typeof data]);
        });

        // Append Features (NEW)
        formData.append('amenities', JSON.stringify(features));

        // Only append image if user selected a NEW one
        if (newThumbnail) {
            formData.append('image', newThumbnail);
        }

        const response = await apiService.updateListing(params.listingId as string, formData);

        if (response.success) {
            router.push(`/listings/${params.listingId}`); // Go back to detail page
        } else {
            console.log(response.errors);
            alert("Failed to update listing");
        }
    };

    if (isLoading) return <div className="pt-32 text-center">Loading...</div>;

    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-32 pb-12">
            <h1 className="text-2xl font-bold mb-6">Edit your Listing</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    
                    {/* BASIC TEXT INPUTS */}
                    <div className="space-y-4">
                        <label className="block text-sm font-bold">Title</label>
                        <input 
                            value={data.title}
                            onChange={(e) => setData({...data, title: e.target.value})} 
                            className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-black" 
                        />
                        
                        <label className="block text-sm font-bold">Description</label>
                        <textarea 
                            value={data.description}
                            onChange={(e) => setData({...data, description: e.target.value})} 
                            className="w-full border border-gray-200 p-4 rounded-xl h-32 outline-none focus:border-black" 
                        />
                        
                        <div className="flex gap-4">
                            <div className="w-full">
                                <label className="block text-sm font-bold mb-1">Price</label>
                                <input 
                                    type="number" 
                                    value={data.price}
                                    onChange={(e) => setData({...data, price: e.target.value})} 
                                    className="w-full border p-4 rounded-xl" 
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-bold mb-1">Category</label>
                                <select 
                                    value={data.category}
                                    onChange={(e) => setData({...data, category: e.target.value})}
                                    className="w-full border p-4 rounded-xl bg-white" 
                                >
                                    <option value="Project">Project</option>
                                    <option value="Running">Running</option>
                                    <option value="Show Car">Show Car</option>
                                    <option value="Parts">Parts</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* CAR SPECS GRID */}
                    <div className="pt-6 border-t border-gray-200">
                        <h3 className="font-bold text-lg mb-4">Vehicle Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500">Year</label>
                                <input 
                                    type="number" value={data.year}
                                    onChange={(e) => setData({...data, year: e.target.value})} 
                                    className="w-full border border-gray-200 p-4 rounded-xl outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Make</label>
                                <input 
                                    value={data.make}
                                    onChange={(e) => setData({...data, make: e.target.value})} 
                                    className="w-full border border-gray-200 p-4 rounded-xl outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Model</label>
                                <input 
                                    value={data.model}
                                    onChange={(e) => setData({...data, model: e.target.value})} 
                                    className="w-full border border-gray-200 p-4 rounded-xl outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Odometer</label>
                                <input 
                                    type="number" value={data.odometer}
                                    onChange={(e) => setData({...data, odometer: e.target.value})} 
                                    className="w-full border border-gray-200 p-4 rounded-xl outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <select 
                                value={data.transmission}
                                onChange={(e) => setData({...data, transmission: e.target.value})}
                                className="w-full border border-gray-200 p-4 rounded-xl bg-white outline-none"
                            >
                                <option value="manual">Manual</option>
                                <option value="automatic">Automatic</option>
                            </select>

                            <select 
                                value={data.fuel_type}
                                onChange={(e) => setData({...data, fuel_type: e.target.value})}
                                className="w-full border border-gray-200 p-4 rounded-xl bg-white outline-none"
                            >
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="electric">Electric</option>
                            </select>
                        </div>
                    </div>

                    {/* FEATURES SECTION (NEW) */}
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
                    {/* GALLERY SECTION (Insert this block) */}
                    <div className="pt-6 border-t border-gray-200">
                        <h3 className="font-bold text-lg mb-4">Gallery Images</h3>

                        {/* 1. EXISTING IMAGES GRID */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {existingGallery.map((img) => (
                                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden group bg-gray-100">
                                    <img 
                                        src={`http://127.0.0.1:8000${img.image}`} 
                                        alt="Gallery"
                                        className="w-full h-full object-cover"
                                    />
                                    
                                    {/* Delete Button */}
                                    <button 
                                        type="button"
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition shadow-md hover:bg-red-600"
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this image?')) {
                                                handleImageDelete(img.id);
                                            }
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* 2. UPLOAD INPUT */}
                        <label className="block text-sm font-bold mb-2">Add More Photos</label>
                        <input 
                            type="file" 
                            multiple
                            accept="image/*" 
                            onChange={(e) => setNewGallery(Array.from(e.target.files || []))}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                        />
                    </div>

                    {/* PHOTO UPDATE */}
                    <div className="pt-6 border-t border-gray-200">
                        <h3 className="font-bold text-lg mb-4">Cover Photo</h3>
                        
                        {/* Show Current Image */}
                        {!newThumbnail && currentImage && (
                            <div className="mb-4">
                                <p className="text-xs text-gray-500 mb-2">Current Image:</p>
                                <img 
                                    src={`http://127.0.0.1:8000${currentImage}`} 
                                    alt="Current" 
                                    className="w-40 h-40 object-cover rounded-xl" 
                                />
                            </div>
                        )}

                        <label className="block text-sm font-bold mb-2">Change Cover Photo</label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => setNewThumbnail(e.target.files?.[0] || null)}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-white hover:file:brightness-90 cursor-pointer"
                        />
                    </div>

                    <button 
                        onClick={submitForm} 
                        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:brightness-90 transition mt-6"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </main>
    );
};

export default EditListingPage;