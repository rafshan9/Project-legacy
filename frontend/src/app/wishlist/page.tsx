export default function WishlistPage() {
    const wishlistItems = [
        {
            id: 1,
            name: "CeraVe Foaming Cleanser",
            weight: "236ml",
            price: 155,
            image: "/product_3.png"
        },
        {
            id: 2,
            name: "CeraVe Daily Moisturizing Lotion",
            weight: "236ml",
            price: 139,
            image: "/product_4.png"
        },
        {
            id: 3,
            name: "Organic Honey",
            weight: "500g",
            price: 12,
            image: "https://images.unsplash.com/photo-1587049352847-81a56d773cbc?w=500&q=80"
        }
    ];

    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 min-h-[60vh]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm relative group hover:shadow-md transition">
                        
                        {/* Remove from wishlist button */}
                        <button className="absolute top-3 right-3 text-red-500 hover:text-red-600 transition bg-red-50 p-1.5 rounded-full">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                        </button>
                        
                        <div className="w-full h-48 mb-4 bg-gray-50 rounded-xl flex items-center justify-center p-4">
                            <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                        </div>
                        
                        <h3 className="font-bold text-gray-900 text-sm h-10 line-clamp-2 mb-1">{item.name}</h3>
                        <p className="text-xs text-gray-500 mb-3">{item.weight}</p>
                        <div className="font-bold text-red-600 text-lg mb-4">${item.price}</div>
                        
                        <button className="w-full bg-accent text-gray-900 font-bold py-2.5 rounded-full hover:bg-yellow-500 transition text-sm flex justify-center items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
