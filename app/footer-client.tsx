'use client'

import { Phone, MapPin, Mail } from 'lucide-react'
import Image from 'next/image'

export function FooterClient() {
  return (
    <footer className="bg-primary text-background">
      
      {/* Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-2 sm:pb-3">
        {/* Footer Content Grid - Responsive */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="space-y-3 text-center md:text-left">
            <Image
              src="/main image.png"
              alt="Garthapuri"
              width={100}
              height={100}
              className="w-24 h-24 sm:w-32 sm:h-32 object-contain mx-auto md:mx-0"
            />
            <div>
              <h3 className="font-['Playfair_Display'] font-semibold text-xl sm:text-2xl">Garthapuri</h3>
              <p className="text-xs sm:text-sm opacity-90 font-medium tracking-wide">THE SPICE LAND OF INDIA</p>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2 text-center md:text-left pt-12 sm:pt-16">
            <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 justify-center md:justify-start">
              <MapPin className="w-5 h-5" />
              Location
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              Chandramouli Nagar 5/2<br />
              Guntur
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-2 text-center md:text-left pt-12 sm:pt-16">
            <h4 className="font-semibold text-base sm:text-lg">Contact Us</h4>
            <ul className="space-y-1 text-xs sm:text-sm opacity-90">
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+919676136222" className="hover:opacity-100 transition-opacity break-all">
                  +91-9676136222
                </a>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@garthapuri.in" className="hover:opacity-100 transition-opacity break-all">
                  info@garthapuri.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-xs sm:text-sm opacity-90 space-y-1 pt-3 sm:pt-4 border-t border-background/20 relative">
          <div className="absolute -right-4 sm:-right-6 -top-48 sm:-top-56">
            <Image
              src="/footer image.png"
              alt="Footer decoration"
              width={200}
              height={200}
              className="w-48 h-48 sm:w-64 sm:h-64 object-contain opacity-80"
            />
          </div>
          <p className="font-semibold font-['Playfair_Display'] text-sm sm:text-base">Where Every Element Has A Story</p>
          <p className="text-xs sm:text-sm">&copy; 2026 Garthapuri - The Spice Land of India. All rights reserved.</p>
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
