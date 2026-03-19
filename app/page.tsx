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

  useEffect(() => {
    // Animate menu cards one by one when section comes into view
    if (menuCardsRef.current.length > 0) {
      menuCardsRef.current.forEach((card, index) => {
        if (card) {
          // Initial state
          gsap.set(card, {
            opacity: 0,
            y: 60,
            scale: 0.85,
            rotationZ: -3
          })

          // Animate on scroll
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

          // Hover animation
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
      // Cleanup
      menuCardsRef.current.forEach(card => {
        if (card) gsap.killTweensOf(card)
      })
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-card/20 -mt-20 sm:-mt-24 pb-16 sm:pb-20 md:pb-24">
          <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-0 relative h-screen flex items-center pt-20 sm:pt-24">
            
            {/* Chakra Background with Rotation - Behind everything */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="animate-rotate-slow opacity-60">
                <Image
                  src="/chakra3.png"
                  alt="Decorative chakra"
                  width={1000}
                  height={1000}
                  priority
                  className="w-96 h-96 sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] object-contain"
                />
              </div>
            </div>

            {/* Centered Hero Logo - Absolutely positioned on chakra */}
            <div className="absolute z-10 flex items-center justify-center animate-fade-in-up top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg">
              <Image
                src="/engtopb logo.png"
                alt="Garthapuri - The Spice Land of India"
                width={650}
                height={650}
                priority
                className="w-72 h-72 sm:w-[430px] sm:h-[430px] md:w-[500px] md:h-[500px] lg:w-[750px] lg:h-[750px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Threshold Image - Left Bottom (Half Elephant) */}
            <div className="absolute z-5 -bottom-24 -left-28 pointer-events-none">
              <Image
                src="/threshold image6.png"
                alt="Threshold decoration"
                width={380}
                height={380}
                priority
                className="w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 object-contain"
              />
            </div>

            {/* Thali Image - Top Right */}
            <div className="absolute z-5 top-7/12 -right-72 pointer-events-none opacity-50 transform -translate-y-1/2">
              <Image
                src="/thali.png"
                alt="Thali decoration"
                width={600}
                height={600}
                priority
                className="w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px] object-contain"
              />
            </div>


            {/* Hero Content - Below chakra and logo */}
            <div className="relative z-10 w-full flex flex-col items-center gap-3 sm:gap-4 md:gap-5 mt-[272px] sm:mt-[304px] md:mt-[368px]">
              {/* Description */}
              <div className="text-center space-y-2 max-w-4xl mx-auto animate-fade-in-up px-4" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-primary leading-tight">
                  Where Every Element Has A Story
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  Experience authentic Indian cuisine rooted in ancient traditions, crafted with devotion and unhurried quality.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2 animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <Button onClick={scrollToMenu} size="lg" className="bg-primary hover:bg-primary/90 text-background font-bold shadow-lg hover:shadow-2xl transition-all px-8 sm:px-12 text-base hover:scale-105 rounded-full text-lg font-['Playfair_Display']">
                  Order Now
                </Button>
                <Button onClick={scrollToMenu} size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-background font-bold transition-all px-8 sm:px-12 text-base hover:scale-105 rounded-full text-lg font-['Playfair_Display']">
                  View Menu
                </Button>
              </div>


            </div>
          </div>
        </section>

      {/* Menu Highlights Section */}
      <section id="menu-highlights" ref={menuSectionRef} className="bg-gradient-to-b from-[#d4af37]/20 to-[#d4af37]/10 py-4 sm:py-6 md:py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <div className="flex justify-center mb-2">
              <Image
                src="/shefimage.png"
                alt="Menu Highlights"
                width={100}
                height={100}
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
              />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-['Playfair_Display'] font-bold text-primary">
              <span className="inline-block">—</span>
              <span className="mx-4">Menu Highlights</span>
              <span className="inline-block">—</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A curated selection of delicious meals made fresh in our cloud kitchen – for every mood and moment.
            </p>
          </div>

          {/* Menu Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Morning */}
            <div
              ref={(el) => { menuCardsRef.current[0] = el }}
              onClick={handleWhatsAppRedirect}
              className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src="/thali.png"
                  alt="Morning meals"
                  width={100}
                  height={100}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-['Playfair_Display'] font-bold text-primary mb-2">
                Morning
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Fresh starts &amp; energizing flavors
              </p>
            </div>

            {/* Afternoon */}
            <div
              ref={(el) => { menuCardsRef.current[1] = el }}
              onClick={handleWhatsAppRedirect}
              className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src="/thali.png"
                  alt="Afternoon meals"
                  width={100}
                  height={100}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-['Playfair_Display'] font-bold text-primary mb-2">
                Afternoon
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Refreshing meals &amp; light bites
              </p>
            </div>

            {/* Evening */}
            <div
              ref={(el) => { menuCardsRef.current[2] = el }}
              onClick={handleWhatsAppRedirect}
              className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src="/thali.png"
                  alt="Evening meals"
                  width={100}
                  height={100}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-['Playfair_Display'] font-bold text-primary mb-2">
                Evening
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Comfort food &amp; beverages
              </p>
            </div>

            {/* Dinner */}
            <div
              ref={(el) => { menuCardsRef.current[3] = el }}
              onClick={handleWhatsAppRedirect}
              className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src="/thali.png"
                  alt="Dinner meals"
                  width={100}
                  height={100}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-['Playfair_Display'] font-bold text-primary mb-2">
                Dinner
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Exquisite dining experiences
              </p>
            </div>
          </div>
        </div>
      </section>
      </>
  )
}
