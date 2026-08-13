'use client'

import { useEffect, useRef, useState } from 'react'
import { hero, stats } from '@/lib/data'

const ROLES = ['Educator', 'Consultant', 'Trainer', 'Facilitator']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 2000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    if (!ready) return
    let ctx
    const run = async () => {
      const { gsap } = await import('gsap')
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.name-reveal', { opacity: 0, y: 50, duration: 1.2, delay: 0.1 })
          .from('.blur-in', { opacity: 0, filter: 'blur(10px)', y: 20, duration: 1, stagger: 0.1 }, '-=0.8')
      })
    }
    run()
    return () => ctx?.revert()
  }, [ready])

  const scrollDown = (e) => {
    e.preventDefault()
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'url(/1770130174921.jfif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-black/40" />

      {/* Bottom fade into bg */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[1]"
        style={{ background: 'linear-gradient(to top, hsl(var(--bg)), transparent)' }}
      />

      {/* Centered content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center">

        {/* Eyebrow */}
        <p
          className="blur-in text-xs uppercase tracking-[0.3em] mb-8"
          style={{ color: 'hsl(var(--muted))' }}
        >
          Education &amp; Consulting
        </p>

        {/* Name */}
        <h1
          className="name-reveal font-display italic leading-[0.9] tracking-tight mb-6"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            color: 'hsl(var(--text))',
          }}
        >
          {hero.firstName} {hero.lastName}
        </h1>

        {/* Role cycling line */}
        <p
          className="blur-in text-base md:text-lg mb-4"
          style={{ color: 'hsl(var(--muted))' }}
        >
          A{' '}
          <span
            key={roleIndex}
            className="font-display italic animate-role-fade-in inline-block"
            style={{ color: 'hsl(var(--text))' }}
          >
            {ROLES[roleIndex]}
          </span>
          {' '}based in Morocco.
        </p>

        {/* Description */}
        <p
          className="blur-in text-sm md:text-base max-w-md mb-12"
          style={{ color: 'hsl(var(--muted))' }}
        >
          {hero.tagline || 'Designing and delivering learning programs that work — for universities and companies across Morocco, the US, and Europe.'}
        </p>

        {/* CTA buttons */}
        <div className="blur-in flex flex-wrap items-center justify-center gap-4">
          <GradientBorderButton
            onClick={scrollDown}
            variant="solid"
          >
            See Her Work
          </GradientBorderButton>

          <GradientBorderButton
            href="mailto:ibtissamdaif02@gmail.com"
            variant="outline"
          >
            Get in touch ↗
          </GradientBorderButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: 'hsl(var(--muted))' }}
        >
          Scroll
        </span>
        <div
          className="relative w-px h-10 overflow-hidden"
          style={{ background: 'hsl(var(--stroke))' }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full accent-gradient animate-scroll-down"
          />
        </div>
      </div>
    </section>
  )
}

function GradientBorderButton({ children, onClick, href, variant = 'outline' }) {
  const [hovered, setHovered] = useState(false)

  const shared = {
    className: `relative rounded-full text-sm px-7 py-3.5 font-body font-medium transition-transform duration-200 ${hovered ? 'scale-105' : ''}`,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }

  const inner = (
    <>
      {hovered && (
        <span
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: -2,
            background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
            zIndex: 0,
          }}
        />
      )}
      <span
        className="relative z-10 flex items-center gap-2 rounded-full px-7 py-3.5"
        style={
          variant === 'solid'
            ? { background: 'hsl(var(--text))', color: 'hsl(var(--bg))' }
            : { background: 'hsl(var(--bg))', color: 'hsl(var(--text))', border: hovered ? 'none' : '2px solid hsl(var(--stroke))' }
        }
      >
        {children}
      </span>
    </>
  )

  if (href) {
    return (
      <a href={href} {...shared} style={{ display: 'inline-flex', alignItems: 'center' }}>
        {inner}
      </a>
    )
  }

  return (
    <button onClick={onClick} {...shared} style={{ display: 'inline-flex', alignItems: 'center' }}>
      {inner}
    </button>
  )
}
