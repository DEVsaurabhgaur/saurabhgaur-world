import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/context/CartContext'
import CyberCursor from '@/components/portfolio/CyberCursor'
import CyberHUDController from '@/components/portfolio/CyberHUDController'

export const metadata: Metadata = {
  title: {
    default: 'Saurabh Kumar Gaur — AI/ML Engineer',
    template: '%s | Saurabh Kumar Gaur',
  },
  description:
    'AI/ML Engineer specialising in LLM systems, agentic RAG pipelines, and frontier model evaluation. Also an AI artist selling digital art.',
  openGraph: {
    type: 'website',
    url: 'https://saurabhgaur.world',
    title: 'Saurabh Kumar Gaur — AI/ML Engineer',
    description: 'AI/ML Engineer · LLM Systems · Agentic AI · AI Art Storefront',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://saurabhgaur.world'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0A] text-[#F0F0F0] antialiased">
        <CartProvider>
          <CyberCursor />
          <CyberHUDController />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
