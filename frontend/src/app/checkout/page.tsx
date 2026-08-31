import Link from 'next/link';

export default function CheckoutPage() {
    return (
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10 min-h-[60vh]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                
                <div className="mb-8">
                    <p className="text-sm font-medium text-gray-700 mb-3">Pay with:</p>
                    <div className="flex items-center gap-4">
                        <div className="border-2 border-primary rounded-xl p-3 flex items-center justify-center w-24 h-16 bg-blue-50 cursor-pointer shadow-sm">
                            <img src="/visa.svg" alt="Visa" className="h-6 object-contain" />
                        </div>
                        <div className="border border-gray-200 hover:border-primary rounded-xl p-3 flex items-center justify-center w-24 h-16 cursor-pointer transition">
                            <img src="/Mastercard.svg" alt="Mastercard" className="h-8 object-contain" />
                        </div>
                        <div className="border border-gray-200 hover:border-primary rounded-xl p-3 flex items-center justify-center w-24 h-16 cursor-pointer transition">
                            <img src="/amex.svg" alt="Amex" className="h-6 object-contain" />
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <input type="text" placeholder="**** **** **** ****" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" />
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input type="text" placeholder="123" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                        <input type="text" placeholder="John Doe" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" />
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-100 pt-8">
                    <div className="flex justify-between items-center mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <span className="text-gray-700 font-medium">Total to pay:</span>
                        <span className="text-2xl font-bold text-red-600">$413.00</span>
                    </div>
                    
                    <Link href="/orders" className="w-full flex justify-center items-center bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-lg text-lg">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        Pay Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
