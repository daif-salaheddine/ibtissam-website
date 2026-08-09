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
          opacity: 0,
          y: 50,
          rotateX: -40,
          stagger: 0.04,
          duration: 1.1,
          ease: 'expo.out',
          delay: 0.1,
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Content */}
      <div
        className="relative z-10 w-full px-8 md:px-16 lg:px-24 xl:px-32 max-w-[1800px] mx-auto flex flex-col items-start"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s' }}
      >
        {/* Eyebrow */}
        <p
          className="font-mono text-[0.6rem] md:text-[0.7rem] tracking-[0.35em] uppercase mb-8"
          style={{ color: '#9B968F' }}
        >
          {hero.eyebrow}
        </p>

        {/* Name — massive display */}
        <h1
          className="font-cormorant font-semibold leading-[0.88] select-none"
          style={{ fontSize: 'clamp(3.8rem, 13vw, 13rem)' }}
          aria-label={`${hero.firstName} ${hero.lastName}`}
        >
          <div ref={firstRef} className="overflow-hidden">
            {NAME_FIRST.split('').map((ch, i) => (
              <span key={i} className="inline-block" style={{ color: '#221F1C' }}>{ch}</span>
            ))}
          </div>
          <div ref={lastRef} className="overflow-hidden">
            {NAME_LAST.split('').map((ch, i) => (
              <span key={i} className="inline-block" style={{ color: '#D9920E' }}>{ch}</span>
            ))}
          </div>
        </h1>

        {/* Role carousel */}
        <div
          className="mt-8 h-8 overflow-hidden relative"
          aria-live="polite"
          aria-atomic="true"
        >
          <div
            className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateY(${-roleIdx * 32}px)` }}
          >
            {hero.roles.map((role, i) => (
              <span
                key={i}
                className="font-cormorant italic font-light text-2xl md:text-3xl h-8 flex items-center justify-center"
                style={{ color: '#6B6560' }}
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <p
          className="mt-6 font-cormorant italic font-light text-xl md:text-2xl max-w-2xl leading-relaxed"
          style={{ color: '#6B6560' }}
        >
          {hero.tagline}
        </p>

        {/* Location */}
        <p
          className="mt-3 font-mono text-[0.6rem] tracking-[0.25em] uppercase"
          style={{ color: '#9B968F' }}
        >
          {hero.location}
        </p>

        {/* CTA */}
        <div className="mt-12 flex items-center gap-6 self-start">
          <MagneticButton
            onClick={scrollDown}
            className="px-8 py-3.5 font-mono text-[0.65rem] tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:opacity-80"
            style={{ background: '#221F1C', color: '#FFFFFF', border: 'none' }}
          >
            View Work
          </MagneticButton>
          <a
            href="mailto:ibtissamdaif02@gmail.com"
            className="font-mono text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: '#8A5C0A' }}
          >
            Get in Touch →
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
        aria-label="Scroll down"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s 1.2s' }}
      >
        <div
          className="w-[1px] h-12 origin-top animate-blink"
          style={{ background: 'rgba(217,146,14,0.5)' }}
        />
        <span className="font-mono text-[0.5rem] tracking-[0.3em] uppercase" style={{ color: '#9B968F' }}>
          Scroll
        </span>
      </button>
    </section>
  )
}
