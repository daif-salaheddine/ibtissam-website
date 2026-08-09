'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLenis } from '@/hooks/useLenis'
import Loader from '@/components/Loader'
import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Expertise from '@/components/Expertise'
import Masterclasses from '@/components/Masterclasses'
import Testimonials from '@/components/Testimonials'
import Timeline from '@/components/Timeline'
import Philosophy from '@/components/Philosophy'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

const cardStyle = {
  background: '#FFFFFF',
  borderRadius: 28,
  boxShadow: '0 1px 3px rgba(34,31,28,0.04), 0 8px 32px rgba(34,31,28,0.07)',
  overflow: 'hidden',
}

// Expertise is scroll-pinned via GSAP — no overflow:hidden so pin doesn't clip
const expertiseCardStyle = {
  background: '#FFFFFF',
  borderRadius: 28,
  boxShadow: '0 1px 3px rgba(34,31,28,0.04), 0 8px 32px rgba(34,31,28,0.07)',
}

export default function Page() {
  const [loading, setLoading] = useState(true)

  useLenis()

  return (
    <>
      <div id="scroll-progress" />

      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Cursor />

      {!loading && (
        <>
          <Navbar />
          <main style={{ background: '#F3F1EC', padding: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={cardStyle}><Hero /></div>
              <div style={cardStyle}><About /></div>
              <div style={expertiseCardStyle}><Expertise /></div>
              <div style={cardStyle}><Masterclasses /></div>
              <div style={cardStyle}><Testimonials /></div>
              <div style={cardStyle}><Timeline /></div>
              <div style={cardStyle}><Philosophy /></div>
              <div style={cardStyle}><Projects /></div>
              <div style={cardStyle}><Contact /></div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
