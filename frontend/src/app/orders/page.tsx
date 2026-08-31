import Link from 'next/link';

export default function OrdersPage() {
    const dummyOrders = [
        {
            id: "#ORD-99102",
            date: "August 30, 2026",
            total: "$413.00",
            status: "Pending Payment",
            items: [
                { name: "CeraVe Hydrating Facial Cleanser", qty: 1, price: "$149.00", image: "/product_1.png" },
                { name: "CeraVe Moisturizing Cream", qty: 1, price: "$243.00", image: "/product_2.png" },
            ]
        },
        {
            id: "#ORD-98234",
            date: "August 24, 2026",
            total: "$42.50",
            status: "Delivered",
            items: [
                { name: "Organic Bananas", qty: 2, price: "$6.00", image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=500&q=80" },
                { name: "Whole Milk", qty: 1, price: "$4.00", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80" },
            ]
        },
        {
            id: "#ORD-97521",
            date: "August 18, 2026",
            total: "$15.00",
            status: "Delivered",
            items: [
                { name: "Sea Salt Potato Chips", qty: 3, price: "$6.00", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80" }
            ]
        }
    ];

    return (
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10 min-h-[60vh] flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
            
            <div className="flex flex-col gap-6">
                {dummyOrders.map(order => (
                    <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-4 mb-4 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Order ID: <span className="font-bold text-gray-900">{order.id}</span></p>
                                <p className="text-sm text-gray-500">Placed on: {order.date}</p>
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <p className="text-sm text-gray-500">Total: <span className="font-bold text-gray-900 text-lg">{order.total}</span></p>
                                {order.status === "Pending Payment" ? (
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">{order.status}</span>
                                        <Link href="/checkout" className="px-4 py-1.5 bg-primary text-white text-sm font-bold rounded-full hover:bg-blue-700 transition shadow-sm">Pay Now</Link>
                                    </div>
                                ) : (
                                    <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">{order.status}</span>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 shrink-0 flex justify-center items-center p-1">
                                        <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">{item.name}</h3>
                                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                                    </div>
                                    <div className="font-bold text-gray-900">
                                        {item.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
