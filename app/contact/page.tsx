'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const phoneNumber = '919676136222'
    const text = `Hello Garthapuri!\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#f5e9d9] via-[#ede0d0] to-[#e8d5c0] pt-0 sm:pt-2 md:pt-4 lg:pt-6 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header with chakra behind logo */}
        <div className="text-center mb-3 sm:mb-5">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto -mb-16 sm:-mb-20 md:-mb-24 lg:-mb-28">
            <Image src="/chakra1.png" alt="" width={500} height={500} loading="lazy" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto opacity-[0.08] animate-[rotate-slow_30s_linear_infinite]" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image src="/main image.png" alt="Garthapuri" width={56} height={56} loading="lazy" className="w-14 sm:w-18 md:w-20 lg:w-24 opacity-70" style={{ height: 'auto' }} />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-['Playfair_Display'] font-bold text-primary">
            Get In Touch
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1.5 sm:mt-2 max-w-md mx-auto">
            We&apos;d love to hear from you. Reach out and let&apos;s create something delicious together.
          </p>
        </div>

        <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto">
          {/* Contact Form */}
          <div className="bg-[#faf6f0]/80 backdrop-blur-sm rounded-xl p-3.5 sm:p-5 md:p-6 lg:p-8 shadow-[0_8px_32px_rgba(141,60,2,0.08)] border border-[#d4af37]/15">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-['Playfair_Display'] font-semibold text-foreground mb-4 sm:mb-5 md:mb-6">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5" suppressHydrationWarning>
              <div>
                <label htmlFor="name" className="block text-[11px] sm:text-xs md:text-sm font-medium text-foreground/70 mb-1 sm:mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 sm:px-3.5 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-[#f5ede2] border border-[#c9bfb0]/50 text-foreground text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37]/60 transition-all placeholder:text-foreground/30"
                  placeholder="Your name"
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[11px] sm:text-xs md:text-sm font-medium text-foreground/70 mb-1 sm:mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-3 sm:px-3.5 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-[#f5ede2] border border-[#c9bfb0]/50 text-foreground text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37]/60 transition-all placeholder:text-foreground/30"
                  placeholder="your@email.com"
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-[11px] sm:text-xs md:text-sm font-medium text-foreground/70 mb-1 sm:mb-1.5">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full px-3 sm:px-3.5 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-[#f5ede2] border border-[#c9bfb0]/50 text-foreground text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37]/60 transition-all placeholder:text-foreground/30"
                  placeholder="+91 98765 43210"
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[11px] sm:text-xs md:text-sm font-medium text-foreground/70 mb-1 sm:mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={3}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-3 sm:px-3.5 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-[#f5ede2] border border-[#c9bfb0]/50 text-foreground text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37]/60 transition-all resize-none placeholder:text-foreground/30"
                  placeholder="Tell us what you're looking for..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#8d3c02] via-[#a84e10] to-[#D37B31] hover:from-[#7a3301] hover:to-[#c06a20] text-white font-['Playfair_Display'] font-semibold text-xs sm:text-sm md:text-base py-2.5 sm:py-3 md:py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                suppressHydrationWarning
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                Send via WhatsApp
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
