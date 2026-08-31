import Link from 'next/link';

export default function CartPage() {
    const cartItems = [
        {
            id: 1,
            name: "CeraVe Hydrating Facial Cleanser",
            weight: "236ml",
            price: 149,
            qty: 1,
            image: "/product_1.png"
        },
        {
            id: 2,
            name: "Organic Bananas",
            weight: "1 kg",
            price: 6,
            qty: 2,
            image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=500&q=80"
        },
        {
            id: 3,
            name: "CeraVe Moisturizing Cream",
            weight: "340g",
            price: 243,
            qty: 1,
            image: "/product_2.png"
        }
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const deliveryFee = 15;
    const total = subtotal + deliveryFee;

    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 min-h-[60vh]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Cart</h1>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-1 flex flex-col gap-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-row items-center gap-4 shadow-sm relative">
                            
                            {/* Delete button */}
                            <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>

                            <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 shrink-0 flex items-center justify-center p-2">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            
                            <div className="flex-1 pr-8">
                                <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-1">{item.name}</h3>
                                <p className="text-xs text-gray-500 mb-2">{item.weight}</p>
                                <div className="font-bold text-red-600">${item.price}</div>
                            </div>
                            
                            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                                <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-white rounded-full font-bold transition">-</button>
                                <span className="font-bold text-sm">{item.qty}</span>
                                <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-white rounded-full font-bold transition">+</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-80 shrink-0">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-32">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                        
                        <div className="flex flex-col gap-3 text-sm text-gray-600 mb-4 border-b border-gray-100 pb-4">
                            <div className="flex justify-between">
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span className="font-medium text-gray-900">${subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span className="font-medium text-gray-900">${deliveryFee}</span>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-bold text-gray-900">Total</span>
                            <span className="font-bold text-xl text-red-600">${total}</span>
                        </div>
                        
                        <Link href="/checkout" className="w-full bg-accent text-gray-900 font-bold py-3 rounded-full hover:bg-yellow-500 transition-colors shadow-sm flex justify-center">
                            Proceed to Checkout
                        </Link>
                        
                        <div className="mt-4 flex flex-col items-center justify-center gap-2">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                Secure Checkout
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <img src="/visa.svg" alt="Visa" className="h-4 object-contain" />
                                <img src="/Mastercard.svg" alt="Mastercard" className="h-5 object-contain" />
                                <img src="/amex.svg" alt="Amex" className="h-4 object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
