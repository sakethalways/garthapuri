'use client'

import { Phone, MapPin, Mail } from 'lucide-react'
import Image from 'next/image'

export function FooterClient() {
  return (
    <footer className="bg-primary text-background">
      
      {/* Footer Content */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-6 sm:pt-8 md:pt-10 lg:pt-14 pb-2 sm:pb-3">
        {/* Footer Content Grid - Responsive */}
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4 sm:mb-6 md:mb-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center sm:items-start gap-1 sm:gap-0 sm:space-y-3 text-center sm:text-left">
            <Image
              src="/main image.png"
              alt="Garthapuri"
              width={100}
              height={100}
              className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
            />
            <div className="text-center sm:text-left">
              <h3 className="font-['Playfair_Display'] font-semibold text-lg sm:text-xl md:text-2xl">Garthapuri</h3>
              <p className="text-[10px] sm:text-xs md:text-sm opacity-90 font-medium tracking-wide">THE SPICE LAND OF INDIA</p>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1 sm:space-y-2 text-center sm:text-left sm:pt-12 md:pt-14 lg:pt-16">
            <h4 className="font-semibold text-sm sm:text-base md:text-lg flex items-center gap-2 justify-center sm:justify-start">
              <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
              Location
            </h4>
            <p className="text-xs sm:text-xs md:text-sm leading-relaxed opacity-90">
              Chandramouli Nagar 5/2, Guntur
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-1 sm:space-y-2 text-center sm:text-left sm:pt-12 md:pt-14 lg:pt-16">
            <h4 className="font-semibold text-sm sm:text-base md:text-lg">Contact Us</h4>
            <ul className="space-y-1 text-xs sm:text-xs md:text-sm opacity-90">
              <li className="flex items-center gap-2 justify-center sm:justify-start">
                <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                <a href="tel:+919676136222" className="hover:opacity-100 transition-opacity">
                  +91-9676136222
                </a>
              </li>
              <li className="flex items-center gap-2 justify-center sm:justify-start">
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                <a href="mailto:info@garthapuri.in" className="hover:opacity-100 transition-opacity">
                  info@garthapuri.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-xs sm:text-sm opacity-90 space-y-1 pt-3 sm:pt-4 border-t border-background/20 relative">
          <div className="absolute -right-4 sm:-right-6 -top-32 sm:-top-44 md:-top-52 lg:-top-56 hidden sm:block">
            <Image
              src="/footer image.png"
              alt="Footer decoration"
              width={200}
              height={200}
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain opacity-80"
            />
          </div>
          <p className="font-semibold font-['Playfair_Display'] text-xs sm:text-sm md:text-base">Where Every Element Has A Story</p>
          <p className="text-[10px] sm:text-xs md:text-sm">&copy; 2026 Garthapuri - The Spice Land of India. All rights reserved.</p>
        </div>
      </div>
      
      {/* Decorative Bottom Border - Colour Line - Full width seamless, completely flush */}
      <Image
        src="/colour line.png"
        alt="Decorative footer line"
        width={1920}
        height={60}
        className="w-screen h-auto object-cover block -ml-[calc((100vw-100%)/2)] -mt-3"
        priority
      />
    </footer>
  )
}
