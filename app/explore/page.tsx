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
  }
]

export default function ExplorePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

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
    // GSAP animations for scroll - cards visible immediately
    itemRefs.current.forEach((item, index) => {
      if (item) {
        // Animate in on initial load
        gsap.from(item, {
          opacity: 0,
          y: 30,
          scale: 0.98,
          duration: 0.6,
          delay: index * 0.05,
          ease: 'power2.out',
        })

        // Hover animation
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.05,
            boxShadow: '0 20px 60px rgba(141, 60, 2, 0.4)',
            duration: 0.3,
          })
        })

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
          })
        })
      }
    })

    return () => {
      // Cleanup animations
      itemRefs.current.forEach(item => {
        if (item) gsap.killTweensOf(item)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf8f5] via-[#fefdfb] to-[#faf8f5]">
      {/* Three.js Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
      />

      {/* Header with Logo - Scrolls with page */}
      <div className="py-6 sm:py-8 md:py-10 bg-gradient-to-b from-[#faf8f5] via-[#fefdfb] to-transparent">
        <div className="flex justify-center">
          <Image
            src="/endsides logo.png"
            alt="Garthapuri - Explore"
            width={200}
            height={80}
            className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-lg"
            priority
          />
        </div>
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#8d3c02] mt-3 sm:mt-4 tracking-wider">
          THE SOUL OF GARTHAPURI
        </h1>
        <p className="text-center text-[#8d3c02]/70 text-sm sm:text-base mt-2">
          Where every element has a story
        </p>
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="relative z-10 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Raw Display */}
          {exploreItems.map((item) => (
            <div 
              key={item.id}
              style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}
            >
              {/* Image - Raw */}
              <div style={{ flex: '0 1 35%', minWidth: '200px' }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={400}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              {/* Content - Raw */}
              <div style={{ flex: '1 1 55%', minWidth: '250px' }}>
                <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontFamily: 'Playfair Display, serif', fontWeight: 'bold', color: '#8d3c02', marginBottom: '1rem' }}>
                  {item.title}
                </h2>
                <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: '#6b5d4f', lineHeight: '1.6' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {/* Bottom Text */}
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontFamily: 'Playfair Display, serif', fontWeight: '600', color: '#8d3c02', letterSpacing: '0.05em' }}>
              Each element tells a story of heritage and tradition
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
