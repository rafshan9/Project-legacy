export default function SellPage() {
    return (
        <div className="max-w-[1500px] mx-auto px-6 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Sell on FreshMart</h1>
            <p className="text-gray-600 text-lg mb-8">Reach thousands of customers by selling your fresh produce and groceries on our platform.</p>
            <button className="bg-accent px-8 py-4 rounded-full font-bold text-gray-900 hover:bg-yellow-500 transition shadow-md">
                Get Started
            </button>
        </div>
    );
}
