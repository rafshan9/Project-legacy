'use client';
import DealCard from "./DealCard";

const DummyProductGrid = () => {
    // Dummy Deals for Vegetables
    const vegetables = [
        { id: "v1", title: "Fresh Organic Tomatoes", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80", price: 3, oldPrice: 4, discount: 1, weight: "1 kg" },
        { id: "v2", title: "Crispy Green Lettuce", image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=500&q=80", price: 2, oldPrice: 3, discount: 1, weight: "1 head" },
        { id: "v3", title: "Organic Carrots Bunch", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&q=80", price: 4, oldPrice: 5, discount: 1, weight: "500g" },
        { id: "v4", title: "Fresh Broccoli", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&q=80", price: 5, oldPrice: 6, discount: 1, weight: "1 piece" },
        { id: "v5", title: "Red Bell Peppers", image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&q=80", price: 6, oldPrice: 8, discount: 2, weight: "1 kg" },
    ];

    return (
        <div className="w-full mt-10 pb-8">
            <div className="flex items-center justify-between pb-2">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 uppercase tracking-wide">Fresh Produce Deals</h2>
                <a href="#" className="text-sm font-semibold text-primary hover:underline">View All</a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {vegetables.map((item) => (
                    <div key={item.id} className="w-full">
                        <DealCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DummyProductGrid;
