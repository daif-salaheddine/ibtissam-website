'use client'

import { useEffect, useRef, useState } from 'react'
import { hero } from '@/lib/data'
import MagneticButton from '@/components/ui/MagneticButton'

const NAME_FIRST = hero.firstName.toUpperCase()
const NAME_LAST  = hero.lastName.toUpperCase()

export default function Hero() {
  const containerRef = useRef(null)
  const firstRef = useRef(null)
  const lastRef  = useRef(null)
  const [roleIdx, setRoleIdx] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx(i => (i + 1) % hero.roles.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!visible) return
    const go = async () => {
      const { gsap } = await import('gsap')
      if (firstRef.current && lastRef.current) {
        gsap.from([...firstRef.current.querySelectorAll('span'), ...lastRef.current.querySelectorAll('span')], {
          opacity: 0, y: 50, rotateX: -40, stagger: 0.04, duration: 1.1, ease: 'expo.out', delay: 0.1,
        })
      }
    }
    go()
  }, [visible])

  const scrollDown = (e) => {
    e.preventDefault()
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      <div
        className="relative z-10 w-full px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s' }}
      >
        {/* Eyebrow — full width */}
        <p className="font-mono text-[0.8rem] tracking-[0.25em] uppercase mb-10" style={{ color: '#9A8E84' }}>
          {hero.eyebrow}
        </p>

        {/* Two-column layout: name left, content right */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-end">

          {/* Left: name + role carousel */}
          <div>
            <h1
              className="font-cormorant font-semibold leading-[0.88] select-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
              aria-label={`${hero.firstName} ${hero.lastName}`}
            >
              <div ref={firstRef} className="overflow-hidden">
                {NAME_FIRST.split('').map((ch, i) => (
                  <span key={i} className="inline-block" style={{ color: '#2A2218' }}>{ch}</span>
                ))}
              </div>
              <div ref={lastRef} className="overflow-hidden">
                {NAME_LAST.split('').map((ch, i) => (
                  <span key={i} className="inline-block" style={{ color: '#C4973A' }}>{ch}</span>
                ))}
              </div>
            </h1>

            <div className="mt-8 h-8 overflow-hidden relative" aria-live="polite" aria-atomic="true">
              <div
                className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateY(${-roleIdx * 32}px)` }}
              >
                {hero.roles.map((role, i) => (
                  <span key={i} className="font-cormorant font-normal text-xl md:text-2xl h-8 flex items-center" style={{ color: '#5A5048' }}>
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: tagline, location, CTA */}
          <div className="flex flex-col justify-end lg:pb-2">
            <p className="font-dm text-base md:text-lg leading-[1.7] mb-4" style={{ color: '#5A5048' }}>
              {hero.tagline}
            </p>

            <p className="font-mono text-[0.8rem] tracking-[0.2em] uppercase mb-10" style={{ color: '#9A8E84' }}>
              {hero.location}
            </p>

            <div className="flex items-center gap-6">
              <MagneticButton onClick={scrollDown} className="btn-outline">
                View Work
              </MagneticButton>
              <a
                href="mailto:ibtissamdaif02@gmail.com"
                className="font-mono text-[0.8rem] tracking-[0.15em] uppercase transition-colors duration-300"
                style={{ color: '#9A8E84' }}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-label="Scroll down"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s 1.2s' }}
      >
        <div className="w-[1px] h-12 origin-top animate-blink" style={{ background: 'rgba(196,151,58,0.5)' }} />
        <span className="font-mono text-[0.75rem] tracking-[0.2em] uppercase" style={{ color: '#9A8E84' }}>Scroll</span>
      </button>
    </section>
  )
}
