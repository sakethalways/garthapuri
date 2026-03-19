'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const menuCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const menuSectionRef = useRef<HTMLDivElement>(null)

  // Hero animation refs
  const heroLogoMobileRef = useRef<HTMLDivElement>(null)
  const heroLogoDesktopRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLDivElement>(null)
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null)
  const heroButtonsRef = useRef<HTMLDivElement>(null)

  const handleWhatsAppRedirect = () => {
    const phoneNumber = '919676136222'
    const message = "Hello Garthapuri! 🍽️ I'm ready to indulge in your authentic culinary treasures. Let's explore your cloud kitchen offerings! ✨"
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu-highlights')
    menuSection?.scrollIntoView({ behavior: 'smooth' })
  }

  // Hero entrance animation — only on first visit per session
  // CSS class `hero-needs-anim` is added by inline script in layout.tsx
  // BEFORE React hydrates, so elements are hidden with zero flash.
  useEffect(() => {
    const needsAnim = document.documentElement.classList.contains('hero-needs-anim')

    if (!needsAnim) return // Already played — elements are visible, nothing to do

    const logoMobile = heroLogoMobileRef.current
    const logoDesktop = heroLogoDesktopRef.current
    const title = heroTitleRef.current
    const subtitle = heroSubtitleRef.current
    const buttons = heroButtonsRef.current

    // Remove the CSS class so GSAP takes over inline styles
    document.documentElement.classList.remove('hero-needs-anim')

    // Set GSAP initial states (matching the CSS we just removed)
    ;[logoMobile, logoDesktop].forEach(el => {
      if (el) gsap.set(el, { opacity: 0, scale: 0.3 })
    })
    ;[title, subtitle, buttons].forEach(el => {
      if (el) gsap.set(el, { opacity: 0, y: 40 })
    })

    // Build the animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('hero-anim-played', 'true')
        // Clean up inline styles so CSS classes work normally
        ;[logoMobile, logoDesktop, title, subtitle, buttons].forEach(el => {
          if (el) gsap.set(el, { clearProps: 'all' })
        })
      }
    })

    // Logo pops out from center of chakra
    tl.to([logoMobile, logoDesktop].filter(Boolean), {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'back.out(1.7)',
    })

    // Title slides up
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, '-=0.5')

    // Subtitle slides up
    tl.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, '-=0.5')

    // Buttons slide up
    tl.to(buttons, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, '-=0.5')

    return () => { tl.kill() }
  }, [])

  // Menu cards scroll animation
  useEffect(() => {
    if (menuCardsRef.current.length > 0) {
      menuCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.set(card, {
            opacity: 0,
            y: 60,
            scale: 0.85,
            rotationZ: -3
          })

          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationZ: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: menuSectionRef.current,
              start: 'top 30%',
              end: 'top center',
              scrub: false,
              once: true
            }
          })

          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.08,
              y: -10,
              boxShadow: '0 25px 50px rgba(141, 60, 2, 0.3)',
              duration: 0.3,
              ease: 'power2.out'
            })
          })

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
              duration: 0.3,
              ease: 'power2.out'
            })
          })
        }
      })
    }

    return () => {
      menuCardsRef.current.forEach(card => {
        if (card) gsap.killTweensOf(card)
      })
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-card/20 -mt-14 sm:-mt-24 pb-0 sm:pb-16 md:pb-20 lg:pb-24">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col items-center justify-center gap-0 relative min-h-[calc(100svh-3.5rem)] sm:h-screen pt-0 sm:pt-20 md:pt-24">

            {/* === MOBILE: Flow layout for chakra + logo === */}
            <div className="flex sm:hidden flex-col items-center justify-center flex-1 w-full relative -mb-16">
              <div className="relative flex items-center justify-center -my-10">
                {/* Chakra — only rotates, no entrance animation */}
                <div className="animate-rotate-slow opacity-60">
                  <Image
                    src="/chakra3.png"
                    alt="Decorative chakra"
                    width={1000}
                    height={1000}
                    priority
                    className="w-[160vw] h-[160vw] max-w-[650px] max-h-[650px] object-contain"
                  />
                </div>
                {/* Logo — pops out via GSAP */}
                <div ref={heroLogoMobileRef} data-hero-logo className="absolute inset-0 flex items-center justify-center drop-shadow-lg">
                  <Image
                    src="/engtopb logo.png"
                    alt="Garthapuri - The Spice Land of India"
                    width={650}
                    height={650}
                    priority
                    className="w-[115vw] h-[115vw] max-w-[500px] max-h-[500px] object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* === DESKTOP: Absolute positioning === */}
            <div className="hidden sm:flex absolute inset-0 items-center justify-center pointer-events-none z-0">
              <div className="animate-rotate-slow opacity-60">
                <Image
                  src="/chakra3.png"
                  alt="Decorative chakra"
                  width={1000}
                  height={1000}
                  priority
                  className="sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] object-contain"
                />
              </div>
            </div>

            <div ref={heroLogoDesktopRef} data-hero-logo className="hidden sm:flex absolute z-10 items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg">
              <Image
                src="/engtopb logo.png"
                alt="Garthapuri - The Spice Land of India"
                width={650}
                height={650}
                priority
                className="sm:w-[430px] sm:h-[430px] md:w-[500px] md:h-[500px] lg:w-[750px] lg:h-[750px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Threshold Image - Left Bottom */}
            <div className="absolute z-5 -bottom-24 -left-28 pointer-events-none hidden sm:block">
              <Image
                src="/threshold image6.png"
                alt="Threshold decoration"
                width={380}
                height={380}
                priority
                className="w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 object-contain"
              />
            </div>

            {/* Thali Image - Top Right */}
            <div className="absolute z-5 top-7/12 -right-72 pointer-events-none opacity-50 transform -translate-y-1/2 hidden sm:block">
              <Image
                src="/thali.png"
                alt="Thali decoration"
                width={600}
                height={600}
                priority
                className="sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px] object-contain"
              />
            </div>


            {/* Hero Content */}
            <div className="relative z-10 w-full flex flex-col items-center gap-2 sm:gap-4 md:gap-5 pb-6 sm:pb-0 sm:mt-[304px] md:mt-[368px]">
              {/* Title */}
              <div ref={heroTitleRef} data-hero-text className="text-center max-w-4xl mx-auto px-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-['Playfair_Display'] font-bold text-primary leading-tight">
                  Where Every Element Has A Story
                </h1>
              </div>

              {/* Subtitle */}
              <p ref={heroSubtitleRef} data-hero-text className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto px-4">
                Experience authentic Indian cuisine rooted in ancient traditions, crafted with devotion and unhurried quality.
              </p>

              {/* CTA Buttons */}
              <div ref={heroButtonsRef} data-hero-text className="flex flex-row gap-3 sm:gap-4 mt-6 mb-8 sm:mt-2 sm:mb-0">
                <Button onClick={scrollToMenu} size="lg" className="bg-primary hover:bg-primary/90 text-background font-bold shadow-lg hover:shadow-2xl transition-all px-6 sm:px-8 md:px-10 lg:px-12 text-sm sm:text-base lg:text-lg hover:scale-105 rounded-full font-['Playfair_Display']">
                  Order Now
                </Button>
                <Button onClick={scrollToMenu} size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-background font-bold transition-all px-6 sm:px-8 md:px-10 lg:px-12 text-sm sm:text-base lg:text-lg hover:scale-105 rounded-full font-['Playfair_Display']">
                  View Menu
                </Button>
              </div>
            </div>
          </div>
        </section>

      {/* Menu Highlights Section */}
      <section id="menu-highlights" ref={menuSectionRef} className="bg-gradient-to-b from-[#d4af37]/20 to-[#d4af37]/10 py-4 sm:py-6 md:py-8 lg:py-10 pb-12 sm:pb-20 md:pb-28 lg:pb-32">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Section Header */}
          <div className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-12 md:mb-16">
            <div className="flex justify-center mb-2">
              <Image
                src="/shefimage.png"
                alt="Menu Highlights"
                width={100}
                height={100}
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-['Playfair_Display'] font-bold text-primary">
              <span className="hidden sm:inline-block">—</span>
              <span className="sm:mx-4">Menu Highlights</span>
              <span className="hidden sm:inline-block">—</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              A curated selection of delicious meals made fresh in our cloud kitchen – for every mood and moment.
            </p>
          </div>

          {/* Menu Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 lg:gap-8">
            {/* Morning */}
            <div
              ref={(el) => { menuCardsRef.current[0] = el }}
              onClick={handleWhatsAppRedirect}
              className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                <Image
                  src="/thali.png"
                  alt="Morning meals"
                  width={100}
                  height={100}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-['Playfair_Display'] font-bold text-primary mb-1 sm:mb-2">
                Morning
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Fresh starts &amp; energizing flavors
              </p>
            </div>

            {/* Afternoon */}
            <div
              ref={(el) => { menuCardsRef.current[1] = el }}
              onClick={handleWhatsAppRedirect}
              className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                <Image
                  src="/thali.png"
                  alt="Afternoon meals"
                  width={100}
                  height={100}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-['Playfair_Display'] font-bold text-primary mb-1 sm:mb-2">
                Afternoon
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Refreshing meals &amp; light bites
              </p>
            </div>

            {/* Evening */}
            <div
              ref={(el) => { menuCardsRef.current[2] = el }}
              onClick={handleWhatsAppRedirect}
              className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                <Image
                  src="/thali.png"
                  alt="Evening meals"
                  width={100}
                  height={100}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-['Playfair_Display'] font-bold text-primary mb-1 sm:mb-2">
                Evening
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Comfort food &amp; beverages
              </p>
            </div>

            {/* Dinner */}
            <div
              ref={(el) => { menuCardsRef.current[3] = el }}
              onClick={handleWhatsAppRedirect}
              className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                <Image
                  src="/thali.png"
                  alt="Dinner meals"
                  width={100}
                  height={100}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-['Playfair_Display'] font-bold text-primary mb-1 sm:mb-2">
                Dinner
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Exquisite dining experiences
              </p>
            </div>
          </div>
        </div>
      </section>
      </>
  )
}
