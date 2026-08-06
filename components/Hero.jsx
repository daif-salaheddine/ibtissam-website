'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { hero } from '@/lib/data'
import MagneticButton from '@/components/ui/MagneticButton'

const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), { ssr: false })

const NAME_FIRST = hero.firstName.toUpperCase()
const NAME_LAST  = hero.lastName.toUpperCase()

export default function Hero() {
  const containerRef = useRef(null)
  const firstRef = useRef(null)
  const lastRef  = useRef(null)
  const [roleIdx, setRoleIdx] = useState(0)
  const [visible, setVisible] = useState(false)

  // Animate hero in
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Role carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx(i => (i + 1) % hero.roles.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  // GSAP letter reveal
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
      style={{ background: '#080706' }}
    >
      {/* Three.js particle field */}
      <HeroCanvas />

      {/* Radial amber glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(232,160,32,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 flex flex-col items-center"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s' }}
      >
        {/* Eyebrow */}
        <p
          className="font-mono text-[0.6rem] md:text-[0.7rem] tracking-[0.35em] uppercase mb-8"
          style={{ color: '#6B6055' }}
        >
          {hero.eyebrow}
        </p>

        {/* Name — massive display */}
        <div
          className="font-cormorant font-semibold leading-[0.88] select-none"
          style={{ fontSize: 'clamp(3.8rem, 13vw, 13rem)' }}
          aria-label={`${hero.firstName} ${hero.lastName}`}
        >
          <div ref={firstRef} className="overflow-hidden">
            {NAME_FIRST.split('').map((ch, i) => (
              <span key={i} className="inline-block" style={{ color: '#F2EBE0' }}>{ch}</span>
            ))}
          </div>
          <div ref={lastRef} className="overflow-hidden">
            {NAME_LAST.split('').map((ch, i) => (
              <span key={i} className="inline-block" style={{ color: '#E8A020' }}>{ch}</span>
            ))}
          </div>
        </div>

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
                style={{ color: '#A89B88' }}
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <p
          className="mt-4 font-mono text-[0.6rem] tracking-[0.25em] uppercase"
          style={{ color: '#6B6055' }}
        >
          {hero.tagline}
        </p>

        {/* CTA */}
        <div className="mt-12 flex items-center gap-6">
          <MagneticButton
            onClick={scrollDown}
            className="px-8 py-3 border font-mono text-[0.65rem] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-amber hover:text-bg"
            style={{ color: '#E8A020', borderColor: 'rgba(232,160,32,0.4)' }}
          >
            View Work
          </MagneticButton>
          <a
            href="mailto:ibtissamdaif02@gmail.com"
            className="font-mono text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300 hover:text-amber"
            style={{ color: '#6B6055' }}
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
          style={{ background: 'rgba(232,160,32,0.5)' }}
        />
        <span className="font-mono text-[0.5rem] tracking-[0.3em] uppercase" style={{ color: '#6B6055' }}>
          Scroll
        </span>
      </button>
    </section>
  )
}
