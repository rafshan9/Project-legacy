'use client';

import { useState } from "react";

import { categories } from "../constants/categories";

const Sidebar = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    return (
        <div className="relative w-64 bg-white border-r border-gray-200 h-full hidden md:block z-10 shadow-sm">
            <ul className="py-4">
                {categories.map((category) => (
                    <li 
                        key={category.name}
                        className="group"
                        onMouseEnter={() => setActiveCategory(category.name)}
                        onMouseLeave={() => setActiveCategory(null)}
                    >
                        <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{category.icon}</span>
                                <span className="text-sm font-medium text-gray-800 group-hover:text-primary">{category.name}</span>
                            </div>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>

                        {/* Dropdown Menu (Subcategories) */}
                        {activeCategory === category.name && (
                            <div className="absolute left-full top-0 h-full w-64 bg-white border-l border-r border-gray-200 shadow-xl overflow-y-auto z-20">
                                <ul className="py-4">
                                    {category.subcategories.map((sub, idx) => (
                                        <li key={idx} className="px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary cursor-pointer transition">
                                            {sub}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
