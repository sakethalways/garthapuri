'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const foodItems = [
  { src: '/chicken biryani.png', name: 'Chicken Biryani', caption: 'Aromatic & Flavorful', dialogue: 'Slow-cooked to perfection' },
  { src: '/salad.png', name: 'Fresh Salad', caption: 'Crisp & Wholesome', dialogue: 'Farm-fresh goodness' },
  { src: '/snacks.png', name: 'Snacks Platter', caption: 'Crunchy & Spicy', dialogue: 'Perfect tea-time treat' },
  { src: '/sunundalu.png', name: 'Sunundalu', caption: 'Traditional Sweet', dialogue: 'Grandma\'s secret recipe' },
]

export default function Home() {
  const menuSectionRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const foodRingRef = useRef<HTMLDivElement>(null)
  const foodItemRefs = useRef<(HTMLDivElement | null)[]>([])
  const foodNameLabelRef = useRef<HTMLDivElement>(null)
  const [activeFoodName, setActiveFoodName] = useState('')
  const [activeCaption, setActiveCaption] = useState('')
  const [activeDialogue, setActiveDialogue] = useState('')


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
    const diningTable = document.getElementById('menu-dining-table')
    if (diningTable) {
      diningTable.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      const menuSection = document.getElementById('menu-highlights')
      menuSection?.scrollIntoView({ behavior: 'smooth' })
    }
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

  // Stepped rotation: rotate 90° → pause → hover LEFT item + show name → repeat seamlessly
  useEffect(() => {
    const ring = foodRingRef.current
    if (!ring) return

    const itemOrder = [2, 3, 0, 1]
    let cumRotation = 0
    let killed = false

    gsap.set(ring, { transformOrigin: '50% 50%' })
    foodItemRefs.current.forEach(el => {
      if (el) gsap.set(el, { transformOrigin: '50% 50%' })
    })

    const runStep = (step: number) => {
      if (killed) return

      const itemIndex = itemOrder[step % 4]
      const itemName = foodItems[itemIndex].name

      const tl = gsap.timeline({
        onComplete: () => { if (!killed) runStep(step + 1) }
      })

      if (step > 0) {
        cumRotation -= 90
        tl.to(ring, { rotation: cumRotation, duration: 0.9, ease: 'power2.inOut' })
        tl.to(foodItemRefs.current.filter(Boolean), { rotation: -cumRotation, duration: 0.9, ease: 'power2.inOut' }, '<')
      }

      tl.call(() => {
        setActiveFoodName(itemName)
        setActiveCaption(foodItems[itemIndex].caption)
        setActiveDialogue(foodItems[itemIndex].dialogue)
      })
      // Name + caption + dialogue fade in smoothly
      tl.fromTo(foodNameLabelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
      tl.to(foodItemRefs.current[itemIndex], { scale: 1.25, duration: 0.35, ease: 'power2.out' }, '<')
      tl.to({}, { duration: 1.3 })
      tl.to(foodItemRefs.current[itemIndex], { scale: 1, duration: 0.25, ease: 'power2.in' })
      // Fade out smoothly
      tl.to(foodNameLabelRef.current, { opacity: 0, duration: 0.4, ease: 'power2.in' }, '<')
    }

    runStep(0)

    return () => {
      killed = true
      gsap.killTweensOf(ring)
      foodItemRefs.current.forEach(el => { if (el) gsap.killTweensOf(el) })
      if (foodNameLabelRef.current) gsap.killTweensOf(foodNameLabelRef.current)
    }
  }, [])

  // Menu section scroll entrance animation
  useEffect(() => {
    const table = tableRef.current
    if (table) {
      gsap.set(table, { opacity: 0, scale: 0.8 })
      gsap.to(table, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: menuSectionRef.current,
          start: 'top 70%',
          once: true,
        }
      })
    }

    return () => {
      if (table) gsap.killTweensOf(table)
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f5e9d9] via-[#f8efe3] to-[#f0ddc8] -mt-14 sm:-mt-24 pb-0 sm:pb-16 md:pb-20 lg:pb-24">
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
                <Button onClick={scrollToMenu} size="lg" className="bg-gradient-to-r from-[#8d3c02] via-[#a84e10] to-[#D37B31] hover:from-[#7a3301] hover:to-[#c06a20] text-white font-bold shadow-lg hover:shadow-2xl transition-all px-6 sm:px-8 md:px-10 lg:px-12 text-sm sm:text-base lg:text-lg hover:scale-105 rounded-full font-['Playfair_Display']">
                  Order Now
                </Button>
                <Button onClick={scrollToMenu} size="lg" variant="outline" className="border-2 border-[#D37B31] text-[#8d3c02] hover:bg-gradient-to-r hover:from-[#8d3c02] hover:to-[#D37B31] hover:text-white hover:border-transparent font-bold transition-all px-6 sm:px-8 md:px-10 lg:px-12 text-sm sm:text-base lg:text-lg hover:scale-105 rounded-full font-['Playfair_Display']">
                  View Menu
                </Button>
              </div>
            </div>
          </div>
        </section>

      {/* Menu Highlights Section */}
      <section id="menu-highlights" ref={menuSectionRef} className="bg-gradient-to-bl from-[#c49a5c]/35 via-[#dcc198]/50 to-[#e8d4b8]/70 py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden relative">
        {/* Stronger warm vignette from top-right */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(141,60,2,0.14)_0%,rgba(196,154,92,0.06)_40%,transparent_70%)] pointer-events-none" />
        {/* Warm glow at bottom-left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.12)_0%,rgba(211,123,49,0.06)_35%,transparent_65%)] pointer-events-none" />
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Section Header */}
          <div className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-12 md:mb-16">
            <div className="flex justify-center mb-2">
              <Image
                src="/shefimage.png"
                alt="Menu Highlights"
                width={100}
                height={100}
                priority
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

          {/* Dining Table with Food Carousel — unified for all screen sizes */}
          <div id="menu-dining-table" className="relative flex flex-row items-center min-h-[300px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-0 lg:justify-between lg:gap-4">
            {/* Left: food name + View More button */}
            <div className="flex flex-col items-start z-10 flex-1 max-w-[45%] sm:max-w-[50%] lg:max-w-none pl-2 sm:pl-4 lg:pl-0">
              <div className="relative h-[140px] sm:h-[160px] md:h-[180px] lg:h-[220px] xl:h-[250px] w-full">
                <div
                  ref={foodNameLabelRef}
                  className="opacity-0 absolute top-0 left-0 flex flex-col gap-0.5 sm:gap-1.5 lg:gap-2"
                >
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-['Playfair_Display'] font-bold text-primary leading-tight">
                    {activeFoodName}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-['Playfair_Display'] italic text-[#D37B31]">
                    {activeCaption}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-muted-foreground mt-0.5 sm:mt-1">
                    &ldquo;{activeDialogue}&rdquo;
                  </p>
                </div>
              </div>
              <Link href="/menu" prefetch={true}>
                <Button
                  className="px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-xl bg-gradient-to-r from-[#8d3c02] via-[#a84e10] to-[#D37B31] hover:from-[#7a3301] hover:to-[#c06a20] text-white rounded-full transition-all duration-300 font-['Playfair_Display'] shadow-md hover:shadow-lg hover:scale-105"
                >
                  View More
                </Button>
              </Link>
            </div>

            {/* Right: dining table — half off-screen on mobile, full on desktop */}
            <div className="absolute right-0 lg:relative lg:right-auto -mr-[160px] sm:-mr-[170px] md:-mr-[180px] lg:mr-0 flex justify-end">
              <div ref={tableRef} className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[460px] xl:w-[540px] xl:h-[540px] 2xl:w-[600px] 2xl:h-[600px]">
                <Image
                  src="/round dining table top.png"
                  alt="Dining table"
                  fill
                  priority
                  className="object-contain"
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(44, 36, 22, 0.35)) drop-shadow(0 8px 16px rgba(141, 60, 2, 0.15))' }}
                />
                {/* All food items rotating as a group */}
                <div
                  ref={foodRingRef}
                  className="absolute inset-[15%]"
                >
                  {foodItems.map((item, index) => {
                    const angle = (index * 90) * (Math.PI / 180)
                    const radius = 32
                    const x = 50 + radius * Math.cos(angle)
                    const y = 50 + radius * Math.sin(angle)
                    const itemSize = 25
                    return (
                      <div
                        key={item.name}
                        ref={(el) => { foodItemRefs.current[index] = el }}
                        className="absolute w-[25%] h-[25%]"
                        style={{
                          left: `${x - itemSize / 2}%`,
                          top: `${y - itemSize / 2}%`,
                          filter: 'drop-shadow(0 6px 12px rgba(44, 36, 22, 0.4)) drop-shadow(0 2px 4px rgba(44, 36, 22, 0.25))',
                        }}
                      >
                        <Image
                          src={item.src}
                          alt={item.name}
                          fill
                          priority
                          className="object-contain rounded-full"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
  )
}
