'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    // Form states
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Simple client-side authorization check
        const data = localStorage.getItem('user_data');
        if (data) {
            try {
                const parsed = JSON.parse(data);
                if (parsed.is_staff) {
                    setIsAuthorized(true);
                } else {
                    router.push('/');
                }
            } catch (e) {
                router.push('/');
            }
        } else {
            router.push('/');
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // This is where you would send the data to the backend API:
        // const token = localStorage.getItem('token');
        // await fetch('/api/listings/', { ... })
        
        alert(`Product "${title}" added successfully! (Simulation)`);
        
        setTitle('');
        setPrice('');
        setCategory('');
        setIsSubmitting(false);
    };

    if (isAuthorized === null) {
        return <div className="min-h-[60vh] flex items-center justify-center">Loading secure dashboard...</div>;
    }

    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 min-h-[60vh]">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                <h1 className="text-3xl font-bold text-gray-900">Store Dashboard</h1>
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">STAFF ONLY</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add New Product Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-32">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Product</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                                <input 
                                    type="text" 
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Organic Bananas" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" 
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    required
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="0.00" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
                                >
                                    <option value="" disabled>Select category...</option>
                                    <option value="produce">Fresh Produce</option>
                                    <option value="dairy">Dairy</option>
                                    <option value="cosmetics">Cosmetics</option>
                                    <option value="snacks">Snacks</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                                <input 
                                    type="file" 
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100 transition"
                                />
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition shadow-sm mt-4 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Adding...' : 'Add Product'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Inventory List */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Current Inventory</h2>
                            <div className="relative">
                                <input type="text" placeholder="Search products..." className="pl-8 pr-4 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                                <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Product</th>
                                        <th className="px-6 py-3 font-semibold">Category</th>
                                        <th className="px-6 py-3 font-semibold">Price</th>
                                        <th className="px-6 py-3 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <img src="/product_1.png" alt="CeraVe" className="w-10 h-10 object-contain" />
                                            <span className="font-medium text-gray-900">CeraVe Hydrating Cleanser</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">Cosmetics</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">$149.00</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-primary hover:underline text-xs font-medium mr-3">Edit</button>
                                            <button className="text-red-500 hover:underline text-xs font-medium">Delete</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <img src="https://images.unsplash.com/photo-1528825871115-3581a5387919?w=500&q=80" alt="Bananas" className="w-10 h-10 object-cover rounded" />
                                            <span className="font-medium text-gray-900">Organic Bananas</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">Fresh Produce</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">$6.00</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-primary hover:underline text-xs font-medium mr-3">Edit</button>
                                            <button className="text-red-500 hover:underline text-xs font-medium">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
