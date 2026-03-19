'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const exploreItems = [
  {
    id: 1,
    title: 'COSMOS',
    image: '/cosmos wheel image2.png',
    description: 'This emblem is an homage to the ancient Mandala, a geometric blueprint used for spiritual and architectural alignment, representing the cosmos and the principle of perpetual harmony. Its concentric rings and radial sunburst evoke seals from the lost empires of the subcontinent, speaking to a history that stretches beyond memory. It signifies that Garthapuri is not fleeting; it is anchored in the eternal rhythms of excellence. This circular covenant assures that the profound standard of quality and the auspicious return to tradition will never cease.'
  },
  {
    id: 2,
    title: 'VIBRANCY',
    image: '/vibrancy image 3.png',
    description: 'This Verdant Companion visual element connects us to the artistic and courtly traditions of historical painting, where elements of flora and charming wildlife often symbolized the sweetness of life, eloquence, and the richness of storytelling. This image represents the vibrancy, life, and exotic charm that characterized the courts and cultural centers of ancient India. It serves as a touch of lively detail, promising that the sensory experiences and moments shared at Garthapuri will be colorful, engaging, and worthy of retelling, a bright, vital thread woven into the tapestry of our history.'
  },
  {
    id: 3,
    title: 'ESSENCE',
    image: '/essence image5.png',
    description: 'The depiction of Nandi draws on the historical understanding of the bull as a prime symbol of fertility, agrarian wealth, and quiet, immense power. Reclining, the bull is in a state of meditative repose, a posture that signifies readiness without restlessness. It evokes the profound sense of calm and focused dedication found within ancient sacred spaces. For Garthapuri, Nandi is the Silent Witness to our authenticity, guaranteeing that every ingredient and every service act is delivered with the devotion and unhurried quality of a time long past.'
  },
  {
    id: 4,
    title: 'PERMANENCE',
    image: '/permanence image4.png',
    description: 'Our pillar is a tribute to the monumental structures erected by ancient royalty specifically drawing inspiration from the pillars of Ashoka, which were inscribed with decrees of virtue and justice. The heavily detailed carvings are reminiscent of the Dravidian stone artistry found in temples that have withstood millennia. This element signifies that the brand is built not on trend, but on unshakeable moral and aesthetic solidity. It imbues Garthapuri with a sense of monumental heritage, promising a dining experience as reliable and enduring as the history etched in its stone.'
  },
  {
    id: 5,
    title: 'THRESHOLD',
    image: '/threshold image6.png',
    description: 'The elephant, set beneath a highly ornamented arch, connects directly to the ancient Gajalakshmi tradition, where elephants symbolize the rain, clouds, and power that bring wealth to the Goddess of Fortune. The arch is a definitive Torana, marking the transition from the mundane street to the auspicious interior. This visual acts as a historical demarcation, stating that when one steps into Garthapuri, they are entering a space where blessings are conferred and abundance is served. The Graced Sentinel is your vintage assurance of majesty, prosperity, and an unparalleled traditional welcome.'
  }
]

