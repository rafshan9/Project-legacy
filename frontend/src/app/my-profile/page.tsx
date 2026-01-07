'use client';

import { useState, useEffect } from "react";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MyProfilePage = () => {
    const router = useRouter();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    
    // 1. Updated State with new fields
    const [user, setUser] = useState({
        
        id: '',
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        address: '',
        avatar_url: '', 
    });
    const [backupUser, setBackupUser] = useState(user);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchMyDetails = async () => {
            try {
                const data = await apiService.get('/api/auth/me/');
                
                setUser({
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    // 2. Load the new data (fallback to empty string if null)
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    phone_number: data.phone_number || '',
                    address: data.address || '',
                    avatar_url: data.avatar_url || null
                });
                
                if (data.avatar_url) {
                    setPreviewUrl(data.avatar_url);
                }

            } catch (error) {
                console.error("Failed to load profile", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyDetails();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        const formData = new FormData();
        
        formData.append('username', user.username);
        formData.append('email', user.email);
        // 3. Append new fields to send to backend
        formData.append('first_name', user.first_name);
        formData.append('last_name', user.last_name);
        formData.append('phone_number', user.phone_number);
        formData.append('address', user.address);

        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        try {
            // We will create this endpoint next
            await apiService.updateProfile(formData); 
            
            alert("Profile updated successfully!");
            setIsEditing(false);
            router.refresh();
        } catch (error) {
            console.error("Save failed", error);
            alert("Failed to save changes.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="pt-32 text-center">Loading...</div>;

    return (
        <main className="max-w-[800px] mx-auto pt-4 md:pt-32 pb-24 px-6">
            <h1 className="text-3xl font-bold mb-8">My Profile Details</h1>

            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-100">
                        <Image 
                            src={previewUrl || "/photo-main.jpg"} 
                            alt="Profile" 
                            fill 
                            className="object-cover" 
                        />
                    </div>
                    {isEditing && (
                        <label className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-80 transition">
                            Change Photo
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                    )}
                </div>

                {/* Form Section */}
                <div className="space-y-6 max-w-lg mx-auto">
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">First Name</label>
                            <input 
                                type="text" 
                                value={user.first_name}
                                disabled={!isEditing}
                                onChange={(e) => setUser({...user, first_name: e.target.value})}
                                className={`p-3 border rounded-xl outline-none transition ${
                                    !isEditing ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'border-gray-300 focus:border-black'
                                }`}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Last Name</label>
                            <input 
                                type="text" 
                                value={user.last_name}
                                disabled={!isEditing}
                                onChange={(e) => setUser({...user, last_name: e.target.value})}
                                className={`p-3 border rounded-xl outline-none transition ${
                                    !isEditing ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'border-gray-300 focus:border-black'
                                }`}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Username</label>
                        <input 
                            type="text" 
                            value={user.username}
                            disabled={!isEditing}
                            onChange={(e) => setUser({...user, username: e.target.value})}
                            className={`p-3 border rounded-xl outline-none transition ${
                                !isEditing ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'border-gray-300 focus:border-black'
                            }`}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Email Address</label>
                        <input 
                            type="email" 
                            disabled={!isEditing}
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            className={`p-3 border rounded-xl outline-none transition ${
                                !isEditing ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'border-gray-300 focus:border-black'
                            }`}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Phone Number</label>
                        <input 
                            type="tel" 
                            value={user.phone_number}
                            disabled={!isEditing}
                            onChange={(e) => setUser({...user, phone_number: e.target.value})}
                            className={`p-3 border rounded-xl outline-none transition ${
                                !isEditing ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'border-gray-300 focus:border-black'
                            }`}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Address / Location</label>
                        <input 
                            type="text" 
                            value={user.address}
                            disabled={!isEditing}
                            onChange={(e) => setUser({...user, address: e.target.value})}
                            className={`p-3 border rounded-xl outline-none transition ${
                                !isEditing ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'border-gray-300 focus:border-black'
                            }`}
                        />
                    </div>

                    <div className="flex gap-4 mt-4">
                        {/* The Main Button */}
                        <button 
                            onClick={() => {
                                if (isEditing) {
                                    handleSave();
                                } else {
                                    setBackupUser(user); // 📸 Take snapshot before editing
                                    setIsEditing(true);
                                }
                            }}
                            className="flex-1 bg-primary text-white font-bold py-4 rounded-xl hover:brightness-90 transition"
                        >
                            {isEditing ? "Save Changes" : "Edit Details"}
                        </button>

                        {/* Cancel Button */}
                        {isEditing && (
                            <button 
                                onClick={() => {
                                    setUser(backupUser); // ⏪ Restore from snapshot
                                    setIsEditing(false); // 🔒 Lock the form
                                }}
                                className="px-8 bg-gray-200 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
};

export default MyProfilePage;