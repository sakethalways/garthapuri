'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function LayoutClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Liquid Glass Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-background/40 border-b border-secondary/20">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-3 sm:gap-4 relative">
            {/* Logo Section */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src="/main image.png"
                  alt="Garthapuri Logo"
                  width={50}
                  height={50}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                />
              </div>
              
              {/* Cycling Text and Logo Images */}
              <div className="relative w-48 sm:w-64 h-10 sm:h-14 flex items-center">
                <Image
                  src="/logo name tel.png"
                  alt="Garthapuri Telugu Logo"
                  width={120}
                  height={40}
                  className="h-8 sm:h-11 w-auto object-contain animate-cycle-logo-tel"
                />
                
                <span className="absolute text-xs sm:text-sm font-['Playfair_Display'] font-thin italic text-[#8d3c02] tracking-wide whitespace-nowrap drop-shadow-lg animate-cycle-text-first">
                  THE SPICE LAND OF INDIA
                </span>
                
                <Image
                  src="/logo name eng.png"
                  alt="Garthapuri English Logo"
                  width={120}
                  height={40}
                  className="h-8 sm:h-11 w-auto object-contain animate-cycle-logo-eng absolute"
                />

                <span className="absolute text-xs sm:text-sm font-['Playfair_Display'] font-thin italic text-[#8d3c02] tracking-wide whitespace-nowrap drop-shadow-lg animate-cycle-text-second">
                  THE SPICE LAND OF INDIA
                </span>
              </div>
            </div>

            {/* Center Navigation Container - Liquid Glass Effect */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="hidden md:flex items-center gap-6 px-8 py-2 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
                <a href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  Home
                </a>
                <a href="/explore" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  History
                </a>
                <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  About
                </a>
                <a href="#contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  Contact
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 hover:bg-secondary/20 transition-colors rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-primary" />
              ) : (
                <Menu className="h-5 w-5 text-primary" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 pb-3 space-y-2">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg p-4 space-y-3">
                <p className="text-xs font-['Playfair_Display'] font-semibold text-secondary tracking-wide text-center">
                  THE SPICE LAND OF INDIA
                </p>
                <a href="/" className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded hover:bg-primary/10 text-center">
                  Home
                </a>
                <a href="/explore" className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded hover:bg-primary/10 text-center">
                  History
                </a>
                <a href="#about" className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded hover:bg-primary/10 text-center">
                  About
                </a>
                <a href="#contact" className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded hover:bg-primary/10 text-center">
                  Contact
                </a>
                <Button className="w-full mt-2 bg-primary hover:bg-primary/90 text-background font-semibold text-sm py-2">
                  Order Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

    </>
  )
}
