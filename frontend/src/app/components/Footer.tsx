const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-10 border-t border-blue-800 relative overflow-hidden">
      
      {/* Optional faint background pattern here if desired, but we keep the pure blue color */}
      <div className="max-w-[1500px] mx-auto px-6 py-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12">
          
          {/* Column 1: Logo & Contact Info */}
          <div className="flex flex-col space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <span className="font-bold text-2xl tracking-tight">FreshMart</span>
            </div>
            <h3 className="font-extrabold text-lg">Always Here for You</h3>
            <div className="text-sm text-blue-100 space-y-1 font-medium">
              <p>Call Us: 16469 <span className="text-[10px] opacity-80">(8am-10pm, Everyday)</span></p>
              <p>Email Us: queries@freshmart.net</p>
              <p className="pt-2 text-xs opacity-70 uppercase font-bold tracking-wide">FRESHMART E-COMMERCE LIMITED</p>
            </div>
          </div>

          {/* Column 2: Information */}
          <div className="flex flex-col space-y-4">
             <h3 className="font-bold text-lg">Information</h3>
             <ul className="space-y-3 text-sm text-blue-200 list-none p-0 font-medium">
               <li className="cursor-pointer hover:text-white hover:underline transition">Office Address</li>
               <li className="cursor-pointer hover:text-white hover:underline transition">Shipping & returns</li>
               <li className="cursor-pointer hover:text-white hover:underline transition">About us</li>
               <li className="cursor-pointer hover:text-white hover:underline transition">Terms & Condition</li>
             </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="flex flex-col space-y-4">
             <h3 className="font-bold text-lg">Customer Service</h3>
             <ul className="space-y-3 text-sm text-blue-200 list-none p-0 font-medium">
               <li className="cursor-pointer hover:text-white hover:underline transition">Contact Us</li>
             </ul>
          </div>

          {/* Column 4: My Account */}
          <div className="flex flex-col space-y-4">
             <h3 className="font-bold text-lg">My Account</h3>
             <ul className="space-y-3 text-sm text-blue-200 list-none p-0 font-medium">
               <li className="cursor-pointer hover:text-white hover:underline transition">Profile</li>
               <li className="cursor-pointer hover:text-white hover:underline transition">Order History</li>
               <li className="cursor-pointer hover:text-white hover:underline transition">Wishlist</li>
             </ul>
          </div>

          {/* Column 5: Pay With & Follow Us */}
          <div className="flex flex-col space-y-8">
             
             {/* Pay With */}
             <div>
               <h3 className="font-bold text-lg mb-3">Pay With</h3>
               <div className="flex flex-wrap gap-2">
                 <div className="bg-white w-12 h-8 rounded flex items-center justify-center px-1 shadow-sm overflow-hidden border border-gray-200">
                    <img src="/visa.svg" alt="Visa" className="w-full h-full object-contain" />
                 </div>
                 <div className="bg-white w-12 h-8 rounded flex items-center justify-center px-1 shadow-sm overflow-hidden border border-gray-200">
                    <img src="/Mastercard.svg" alt="MasterCard" className="w-full h-full object-contain" />
                 </div>
                 <div className="bg-white w-12 h-8 rounded flex items-center justify-center px-1 shadow-sm overflow-hidden border border-gray-200">
                    <img src="/amex.svg" alt="Amex" className="w-full h-full object-contain" />
                 </div>
               </div>
             </div>

             {/* Follow Us */}
             <div>
               <h3 className="font-bold text-lg mb-3">Follow Us</h3>
               <div className="flex gap-3">
                 <div className="w-9 h-9 bg-[#1877F2] rounded-md flex items-center justify-center cursor-pointer hover:brightness-110 transition shadow-md">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                 </div>
                 <div className="w-9 h-9 bg-[#FF0000] rounded-md flex items-center justify-center cursor-pointer hover:brightness-110 transition shadow-md">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                 </div>
               </div>
             </div>

          </div>

        </div>

        <div className="border-t border-blue-800 mt-12 pt-6 text-center text-sm text-blue-300 font-medium">
          © 2026 FreshMart, Inc. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer;