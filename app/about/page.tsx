'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header elements — animate from CSS-hidden state to visible
      gsap.to('[data-about-header]', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      })

      // History sections — fade up on scroll
      gsap.utils.toArray<HTMLElement>('[data-about-section]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Heritage cards — staggered fade up
      gsap.from('[data-about-card]', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '[data-about-cards]',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Closing section
      gsap.from('[data-about-closing]', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-about-closing]',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#faf8f5] via-[#fefdfb] to-[#faf8f5]">
      {/* Header & History Section - Combined */}
      <section className="bg-gradient-to-b from-[#d4af37]/20 via-[#d4af37]/10 to-white/40 py-2 sm:py-3 md:py-4 lg:py-6">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-48">
          <div className="text-center space-y-1">
            <div data-about-header className="flex justify-center">
              <Image
                src="/endsides logo.png"
                alt="Garthapuri"
                width={200}
                height={80}
                className="h-14 sm:h-18 md:h-24 lg:h-28 w-auto object-contain drop-shadow-lg"
                priority
              />
            </div>
            <h1 data-about-header className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-['Playfair_Display'] font-bold text-[#8d3c02] mt-2 sm:mt-3">
              About Garthapuri
            </h1>
            <p data-about-header className="text-sm sm:text-base md:text-lg lg:text-xl text-[#8d3c02]/70 max-w-3xl mx-auto mt-1">
              THE SPICE LAND OF INDIA
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 mt-6 sm:mt-12 md:mt-16">

            {/* Ancient History */}
            <div data-about-section className="space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#8d3c02]" style={{ fontFamily: 'var(--font-mandali), sans-serif' }}>
                గుంటూరు చరిత్ర (Guntur History)
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#6b5d4f] leading-relaxed" style={{ fontFamily: 'var(--font-noto-telugu), sans-serif' }}>
                గుంటూరు యొక్క సంస్కృతి, చరిత్ర చాలా గొప్పది. ఈ ప్రాంతం ప్రాచీన కాలంలోనే ప్రముఖ కేంద్రంగా ఉండేది. గుంటూరు పట్టణం స్థాపనకు సుమారు 50 సంవత్సరాల కంటే ఎక్కువ చరిత్ర ఉంది. గుంటూరు ప్రాంతం సాతవాహనుల పాలనలో ముఖ్యమైన వాణిజ్య కేంద్రంగా అభివృద్ధి చెందింది (1922–299 CE కాలంలో). తరువాతి శతాబ్దాలలో 1147 AD నుండి 1158 AD మధ్యకాలంలో గుంటూరు ప్రాముఖ్యత పెరిగింది.
              </p>
            </div>

            {/* Buddhist Influence */}
            <div data-about-section className="space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#8d3c02]" style={{ fontFamily: 'var(--font-mandali), sans-serif' }}>
                బౌద్ధ ప్రభావం (Buddhist Influence)
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#6b5d4f] leading-relaxed" style={{ fontFamily: 'var(--font-noto-telugu), sans-serif' }}>
                భారత దేశంలో బౌద్ధమతం విస్తరించినప్పుడు గుంటూరు ప్రాంతం కూడా ప్రభావితమైంది. అమరావతి ప్రాంతం ముఖ్యమైన బౌద్ధ కేంద్రంగా నిలిచింది.
              </p>
            </div>

            {/* Satavahanas */}
            <div data-about-section className="space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#8d3c02]" style={{ fontFamily: 'var(--font-mandali), sans-serif' }}>
                సాతవాహనులు (Satavahanas)
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#6b5d4f] leading-relaxed" style={{ fontFamily: 'var(--font-noto-telugu), sans-serif' }}>
                క్రీ.పూ. 2వ శతాబ్దం నుండి క్రీ.శ. 3వ శతాబ్దం వరకు సాతవాహనులు ఈ ప్రాంతాన్ని పాలించారు. వారి కాలంలో అమరావతి ప్రధాన కేంద్రంగా అభివృద్ధి చెందింది.
              </p>
            </div>

            {/* Other Dynasties */}
            <div data-about-section className="space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#8d3c02]" style={{ fontFamily: 'var(--font-mandali), sans-serif' }}>
                ఇతరు రాజవంశాలు (Other Dynasties)
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#6b5d4f] leading-relaxed" style={{ fontFamily: 'var(--font-noto-telugu), sans-serif' }}>
                గుంటూరు ప్రాంతాన్ని ఇక్ష్వాకులు, విష్ణుకుండినులు, ఆంధ్ర చాళుక్యులు, కోలాలు, చాళుక్యులు, కకతీయులు తదితర రాజవంశాలు పాలించాయి. 12వ శతాబ్దంలో పాళ్నాడు యుద్ధం గుంటూరు ప్రాంతంలో జరిగింది. 1180లో గుంటూరు ప్రాంతం పలు రాజకీయ సంఘటనలకు కేంద్రంగా మారింది.
              </p>
            </div>

            {/* Muslim and British Rule */}
            <div data-about-section className="space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#8d3c02]" style={{ fontFamily: 'var(--font-mandali), sans-serif' }}>
                ముస్లింలు మరియు బ్రిటిష్ పాలన (Muslim and British Rule)
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#6b5d4f] leading-relaxed" style={{ fontFamily: 'var(--font-noto-telugu), sans-serif' }}>
                1687లో ఔరంగజేబు ఆక్రమించినప్పుడు గుంటూరు ముఘల్ సామ్రాజ్యంలో భాగమైంది. తరువాత గుంటూరు ఈస్ట్ ఇండియా కంపెనీ ఆధీనంలోకి వెళ్లి, 1788లో మద్రాస్ ప్రెసిడెన్సీలో చేర్చబడింది.
              </p>
            </div>

            {/* Independence Movement */}
            <div data-about-section className="space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#8d3c02]" style={{ fontFamily: 'var(--font-mandali), sans-serif' }}>
                స్వాతంత్ర్య ఉద్యమం (Independence Movement)
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#6b5d4f] leading-relaxed" style={{ fontFamily: 'var(--font-noto-telugu), sans-serif' }}>
                గుంటూరు స్వాతంత్ర్య ఉద్యమంలో ముఖ్యపాత్ర పోషించింది. 1953లో గుంటూరు ఆంధ్ర రాష్ట్రంలో భాగమై, తరువాత ఏకీకృత ఆంధ్రప్రదేశ్‌లో చేరింది.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Title Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white/40 to-[#d4af37]/10">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-48">
          <div data-about-section className="max-w-4xl mx-auto text-center space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-[#8d3c02]">
              HISTORY OF
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] font-bold text-[#8d3c02]">
              GARTHAPURI
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#8d3c02]/70 tracking-wider">
              ANCIENT NAME OF GUNTUR
            </p>
          </div>
        </div>
      </section>

      {/* Heritage Elements Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-48">
          <h2 data-about-section className="text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#8d3c02] text-center mb-6 sm:mb-8 md:mb-12">
            Our Heritage Elements
          </h2>
          <div data-about-cards className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {[
              { title: 'COSMOS', desc: 'Ancient Mandala representing eternal harmony and excellence' },
              { title: 'VIBRANCY', desc: 'Flora and wildlife symbolizing life and storytelling' },
              { title: 'ESSENCE', desc: 'Nandi - the silent witness to our authenticity' },
              { title: 'PERMANENCE', desc: 'Pillars of Ashoka representing moral solidity' },
              { title: 'THRESHOLD', desc: 'Elephant and arch marking transition to abundance' }
            ].map((element, index) => (
              <div key={index} data-about-card className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-md border border-[#d4af37]/20 hover:shadow-lg transition-shadow">
                <h3 className="text-lg sm:text-xl font-['Playfair_Display'] font-bold text-[#8d3c02] mb-1.5 sm:mb-2">
                  {element.title}
                </h3>
                <p className="text-sm sm:text-base text-[#6b5d4f] leading-relaxed">
                  {element.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#d4af37]/10 to-[#d4af37]/20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-48">
          <div data-about-closing className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-['Playfair_Display'] font-bold text-[#8d3c02]">
              Garthapuri - The Spice Land of India
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#6b5d4f] leading-relaxed">
              Where ancient traditions meet modern culinary excellence. Every element tells a story of heritage and tradition,
              creating an unforgettable dining experience rooted in authentic Indian cuisine.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
