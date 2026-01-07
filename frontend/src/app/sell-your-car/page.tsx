'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";

const BecomeHostPage = () => {
    const router = useRouter();
    
    // State for the "necessary details"
    const [formData, setFormData] = useState({
        fullName: "",
        location: "",
        idNumber: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await apiService.post('/api/users/become-host/', formData);

        if (response.success) {
            const updatedUser = JSON.stringify({
                ...JSON.parse(localStorage.getItem('user_data') || '{}'),
                is_host: true
            });
            localStorage.setItem('user_data', updatedUser);
            router.push('/add'); // Once verified, go to "Sell my car" form
        }
        setIsLoading(false);
    };

    return (
        <main className="max-w-xl mx-auto pt-4 md:pt-32 pb-24 px-6">
            <h1 className="text-3xl font-bold mb-2">Become a Seller</h1>
            <p className="text-gray-600 mb-8">Fill in your details to start listing your home.</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Full Name (as per ID)</label>
                    <input 
                        required
                        className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Bruce Lee"
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Location</label>
                    <input 
                        required
                        className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-primary"
                        placeholder="San Francisco, CA"
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold">ID / Passport Number</label>
                    <input 
                        required
                        className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-primary"
                        placeholder="A12345678"
                        onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                    />
                </div>

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 bg-primary text-white py-4 rounded-xl font-bold hover:brightness-90 transition disabled:bg-gray-400"
                >
                    {isLoading ? "Processing..." : "Finish & Become a Seller"}
                </button>
            </form>
        </main>
    );
};

export default BecomeHostPage;