'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { masterclasses } from '@/lib/data'

export default function Masterclasses() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)

  // Scroll-based active selection on desktop
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    let ctx
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${masterclasses.length * 100}%`,
          pin: true,
          onUpdate: self => {
            const idx = Math.min(
              Math.floor(self.progress * masterclasses.length),
              masterclasses.length - 1
            )
            setActive(idx)
          },
        })
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  const mc = masterclasses[active]

  return (
    <section
      id="masterclasses"
      ref={sectionRef}
      className="min-h-screen"
      style={{ background: '#080706', borderTop: '1px solid rgba(242,235,224,0.07)' }}
    >
      {/* Section header */}
      <div className="pt-24 pb-12 px-8 md:px-16 lg:px-24 xl:px-32 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="sec-num">03</span>
        </div>
        <h2
          className="font-cormorant font-light leading-tight"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: '#F2EBE0' }}
        >
          Signature <em>masterclasses</em>
        </h2>
        <p className="mt-4 font-dm text-sm md:text-base max-w-2xl leading-relaxed" style={{ color: '#6B6055' }}>
          Five ready-to-deploy programs blending all three pillars. Designed for CHROs, CEOs, university leadership, and international organization directors.
        </p>
      </div>

      {/* Desktop: two-panel layout */}
      <div className="hidden lg:grid lg:grid-cols-[35%_65%] h-[70vh] px-8 md:px-16 lg:px-24 xl:px-32 max-w-[1800px] mx-auto gap-16 pb-16">
        {/* Left rail */}
        <div className="flex flex-col justify-center space-y-2 border-r" style={{ borderColor: 'rgba(242,235,224,0.07)' }}>
          {masterclasses.map((mc, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="text-left px-6 py-5 border-l-2 transition-all duration-400 group"
              style={{
                borderColor: active === i ? '#E8A020' : 'transparent',
                background: active === i ? 'rgba(232,160,32,0.05)' : 'transparent',
              }}
            >
              <div
                className="font-mono text-[0.55rem] tracking-[0.2em] uppercase mb-1 transition-colors duration-300"
                style={{ color: active === i ? '#E8A020' : '#6B6055' }}
              >
                {mc.num} — {mc.tag}
              </div>
              <h3
                className="font-cormorant font-semibold text-lg md:text-xl leading-tight transition-colors duration-300"
                style={{ color: active === i ? '#F2EBE0' : '#6B6055' }}
              >
                {mc.title}
              </h3>
            </button>
          ))}
        </div>

        {/* Right: detail */}
        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pr-8"
            >
              <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-4" style={{ color: '#E8A020' }}>
                Program {mc.num}
              </div>
              <h3
                className="font-cormorant font-semibold mb-6 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)', color: '#F2EBE0' }}
              >
                {mc.title}
              </h3>
              <p className="font-dm text-base leading-relaxed mb-4" style={{ color: '#A89B88' }}>
                {mc.preview}
              </p>
              <p className="font-dm text-sm leading-relaxed mb-8" style={{ color: '#6B6055' }}>
                {mc.body}
              </p>

              {/* Chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {mc.chips.map(chip => (
                  <span
                    key={chip}
                    className="font-mono text-[0.55rem] tracking-[0.15em] uppercase px-3 py-1.5"
                    style={{
                      color: '#A06B10',
                      background: 'rgba(232,160,32,0.08)',
                      border: '1px solid rgba(232,160,32,0.2)',
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Languages */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase" style={{ color: '#6B6055' }}>
                  Delivered in
                </span>
                {mc.langs.map(lang => (
                  <span
                    key={lang}
                    className="font-mono text-[0.6rem] tracking-[0.15em] px-2 py-1 font-medium"
                    style={{
                      color: '#F2EBE0',
                      border: '1px solid rgba(242,235,224,0.15)',
                    }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="lg:hidden px-6 pb-16 space-y-6">
        {masterclasses.map((mc, i) => (
          <MobileCard key={i} mc={mc} />
        ))}
      </div>
    </section>
  )
}

function MobileCard({ mc }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border p-6"
      style={{ borderColor: 'rgba(242,235,224,0.1)', background: '#111009' }}
    >
      <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase mb-2" style={{ color: '#E8A020' }}>
        {mc.num} — {mc.tag}
      </div>
      <h3 className="font-cormorant font-semibold text-xl mb-3" style={{ color: '#F2EBE0' }}>
        {mc.title}
      </h3>
      <p className="font-dm text-sm leading-relaxed mb-4" style={{ color: '#A89B88' }}>
        {mc.preview}
      </p>
      {open && (
        <div>
          <p className="font-dm text-sm leading-relaxed mb-4" style={{ color: '#6B6055' }}>
            {mc.body}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {mc.chips.map(c => (
              <span key={c} className="font-mono text-[0.5rem] tracking-[0.12em] uppercase px-2.5 py-1" style={{ color: '#A06B10', background: 'rgba(232,160,32,0.07)', border: '1px solid rgba(232,160,32,0.15)' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        className="font-mono text-[0.58rem] tracking-[0.18em] uppercase mt-2"
        style={{ color: '#E8A020' }}
      >
        {open ? 'Show less ↑' : 'Read more ↓'}
      </button>
    </div>
  )
}
