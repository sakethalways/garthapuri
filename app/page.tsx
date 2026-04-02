'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const foodItems = [
  { src: '/chicken biryani.png', name: 'Chicken Biryani', caption: 'Aromatic & Flavorful', dialogue: 'Slow-cooked to perfection', color: '212, 136, 46' },
  { src: '/salad.png', name: 'Fresh Salad', caption: 'Crisp & Wholesome', dialogue: 'Farm-fresh goodness', color: '90, 140, 60' },
  { src: '/snacks.png', name: 'Snacks Platter', caption: 'Crunchy & Spicy', dialogue: 'Perfect tea-time treat', color: '200, 150, 64' },
  { src: '/sunundalu.png', name: 'Sunundalu', caption: 'Traditional Sweet', dialogue: 'Grandma\'s secret recipe', color: '201, 168, 85' },
]

export default function Home() {
  const menuSectionRef = useRef<HTMLDivElement>(null)

  const foodItemRefs = useRef<(HTMLDivElement | null)[]>([])
  const mobileFoodItemRefs = useRef<(HTMLDivElement | null)[]>([])
  const foodNameLabelRef = useRef<HTMLDivElement>(null)
  const mobileFoodNameRef = useRef<HTMLDivElement>(null)
  const desktopBgRef = useRef<HTMLDivElement>(null)
  const mobileBgRef = useRef<HTMLDivElement>(null)
  // Desktop text refs — updated via direct DOM to avoid React re-render flicker
  const desktopNameRef = useRef<HTMLParagraphElement>(null)
  const desktopCaptionRef = useRef<HTMLParagraphElement>(null)
  const desktopDialogueRef = useRef<HTMLParagraphElement>(null)
  // Mobile text refs — updated via direct DOM to avoid React re-render flicker
  const mobileNameRef = useRef<HTMLParagraphElement>(null)
  const mobileCaptionRef = useRef<HTMLParagraphElement>(null)
  const mobileDialogueRef = useRef<HTMLParagraphElement>(null)
  const [showMobileButtons, setShowMobileButtons] = useState(false)
  const [mobileVideoSkipped, setMobileVideoSkipped] = useState(false)


  // Hero refs
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const heroLogoMobileRef = useRef<HTMLDivElement>(null)
  const heroLogoDesktopRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLDivElement>(null)
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null)
  const heroButtonsRef = useRef<HTMLDivElement>(null)


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

  // Arc carousel: plate enters from bottom-right arc, scales up at center, exits top-right arc
  useEffect(() => {
    const items = foodItemRefs.current.filter(Boolean)
    const label = foodNameLabelRef.current
    if (items.length === 0 || !label) return

    let killed = false
    let step = 0

    // Hide all plates at top-right starting position
    items.forEach(el => {
      if (el) gsap.set(el, { opacity: 0, scale: 0.35, xPercent: 80, yPercent: -120, rotation: 20 })
    })
    // Label starts hidden
    gsap.set(label, { opacity: 0, y: 0 })

    const runStep = () => {
      if (killed) return
      const currentIndex = step % foodItems.length

      const el = items[currentIndex]
      if (!el) return

      // Reset label to hidden state before this step begins
      gsap.set(label, { opacity: 0, y: -15 })

      const tl = gsap.timeline({
        onComplete: () => { if (!killed) { step++; runStep() } }
      })

      // Update text directly via DOM — no React re-render, no flicker
      if (desktopNameRef.current) desktopNameRef.current.textContent = foodItems[currentIndex].name
      if (desktopCaptionRef.current) desktopCaptionRef.current.textContent = foodItems[currentIndex].caption
      if (desktopDialogueRef.current) desktopDialogueRef.current.textContent = `\u201c${foodItems[currentIndex].dialogue}\u201d`

      // Sync background color with plate entrance at t=0
      if (desktopBgRef.current) {
        tl.to(desktopBgRef.current, {
          background: `rgba(${foodItems[currentIndex].color}, 0.55)`,
          duration: 0.6,
          ease: 'power2.inOut'
        }, 0)
      }

      // Enter plate + text simultaneously at t=0
      tl.fromTo(el,
        { opacity: 0, scale: 0.35, xPercent: 80, yPercent: -120, rotation: 20 },
        { opacity: 1, scale: 1.2, xPercent: 0, yPercent: 0, rotation: 0, duration: 0.95, ease: 'power3.out' },
        0
      )
      tl.fromTo(label,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out' },
        0
      )

      // Hold
      tl.to({}, { duration: 2.0 })

      // Exit plate + text simultaneously
      tl.to(el,
        { opacity: 0, scale: 0.35, xPercent: 80, yPercent: 120, rotation: -20, duration: 0.85, ease: 'power3.in' },
        '+=0'
      )
      tl.to(label,
        { opacity: 0, y: 10, duration: 0.85, ease: 'power3.in' },
        '<'
      )
    }

    runStep()

    return () => {
      killed = true
      items.forEach(el => { if (el) gsap.killTweensOf(el) })
      if (label) gsap.killTweensOf(label)
    }
  }, [])

  // Mobile split-screen carousel: fade + scale up plate at split
  useEffect(() => {
    const items = mobileFoodItemRefs.current.filter(Boolean)
    const label = mobileFoodNameRef.current
    if (items.length === 0 || !label) return

    let killed = false
    let step = 0

    // All plates start at bottom-left off screen
    items.forEach(el => {
      if (el) gsap.set(el, { opacity: 0, scale: 0.4, xPercent: -100, yPercent: 80, rotation: -15 })
    })
    gsap.set(label, { opacity: 0, y: 20 })

    const runMobileStep = () => {
      if (killed) return
      const currentIndex = step % foodItems.length
      const el = items[currentIndex]
      if (!el) return

      // Update text directly via DOM — no React re-render, no flicker
      if (mobileNameRef.current) mobileNameRef.current.textContent = foodItems[currentIndex].name
      if (mobileCaptionRef.current) mobileCaptionRef.current.textContent = foodItems[currentIndex].caption
      if (mobileDialogueRef.current) mobileDialogueRef.current.textContent = `\u201c${foodItems[currentIndex].dialogue}\u201d`
      gsap.set(label, { opacity: 0, y: 20 })

      const tl = gsap.timeline({
        onComplete: () => { if (!killed) { step++; runMobileStep() } }
      })

      // Sync background color with plate entrance at t=0
      if (mobileBgRef.current) {
        tl.to(mobileBgRef.current, {
          backgroundColor: `rgba(${foodItems[currentIndex].color}, 0.85)`,
          duration: 0.6,
          ease: 'power2.inOut'
        }, 0)
      }

      // Enter: arc from bottom-left → center
      tl.fromTo(el,
        { opacity: 0, scale: 0.4, xPercent: -100, yPercent: 80, rotation: -15 },
        { opacity: 1, scale: 1, xPercent: 0, yPercent: 0, rotation: 0, duration: 0.9, ease: 'power3.out' }, 0
      )
      // Text in sync
      tl.fromTo(label,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0
      )

      // Hold
      tl.to({}, { duration: 2.2 })

      // Exit: arc to bottom-right
      tl.to(el,
        { opacity: 0, scale: 0.4, xPercent: 100, yPercent: 80, rotation: 15, duration: 0.8, ease: 'power3.in' }
      )
      tl.to(label, { opacity: 0, y: -15, duration: 0.8, ease: 'power3.in' }, '<')
    }

    runMobileStep()

    return () => {
      killed = true
      items.forEach(el => { if (el) gsap.killTweensOf(el) })
      if (label) gsap.killTweensOf(label)
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f5e9d9] via-[#f2e0cc] to-[#eddaba] mt-0 sm:-mt-[60px] sm:h-[100svh]">

          {/* === MOBILE: Full-screen video hero === */}
          <div className="sm:hidden relative w-full h-[100svh]">
            <video
              ref={heroVideoRef}
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              onCanPlay={(e) => {
                const video = e.currentTarget
                const hasPlayed = sessionStorage.getItem('hero-video-played')
                if (hasPlayed) {
                  video.pause()
                  video.style.display = 'none'
                  setMobileVideoSkipped(true)
                  setShowMobileButtons(true)
                } else {
                  video.playbackRate = 1.25
                }
              }}
              onTimeUpdate={(e) => {
                if (!showMobileButtons && e.currentTarget.currentTime >= 5.9) {
                  setShowMobileButtons(true)
                }
              }}
              onEnded={() => {
                sessionStorage.setItem('hero-video-played', 'true')
              }}
            >
              <source src="/Video-164.mp4" type="video/mp4" />
            </video>

            {/* Static fallback — replaces video on revisit */}
            {mobileVideoSkipped && (
              <div className="absolute inset-0 bg-[#f5e9d9] flex flex-col items-center justify-center px-6 z-[1]">
                <Image
                  src="/engtopb logo.png"
                  alt="Garthapuri"
                  width={400}
                  height={400}
                  priority
                  className="w-52 h-52 object-contain drop-shadow-2xl"
                />
              </div>
            )}

            {/* CTA buttons — fade in at 5.9s */}
            <div className={`absolute bottom-3 left-0 right-0 flex justify-center gap-3 z-10 transition-opacity duration-700 ${showMobileButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <Button onClick={scrollToMenu} size="lg" className="bg-gradient-to-r from-[#8d3c02] via-[#a84e10] to-[#D37B31] hover:from-[#7a3301] hover:to-[#c06a20] text-white font-bold shadow-lg hover:shadow-2xl transition-all px-6 text-sm hover:scale-105 rounded-full font-['Playfair_Display']">
                Order Now
              </Button>
              <Button onClick={scrollToMenu} size="lg" variant="outline" className="border-2 border-[#D37B31] text-[#D37B31] hover:bg-gradient-to-r hover:from-[#8d3c02] hover:to-[#D37B31] hover:text-white hover:border-transparent font-bold transition-all px-6 text-sm hover:scale-105 rounded-full font-['Playfair_Display'] bg-white/80 backdrop-blur-sm">
                View Menu
              </Button>
            </div>
          </div>

          {/* Desktop gradient overlays — gold & red warmth (on section level) */}
          <div className="hidden sm:block absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.15)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(207,32,47,0.08)_0%,rgba(211,123,49,0.05)_30%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(211,123,49,0.1)_0%,transparent_45%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.1)_0%,rgba(207,32,47,0.04)_35%,transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,233,217,0.6)_0%,rgba(245,233,217,0)_40%)]" />
          </div>

          {/* Top-right corner chakra — half visible, clipped by overflow-hidden */}
          <div className="hidden sm:block absolute -top-[100px] -right-[120px] md:-top-[130px] md:-right-[160px] lg:-top-[165px] lg:-right-[200px] xl:-top-[210px] xl:-right-[250px] pointer-events-none z-[1]">
            <div className="animate-rotate-slow">
              <Image
                src="/newchakra2.png"
                alt="Decorative chakra"
                width={500}
                height={500}
                priority
                className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] object-contain opacity-70"
              />
            </div>
          </div>

          <div className="hidden sm:flex w-full pl-6 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-24 pr-4 sm:pr-6 md:pr-8 lg:pr-10 flex-row items-start justify-center gap-4 lg:gap-8 relative h-full pt-[80px] md:pt-[100px]">

            {/* Logo — absolute center of screen */}
            <div ref={heroLogoDesktopRef} data-hero-logo className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg">
              <Image
                src="/engtopb logo.png"
                alt="Garthapuri - The Spice Land of India"
                width={650}
                height={650}
                priority
                className="sm:w-[200px] sm:h-[200px] md:w-[280px] md:h-[280px] lg:w-[380px] lg:h-[380px] xl:w-[500px] xl:h-[500px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Right: Text + Buttons */}
            <div className="flex-1 flex flex-col items-end gap-2 md:gap-3 lg:gap-4 z-20 pt-0 pr-0">
              <div ref={heroTitleRef} data-hero-text>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-['Playfair_Display'] font-bold text-primary leading-[1.1] text-right">
                  Where Every<br />Element Has<br />A Story
                </h1>
              </div>
              <div className="w-16 md:w-20 h-[3px] bg-gradient-to-r from-[#D37B31] to-[#d4af37] rounded-full" />
              <p ref={heroSubtitleRef} data-hero-text className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md text-right">
                Experience authentic Indian cuisine rooted in ancient traditions, crafted with devotion and unhurried quality.
              </p>
              <div ref={heroButtonsRef} data-hero-text className="flex flex-row gap-3 sm:gap-4 mt-1">
                <Button onClick={scrollToMenu} size="lg" className="bg-gradient-to-r from-[#8d3c02] via-[#a84e10] to-[#D37B31] hover:from-[#7a3301] hover:to-[#c06a20] text-white font-bold shadow-lg hover:shadow-2xl transition-all px-6 sm:px-8 md:px-10 lg:px-12 text-sm sm:text-base lg:text-lg hover:scale-105 rounded-full font-['Playfair_Display']">
                  Order Now
                </Button>
                <Button onClick={scrollToMenu} size="lg" variant="outline" className="border-2 border-[#D37B31] text-[#8d3c02] hover:bg-gradient-to-r hover:from-[#8d3c02] hover:to-[#D37B31] hover:text-white hover:border-transparent font-bold transition-all px-6 sm:px-8 md:px-10 lg:px-12 text-sm sm:text-base lg:text-lg hover:scale-105 rounded-full font-['Playfair_Display']">
                  View Menu
                </Button>
              </div>
            </div>

            {/* Threshold Image - Left Bottom */}
            <div className="absolute z-5 -bottom-3 -left-28 md:-left-20 lg:-left-28 pointer-events-none hidden md:block">
              <Image
                src="/threshold image6.png"
                alt="Threshold decoration"
                width={380}
                height={380}
                priority
                className="w-48 md:w-56 lg:w-72 xl:w-96 h-auto object-contain"
              />
            </div>

          </div>

          {/* Desktop SVG wave divider at bottom */}
          <div className="hidden sm:block absolute bottom-0 left-0 w-full pointer-events-none" style={{ zIndex: 3 }}>
            <svg
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              className="block w-full h-[200px] md:h-[280px] lg:h-[360px] xl:h-[440px]"
            >
              <path
                d="M0,40 C360,40 540,240 900,230 S1320,120 1440,140 L1440,320 L0,320 Z"
                fill="#D4882E"
              />
            </svg>
          </div>
          {/* Border design pattern at very bottom of hero */}
          <div className="hidden sm:block absolute -bottom-2 left-0 w-full" style={{ zIndex: 4 }}>
            <Image
              src="/border design.png"
              alt="Decorative border"
              width={1920}
              height={60}
              priority
              className="block w-full h-auto object-cover"
            />
          </div>
        </section>

      {/* Menu Highlights Section */}
      <section id="menu-highlights" ref={menuSectionRef}>

        {/* ── MOBILE: Split-screen layout ── */}
        <div className="sm:hidden relative">
          {/* Top cream section — no z-index, just stacks naturally */}
          <div
            className="bg-[#f5ede0] px-6 text-center"
            style={{ paddingTop: '40px', paddingBottom: '180px', borderRadius: '0 0 50% 50% / 0 0 80px 80px', position: 'relative', zIndex: 2 }}
          >
            <Image src="/shefimage.png" alt="" width={64} height={64} priority className="w-14 h-14 object-contain mx-auto mb-3" />
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-primary leading-tight uppercase tracking-wide">
              Menu<br />Highlights
            </h2>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-xs mx-auto">
              Authentic flavors of Guntur, curated for those who recognize true culinary art.
            </p>
          </div>

          {/* Food color section — slides up behind curve */}
          <div
            ref={mobileBgRef}
            className="px-6 pb-10 text-center"
            style={{ marginTop: '-80px', paddingTop: '180px', backgroundColor: `rgba(${foodItems[0].color}, 0.85)` }}
          >
            <div ref={mobileFoodNameRef} className="opacity-0 flex flex-col items-center gap-1 mb-6">
              <p ref={mobileNameRef} className="text-3xl font-['Playfair_Display'] font-bold text-white leading-tight drop-shadow-md">
                {foodItems[0].name}
              </p>
              <p ref={mobileCaptionRef} className="text-base font-['Playfair_Display'] italic text-white/90">
                {foodItems[0].caption}
              </p>
              <p ref={mobileDialogueRef} className="text-sm text-white/80">
                &ldquo;{foodItems[0].dialogue}&rdquo;
              </p>
            </div>
            <Link href="/menu" prefetch={true}>
              <Button className="px-8 py-3 text-sm bg-white text-primary font-['Playfair_Display'] font-bold rounded-full shadow-lg hover:scale-105 transition-all">
                View More
              </Button>
            </Link>
          </div>

          {/* Plate — absolute sibling at wrapper level, above BOTH sections */}
          <div
            className="absolute left-0 right-0 flex justify-center pointer-events-none"
            style={{ top: 'calc(100% - 148px - 288px)', zIndex: 50 }}
          >
            {foodItems.map((item, index) => (
              <div
                key={item.name}
                ref={(el) => { mobileFoodItemRefs.current[index] = el }}
                className="absolute w-52 h-52 pointer-events-auto"
                style={{ filter: 'drop-shadow(0 16px 32px rgba(30,20,8,0.45))' }}
              >
                <Image src={item.src} alt={item.name} fill priority className="object-contain rounded-full" />
              </div>
            ))}
            <div className="w-52 h-52 opacity-0" />
          </div>
        </div>

        {/* ── DESKTOP: Arc carousel layout ── */}
        <div className="hidden sm:block bg-[#1a1008] py-12 md:py-16 lg:py-20 overflow-hidden relative">
          {/* Dynamic color wash */}
          <div
            ref={desktopBgRef}
            className="absolute inset-0 pointer-events-none"
            style={{ background: `rgba(${foodItems[0].color}, 0.55)` }}
          />
          <div className="relative z-10 w-full px-6 md:px-8 lg:px-12 xl:px-16">
            {/* Header */}
            <div className="text-center space-y-2 mb-10 md:mb-14">
              <div className="flex justify-center mb-2">
                <Image src="/shefimage.png" alt="" width={100} height={100} priority className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-['Playfair_Display'] font-bold text-white drop-shadow">
                — <span className="mx-3">Menu Highlights</span> —
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-2">
                A curated selection of delicious meals made fresh in our cloud kitchen – for every mood and moment.
              </p>
            </div>

            {/* Arc Carousel — text left, plate right */}
            <div className="flex flex-row items-center gap-8 lg:gap-12 min-h-[320px] md:min-h-[380px] lg:min-h-[420px]">
              {/* Left: text + button */}
              <div className="flex flex-col items-start gap-4 lg:gap-5 flex-1 text-left z-10">
                <div ref={foodNameLabelRef} className="opacity-0 flex flex-col gap-1 lg:gap-1.5">
                  <p ref={desktopNameRef} className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-['Playfair_Display'] font-bold text-white leading-tight drop-shadow-md">
                    {foodItems[0].name}
                  </p>
                  <p ref={desktopCaptionRef} className="text-lg md:text-xl lg:text-2xl font-['Playfair_Display'] italic text-[#ffd580]">
                    {foodItems[0].caption}
                  </p>
                  <p ref={desktopDialogueRef} className="text-base md:text-lg lg:text-xl text-white/80">
                    &ldquo;{foodItems[0].dialogue}&rdquo;
                  </p>
                </div>
                <Link href="/menu" prefetch={true}>
                  <Button className="px-8 lg:px-10 py-3 lg:py-4 text-base lg:text-xl bg-white text-primary font-['Playfair_Display'] font-bold rounded-full shadow-lg hover:scale-105 transition-all">
                    View More
                  </Button>
                </Link>
              </div>

              {/* Right: plate arc area */}
              <div className="relative flex-1 flex items-center justify-center min-h-[280px] md:min-h-[320px] lg:min-h-[380px]">
                <div
                  className="absolute w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full pointer-events-none transition-all duration-1000"
                  style={{ background: `radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)` }}
                />
                {foodItems.map((item, index) => (
                  <div
                    key={item.name}
                    ref={(el) => { foodItemRefs.current[index] = el }}
                    className="absolute w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80"
                    style={{ filter: 'drop-shadow(0 16px 36px rgba(0,0,0,0.5)) drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }}
                  >
                    <Image src={item.src} alt={item.name} fill priority className="object-contain rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
  )
}
