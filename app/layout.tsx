import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LayoutClient } from './layout-client'
import { FooterClient } from './footer-client'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Garthapuri - The Spice Land of India',
  description: 'Experience authentic Indian cuisine at Garthapuri. Discover the essence of traditional flavors in every dish.',
  generator: 'Garthapuri',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={_playfairDisplay.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(!sessionStorage.getItem('hero-anim-played')){document.documentElement.classList.add('hero-needs-anim')}}catch(e){}` }} />
      </head>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <LayoutClient />
          
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
          
          <FooterClient />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
