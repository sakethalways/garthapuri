'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const products = [
  {
    name: 'Natukodi',
    subtitle: 'Naatu Kodi wasn\'t just a dish, it was a ritual',
    images: [
      '/Natukodi telugu.jpg.jpeg',
      '/Natukodi 1 telugu.jpg.jpeg',
    ],
  },
  {
    name: 'Sunnundalu',
    subtitle: 'From festive kitchens to family gatherings',
    images: [
      '/Sunnundalu telugu.jpg.jpeg',
      '/Sunnundalu 1 telugu.jpg.jpeg',
    ],
  },
]

function ProductCard({ product }: { product: typeof products[0] }) {
  const [currentImage, setCurrentImage] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleWhatsAppRedirect = () => {
    const phoneNumber = '919676136222'
    const message = `Hello Garthapuri! 🍽️ I'd like to order ${product.name}. Please share the details!`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
  }

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % product.images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX }
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) { diff > 0 ? nextImage() : prevImage() }
  }

  return (
    <div className="bg-gradient-to-b from-[#faf4eb] to-[#f5e9d9] rounded-2xl overflow-hidden shadow-md hover:shadow-[0_8px_24px_rgba(141,60,2,0.12)] transition-all duration-300 animate-[fadeSlideUp_0.5s_ease-out_both] border border-[#d4af37]/10">
      {/* Image carousel */}
      <div
        className="relative w-full aspect-[3/4] overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {product.images.map((src, imgIndex) => (
          <div
            key={src}
            className="absolute inset-0 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${(imgIndex - currentImage) * 100}%)` }}
          >
            <Image
              src={src}
              alt={`${product.name} ${imgIndex + 1}`}
              fill
              priority={imgIndex === 0}
              loading={imgIndex === 0 ? 'eager' : 'lazy'}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {product.images.map((_, imgIndex) => (
            <button
              key={imgIndex}
              onClick={() => setCurrentImage(imgIndex)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                imgIndex === currentImage
                  ? 'bg-white scale-125 shadow-md'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`View image ${imgIndex + 1}`}
            />
          ))}
        </div>

        {/* Arrow buttons (desktop) */}
        <button
          onClick={prevImage}
          className="hidden sm:flex absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white text-sm md:text-base transition-colors z-10"
          aria-label="Previous image"
        >
          &#8249;
        </button>
        <button
          onClick={nextImage}
          className="hidden sm:flex absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white text-sm md:text-base transition-colors z-10"
          aria-label="Next image"
        >
          &#8250;
        </button>
      </div>

      {/* Product info */}
      <div className="p-3 sm:p-4 md:p-5 text-center space-y-1.5 sm:space-y-2">
        <h3 className="text-base sm:text-lg md:text-xl font-['Playfair_Display'] font-bold text-primary">
          {product.name}
        </h3>
        <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed">
          {product.subtitle}
        </p>
        <Button
          onClick={handleWhatsAppRedirect}
          className="mt-1 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm bg-gradient-to-r from-[#8d3c02] to-[#D37B31] hover:from-[#7a3301] hover:to-[#c06a20] text-white rounded-full transition-all duration-300 font-['Playfair_Display'] hover:scale-105 shadow-sm hover:shadow-md"
        >
          Order Now
        </Button>
      </div>
    </div>
  )
}

export default function MenuPage() {
  return (
    <section className="min-h-screen bg-background pt-4 sm:pt-6 md:pt-8 pb-10 sm:pb-14 md:pb-16">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Page Header */}
        <div className="text-center space-y-1 sm:space-y-2 mb-6 sm:mb-8 md:mb-10 animate-[fadeSlideUp_0.5s_ease-out_both]">
          <div className="flex justify-center mb-1">
            <Image
              src="/shefimage.png"
              alt="Menu"
              width={80}
              height={80}
              priority
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-primary">
            Our Menu
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
            Handcrafted with tradition, served with love
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