export default function ExplorePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const headerLogoRef = useRef<HTMLDivElement>(null)
  const headerTitleRef = useRef<HTMLHeadingElement>(null)
  const headerSubtitleRef = useRef<HTMLParagraphElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Initialize Three.js background
    if (canvasRef.current) {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      })

      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0xfaf8f5, 0.1)

      // Create particles
      const particlesGeometry = new THREE.BufferGeometry()
      const particlesCount = 100
      const posArray = new Float32Array(particlesCount * 3)

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = Math.random() * 2000 - 1000
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

      const particlesMaterial = new THREE.PointsMaterial({
        size: 7,
        color: '#8d3c02',
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.3,
      })

      const particles = new THREE.Points(particlesGeometry, particlesMaterial)
      scene.add(particles)

      camera.position.z = 100

      const animate = () => {
        requestAnimationFrame(animate)
        particles.rotation.x += 0.0001
        particles.rotation.y += 0.0002
        renderer.render(scene, camera)
      }

      animate()

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    // Header entrance animations - slower and immediate
    if (headerLogoRef.current) {
      gsap.to(headerLogoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    if (headerTitleRef.current) {
      gsap.to(headerTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.04,
        ease: 'power2.out',
      })
    }

    if (headerSubtitleRef.current) {
      gsap.to(headerSubtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.06,
        ease: 'power2.out',
      })
    }

    // Explore items animations - fade in with slow lateral movement
    const isMobile = window.innerWidth < 640
    itemRefs.current.forEach((item, index) => {
      if (item) {
        const imageDiv = imageRefs.current[index]
        const contentDiv = contentRefs.current[index]

        // Image animation - vertical fade on mobile, lateral slide on desktop
        if (imageDiv) {
          gsap.to(imageDiv,
            {
              opacity: 1,
              x: isMobile ? 0 : (index % 2 === 0 ? -40 : 40),
              y: isMobile ? 0 : undefined,
              duration: 1.2,
              delay: 0.1 + index * 0.05,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 60%',
                scrub: false,
                once: true,
              },
            }
          )
        }

        // Content animation - vertical fade on mobile, lateral slide on desktop
        if (contentDiv) {
          gsap.to(contentDiv,
            {
              opacity: 1,
              x: isMobile ? 0 : (index % 2 === 0 ? 40 : -40),
              y: isMobile ? 0 : undefined,
              duration: 1.2,
              delay: 0.1 + index * 0.05,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 60%',
                scrub: false,
                once: true,
              },
            }
          )
        }
      }
    })

    return () => {
      // Cleanup animations
      itemRefs.current.forEach((item, index) => {
        if (item) {
          gsap.killTweensOf(imageRefs.current[index])
          gsap.killTweensOf(contentRefs.current[index])
        }
      })
    }
  }, [])

  return (
    <div className="bg-gradient-to-b from-[#faf8f5] via-[#fefdfb] to-[#faf8f5]">
      {/* Three.js Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
      />

      {/* Header with Logo - Scrolls with page */}
      <div className="py-2 sm:py-3 md:py-4 bg-gradient-to-b from-[#faf8f5] via-[#fefdfb] to-transparent">
        <div className="flex justify-center" ref={headerLogoRef} style={{ opacity: 0 }}>
          <Image
            src="/endsides logo.png"
            alt="Garthapuri - Explore"
            width={200}
            height={80}
            className="h-12 sm:h-20 md:h-24 w-auto object-contain drop-shadow-lg"
            priority
          />
        </div>
        <h1 ref={headerTitleRef} className="text-center text-lg sm:text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#8d3c02] mt-2 sm:mt-3 tracking-wider" style={{ opacity: 0 }}>
          THE SOUL OF GARTHAPURI
        </h1>
        <p ref={headerSubtitleRef} className="text-center text-[#8d3c02]/70 text-xs sm:text-base mt-1 px-4 sm:px-6 lg:px-20 xl:px-32 2xl:px-48" style={{ opacity: 0 }}>
          Where every element has a story
        </p>
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="relative z-10 w-full -mt-2">
        <div className="w-full px-4 sm:px-10 lg:px-28 xl:px-44 2xl:px-60 py-1">
          {/* Raw Display */}
          {exploreItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => { itemRefs.current[index] = el }}
              className={`flex flex-col sm:flex-row ${index % 2 !== 0 ? 'sm:flex-row-reverse' : ''} gap-4 sm:gap-6 items-center mb-10 sm:mb-12`}
            >
              {/* Image */}
              <div
                ref={(el) => { imageRefs.current[index] = el }}
                className="w-48 sm:w-auto sm:flex-shrink-0 sm:basis-[35%] sm:max-w-[400px] opacity-0"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={400}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="w-full h-auto max-h-[250px] sm:max-h-[350px] object-contain block"
                />
              </div>

              {/* Content */}
              <div
                ref={(el) => { contentRefs.current[index] = el }}
                className="flex-1 min-w-0 text-center sm:text-left opacity-0"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#8d3c02] mb-2 sm:mb-3">
                  {item.title}
                </h2>
                <p className="text-sm sm:text-base text-[#6b5d4f] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {/* Bottom Text */}
          <div className="mt-12 sm:mt-20 mb-10 sm:mb-16 text-center px-4">
            <p className="text-base sm:text-lg md:text-xl font-['Playfair_Display'] font-semibold text-[#8d3c02] tracking-wide">
              Each element tells a story of heritage and tradition
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
