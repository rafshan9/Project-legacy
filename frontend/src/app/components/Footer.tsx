import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-10">
      
      {/* THE MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ============================================= */}
        {/* BLOCK 1: THE THREE COLUMNS (Support, Hosting, Airbnb) */}
        {/* ============================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* COLUMN 1: SUPPORT */}
          <div className="flex flex-col space-y-4">
             <h3 className="font-semibold text-text-primary">Support</h3>
             <ul className="space-y-3 text-sm text-text-secondary list-none p-0">
               <li className="cursor-pointer hover:underline">Help Center</li>
               <li className="cursor-pointer hover:underline">AirCover</li>
               <li className="cursor-pointer hover:underline">Anti-discrimination</li>
               <li className="cursor-pointer hover:underline">Disability support</li>
               <li className="cursor-pointer hover:underline">Cancellation options</li>
               <li className="cursor-pointer hover:underline">Report neighborhood concern</li>
             </ul>
          </div>

          {/* COLUMN 2: HOSTING */}
          <div className="flex flex-col space-y-4">
             <h3 className="font-semibold text-text-primary">Hosting</h3>
             <ul className="space-y-3 text-sm text-text-secondary list-none p-0">
               <li className="cursor-pointer hover:underline">Airbnb your home</li>
               <li className="cursor-pointer hover:underline">AirCover for Hosts</li>
               <li className="cursor-pointer hover:underline">Hosting resources</li>
               <li className="cursor-pointer hover:underline">Community forum</li>
               <li className="cursor-pointer hover:underline">Hosting responsibly</li>
               <li className="cursor-pointer hover:underline">Airbnb-friendly apartments</li>
             </ul>
          </div>

          {/* COLUMN 3: AIRBNB */}
          <div className="flex flex-col space-y-4">
             <h3 className="font-semibold text-text-primary">Airbnb</h3>
             <ul className="space-y-3 text-sm text-text-secondary list-none p-0">
               <li className="cursor-pointer hover:underline">Newsroom</li>
               <li className="cursor-pointer hover:underline">New features</li>
               <li className="cursor-pointer hover:underline">Careers</li>
               <li className="cursor-pointer hover:underline">Investors</li>
               <li className="cursor-pointer hover:underline">Gift cards</li>
               <li className="cursor-pointer hover:underline">Airbnb.org emergency stays</li>
             </ul>
          </div>

        </div>

        {/* ============================================= */}
        {/* BLOCK 2: THE DIVIDER LINE */}
        {/* ============================================= */}
        <div className="border-t border-gray-200 my-8"></div>


        {/* ============================================= */}
        {/* BLOCK 3: THE BOTTOM BAR (Copyright + Icons) */}
        {/* ============================================= */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
          
          {/* LEFT SIDE: Copyright */}
          <div className="flex flex-wrap flex-row gap-2 justify-center md:justify-start">
            <span>© 2025 Airbnb, Inc.</span>
            <span className="hidden md:inline">·</span>
            <span className="cursor-pointer hover:underline">Privacy</span>
            <span className="hidden md:inline">·</span>
            <span className="cursor-pointer hover:underline">Terms</span>
            <span className="hidden md:inline">·</span>
            <span className="cursor-pointer hover:underline">Sitemap</span>
          </div>

          {/* RIGHT SIDE: Icons & Settings */}
          <div className="flex flex-row gap-6 font-semibold items-center">
            
            {/* Globe + Language */}
            <div className="flex items-center gap-2 cursor-pointer hover:underline">
               <Image src="/icon-globe.svg" alt="Globe" width={16} height={16} />
               <span>English (US)</span>
            </div>

            {/* Currency */}
            <div className="cursor-pointer hover:underline">
               $ USD
            </div>

            {/* Social Icons Placeholder */}
            {/* You can add real icons here later */}
            <div className="flex gap-4 ml-2">
            <div className="w-4 h-4 rounded-sm cursor-pointer flex items-center justify-center">
                <Image 
                    src="/icon-facebook.svg" 
                    alt="Facebook"  
                    width={16}     
                    height={16}     
                />
            </div>
            <div className="w-4 h-4  rounded-sm cursor-pointer flex items-center justify-center">
                <Image 
                    src="/icon-instagram.svg" 
                    alt="Facebook"   
                    width={16}       
                    height={16}      
                />
            </div>
            <div className="w-4 h-4 rounded-sm cursor-pointer flex items-center justify-center ">
                <Image 
                    src="/icon-x.svg" 
                    alt="Facebook"   
                    width={16}       
                    height={16}   
                />
            </div>
            </div>

          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer;