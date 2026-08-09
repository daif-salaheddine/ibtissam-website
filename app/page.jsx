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
          <main>
            <Hero />
            <About />
            <Expertise />
            <Masterclasses />
            <Testimonials />
            <Timeline />
            <Philosophy />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
