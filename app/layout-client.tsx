'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'

function LayoutClientContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<(HTMLElement | null)[]>([])
  const isAnimating = useRef(false)

  const openMenu = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true
    setMobileMenuOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true

    const tl = gsap.timeline({
      onComplete: () => {
        setMobileMenuOpen(false)
        isAnimating.current = false
      }
    })

    // Fade out items in reverse
    tl.to(menuItemsRef.current.filter(Boolean).reverse(), {
      opacity: 0,
      y: -10,
      duration: 0.15,
      stagger: 0.03,
      ease: 'power2.in',
    })

    // Slide panel up and fade backdrop
    tl.to(overlayRef.current, {
      y: '-100%',
      duration: 0.35,
      ease: 'power3.in',
    }, '-=0.1')

    tl.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
    }, '-=0.3')
  }, [])

  // Animate in when menu opens
  useEffect(() => {
    if (mobileMenuOpen && overlayRef.current && backdropRef.current) {
      // Set initial states
      gsap.set(overlayRef.current, { y: '-100%' })
      gsap.set(backdropRef.current, { opacity: 0 })
      gsap.set(menuItemsRef.current.filter(Boolean), { opacity: 0, y: -20 })

      const tl = gsap.timeline({
        onComplete: () => { isAnimating.current = false }
      })

      // Fade in backdrop
      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })

      // Slide panel down
      tl.to(overlayRef.current, {
        y: '0%',
        duration: 0.4,
        ease: 'power3.out',
      }, '-=0.2')

      // Stagger in menu items
      tl.to(menuItemsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.06,
        ease: 'back.out(1.4)',
      }, '-=0.15')
    }
  }, [mobileMenuOpen])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Liquid Glass Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-background/40 border-b border-secondary/20">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-0.5 sm:py-1">
          <div className="flex items-center justify-between gap-3 sm:gap-4 relative">
            {/* Logo Section */}
            <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0 min-w-0">
              <div className="opacity-70 hover:opacity-100 transition-opacity flex-shrink-0">
                <Image
                  src="/main image.png"
                  alt="Garthapuri Logo"
                  width={50}
                  height={50}
                  className="w-10 h-10 sm:w-16 sm:h-16 object-contain"
                />
              </div>

              {/* Cycling Text and Logo Images */}
              <div className="relative w-36 sm:w-64 h-9 sm:h-14 flex items-center min-w-0 overflow-hidden">
                <Image
                  src="/logo name tel.png"
                  alt="Garthapuri Telugu Logo"
                  width={120}
                  height={40}
                  className="h-7 sm:h-11 w-auto object-contain animate-cycle-logo-tel"
                />

                <span className="absolute hidden sm:block text-sm font-['Playfair_Display'] font-thin italic text-[#8d3c02] tracking-wide whitespace-nowrap drop-shadow-lg animate-cycle-text-first">
                  THE SPICE LAND OF INDIA
                </span>

                <Image
                  src="/logo name eng.png"
                  alt="Garthapuri English Logo"
                  width={120}
                  height={40}
                  className="h-7 sm:h-11 w-auto object-contain animate-cycle-logo-eng absolute"
                />

                <span className="absolute hidden sm:block text-sm font-['Playfair_Display'] font-thin italic text-[#8d3c02] tracking-wide whitespace-nowrap drop-shadow-lg animate-cycle-text-second">
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
                <a href="/about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  About
                </a>
                <button onClick={() => {
                  const footer = document.querySelector('footer')
                  footer?.scrollIntoView({ behavior: 'smooth' })
                }} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                  Contact
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-[60] inline-flex items-center justify-center w-9 h-9 hover:bg-secondary/20 transition-colors rounded-full"
              onClick={() => mobileMenuOpen ? closeMenu() : openMenu()}
              aria-label="Toggle menu"
            >
              <span className={`transition-all duration-300 ${mobileMenuOpen ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}`}>
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-primary" />
                ) : (
                  <Menu className="h-5 w-5 text-primary" />
                )}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Fixed position, doesn't push content */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[55]" style={{ top: 0 }}>
          {/* Backdrop */}
          <div
            ref={backdropRef}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Menu Panel - slides from top */}
          <div
            ref={overlayRef}
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-background via-background to-background/95 shadow-2xl border-b-2 border-secondary/30 pt-8 pb-6 px-5"
          >
            <div className="flex flex-col items-center gap-1">
              {/* Divider */}
              <div
                ref={(el) => { menuItemsRef.current[1] = el }}
                className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-1"
              />

              {/* Nav Links */}
              {[
                { href: '/', label: 'Home' },
                { href: '/explore', label: 'History' },
                { href: '/about', label: 'About' },
              ].map((link, i) => (
                <a
                  key={link.href}
                  ref={(el) => { menuItemsRef.current[i + 2] = el }}
                  href={link.href}
                  onClick={closeMenu}
                  className="w-full max-w-xs py-2.5 text-center text-base font-['Playfair_Display'] font-medium text-foreground/80 hover:text-primary rounded-xl hover:bg-primary/5 transition-all duration-200 tracking-wide"
                >
                  {link.label}
                </a>
              ))}

              {/* Contact button */}
              <button
                ref={(el) => { menuItemsRef.current[5] = el }}
                onClick={() => {
                  closeMenu()
                  setTimeout(() => {
                    const footer = document.querySelector('footer')
                    footer?.scrollIntoView({ behavior: 'smooth' })
                  }, 400)
                }}
                className="w-full max-w-xs py-2.5 text-center text-base font-['Playfair_Display'] font-medium text-foreground/80 hover:text-primary rounded-xl hover:bg-primary/5 transition-all duration-200 tracking-wide cursor-pointer"
              >
                Contact
              </button>

              {/* Divider */}
              <div
                ref={(el) => { menuItemsRef.current[6] = el }}
                className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent my-2"
              />

              {/* Order Now CTA */}
              <div ref={(el) => { menuItemsRef.current[7] = el }}>
                <Button
                  onClick={() => {
                    closeMenu()
                    setTimeout(() => {
                      const menu = document.getElementById('menu-highlights')
                      menu?.scrollIntoView({ behavior: 'smooth' })
                    }, 400)
                  }}
                  className="bg-primary hover:bg-primary/90 text-background font-['Playfair_Display'] font-semibold text-sm px-10 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const LayoutClient = memo(LayoutClientContent)
