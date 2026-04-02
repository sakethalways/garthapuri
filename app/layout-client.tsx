'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
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
      {/* Floating mobile menu button — no header bar */}
      <button
        className="sm:hidden fixed top-4 right-4 z-[60] inline-flex items-center justify-center p-2 rounded-full bg-black/30 backdrop-blur-sm transition-all"
        onClick={() => mobileMenuOpen ? closeMenu() : openMenu()}
        aria-label="Toggle menu"
      >
        <span className={`transition-all duration-300 ${mobileMenuOpen ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}`}>
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />
          ) : (
            <Menu className="h-6 w-6 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />
          )}
        </span>
      </button>

      {/* Desktop Header */}
      <nav className="hidden sm:block sticky top-0 z-50 backdrop-blur-2xl bg-[#f5e9d9]/70 border-b border-[#d4af37]/25 shadow-[0_1px_8px_rgba(212,175,55,0.08)]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-0.5 sm:py-1">
          <div className="flex items-center justify-between gap-3 sm:gap-4 relative">
            {/* Logo Section */}
            <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0 min-w-0">
              <div className="opacity-70 hover:opacity-100 transition-opacity flex-shrink-0">
                <Image
                  src="/main image.png"
                  alt="Garthapuri Logo"
                  width={50}
                  height={50}
                  priority
                  className="sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
                />
              </div>

              {/* Desktop: 4-phase cycle with text */}
              <div className="relative sm:flex sm:w-48 md:w-56 lg:w-64 h-12 md:h-13 lg:h-14 items-center min-w-0 overflow-hidden">
                <Image
                  src="/logo name tel.png"
                  alt="Garthapuri Telugu Logo"
                  width={120}
                  height={40}
                  priority
                  className="h-8 md:h-10 lg:h-11 w-auto object-contain animate-cycle-logo-tel"
                />

                <span className="absolute text-xs md:text-sm font-['Playfair_Display'] font-thin italic text-[#8d3c02] tracking-wide whitespace-nowrap drop-shadow-lg animate-cycle-text-first">
                  THE SPICE LAND OF INDIA
                </span>

                <Image
                  src="/logo name eng.png"
                  alt="Garthapuri English Logo"
                  width={120}
                  height={40}
                  priority
                  className="h-8 md:h-10 lg:h-11 w-auto object-contain animate-cycle-logo-eng absolute"
                />

                <span className="absolute text-xs md:text-sm font-['Playfair_Display'] font-thin italic text-[#8d3c02] tracking-wide whitespace-nowrap drop-shadow-lg animate-cycle-text-second">
                  THE SPICE LAND OF INDIA
                </span>
              </div>
            </div>

            {/* Center Navigation Container - Liquid Glass Effect */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="hidden md:flex items-center gap-4 lg:gap-6 px-6 lg:px-8 py-1.5 lg:py-2 rounded-full backdrop-blur-xl bg-[#faf4eb]/40 border border-[#d4af37]/20 shadow-[0_2px_12px_rgba(141,60,2,0.08)]">
                <Link href="/" className="text-xs lg:text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/menu" prefetch={true} className="text-xs lg:text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  Menu
                </Link>
                <Link href="/explore" className="text-xs lg:text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  History
                </Link>
                <Link href="/about" className="text-xs lg:text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-xs lg:text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  Contact
                </Link>
              </div>
            </div>
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
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#f5e9d9] via-[#f8efe3] to-[#f0ddc8]/95 shadow-2xl border-b-2 border-[#d4af37]/30 pt-8 pb-6 px-5 overflow-hidden"
          >
            <div className="relative flex flex-col items-center gap-1">
              {/* Nav links area with chakra background */}
              <div className="relative w-full flex flex-col items-center">
                {/* Rotating chakra - centered between dividers */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Image
                    src="/chakra1.png"
                    alt=""
                    width={400}
                    height={400}
                    priority
                    className="w-[80vw] max-w-[360px] h-auto opacity-[0.06] animate-[rotate-slow_25s_linear_infinite]"
                    aria-hidden="true"
                  />
                </div>

                {/* Nav Links */}
                {[
                  { href: '/', label: 'Home' },
                  { href: '/menu', label: 'Menu' },
                  { href: '/explore', label: 'History' },
                  { href: '/about', label: 'About' },
                  { href: '/contact', label: 'Contact' },
                ].map((link, i) => (
                  <Link
                    key={link.href}
                    ref={(el) => { menuItemsRef.current[i + 2] = el }}
                    href={link.href}
                    prefetch={true}
                    onClick={closeMenu}
                    className="relative z-10 w-full max-w-xs py-2.5 text-center text-lg sm:text-base font-['Playfair_Display'] font-medium text-foreground/80 hover:text-primary rounded-xl hover:bg-primary/5 transition-all duration-200 tracking-wide"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Order Now CTA */}
              <div ref={(el) => { menuItemsRef.current[8] = el }} className="mt-4">
                <Button
                  onClick={() => {
                    closeMenu()
                    setTimeout(() => {
                      const menu = document.getElementById('menu-highlights')
                      menu?.scrollIntoView({ behavior: 'smooth' })
                    }, 400)
                  }}
                  className="bg-gradient-to-r from-[#8d3c02] via-[#a84e10] to-[#D37B31] hover:from-[#7a3301] hover:to-[#c06a20] text-white font-['Playfair_Display'] font-semibold text-sm px-10 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all"
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
