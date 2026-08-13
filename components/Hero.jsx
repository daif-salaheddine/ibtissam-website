'use client'

import { useEffect, useRef, useState } from 'react'
import { hero, stats } from '@/lib/data'
import MagneticButton from '@/components/ui/MagneticButton'

const EXPERTISE = [
  'Higher Education',
  'Corporate L&D',
  'Curriculum Design',
  'Accreditation (NECHE)',
  'Leadership & NVC',
]

export default function Hero() {
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const scrollDown = (e) => {
    e.preventDefault()
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col"
      style={{
        backgroundImage: 'url(/1770130174921.jfif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.74) 100%)' }}
      />

      {/* Content — z-10, full height, flex column */}
      <div
        className="relative z-10 flex h-full flex-col px-5 sm:px-6 md:px-10 lg:px-14 pt-20"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s' }}
      >

        {/* ── META GRID ── */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">

          {/* Col 1: Name */}
          <div>
            <h2 className="text-lg md:text-xl tracking-wide leading-tight font-normal" style={{ color: '#FFFFFF' }}>
              {hero.firstName.toUpperCase()}
              <br />
              <span className="font-pixel text-2xl md:text-3xl" style={{ color: '#C4973A' }}>
                {hero.lastName.toUpperCase()}
              </span>
            </h2>
            <p className="text-[10px] mt-3" style={{ color: 'rgba(255,255,255,0.4)' }}>*</p>
            <p className="font-pixel mt-1 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Morocco · United States<br />
              · Europe<br />
              EN · FR · AR
            </p>
          </div>

          {/* Col 2: Field */}
          <div className="text-right lg:text-left">
            <h2 className="text-lg md:text-xl tracking-wide leading-tight font-normal" style={{ color: '#FFFFFF' }}>
              HIGHER ED &amp;
              <br />
              <span className="font-pixel text-2xl md:text-3xl" style={{ color: 'rgba(255,255,255,0.9)' }}>
                CONSULTING
              </span>
            </h2>
          </div>

          {/* Col 3: What She Does */}
          <div>
            <p className="font-pixel text-sm tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
              What I Do
            </p>
            <p className="text-sm leading-relaxed max-w-[220px]" style={{ color: 'rgba(255,255,255,0.85)' }}>
              I design and deliver learning programs that work — for universities and companies across Morocco, the US, and Europe.
            </p>
          </div>

          {/* Col 4: Expertise */}
          <div className="text-right lg:text-left">
            <p className="font-pixel text-sm tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Expertise
            </p>
            <ul className="text-sm leading-relaxed space-y-0.5" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {EXPERTISE.map(e => <li key={e}>{e}</li>)}
            </ul>
          </div>
        </div>

        {/* ── SPACER ── */}
        <div className="flex-1" />

        {/* ── BOTTOM SECTION ── */}
        <div className="pb-4">

          {/* Row A */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-end">

            {/* Hero headline */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] tracking-wide uppercase font-normal"
              style={{ lineHeight: 0.88, color: '#FFFFFF' }}
            >
              PROGRAMS THAT<br />
              <span
                className="font-pixel font-normal text-[1.15em] inline-block leading-none align-baseline"
                style={{ color: '#C4973A' }}
              >
                DELIVER
              </span>{' '}WHAT THEY<br />
              <span
                className="font-pixel font-normal text-[1.15em] inline-block leading-none align-baseline"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                PROMISED
              </span>
            </h1>

            {/* Right: CTA + stat chips */}
            <div className="flex flex-col gap-4 sm:gap-6 justify-end">
              <div className="self-start">
                <MagneticButton onClick={scrollDown} className="btn-outline-light">
                  View Her Work
                </MagneticButton>
              </div>

              {/* Stat chips */}
              <div className="flex flex-wrap items-stretch gap-2 sm:gap-3 self-start lg:self-end">
                {stats.map(({ value, suffix, label }) => (
                  <div
                    key={label}
                    className="px-3 sm:px-4 py-2 flex items-center gap-2"
                    style={{
                      background: 'rgba(0,0,0,0.55)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <span
                      className="font-cormorant font-semibold text-base sm:text-lg leading-none"
                      style={{ color: '#C4973A' }}
                    >
                      {value}{suffix}
                    </span>
                    <span
                      className="font-pixel text-[0.58rem] tracking-wide uppercase"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row B — footer strip */}
          <div
            className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 pt-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
          >
            <p className="font-pixel text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {hero.eyebrow}
            </p>
            <p className="font-pixel text-xs sm:text-right" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Open to freelance, contract or full-time.{' '}
              <a
                href="mailto:ibtissamdaif02@gmail.com"
                className="transition-colors duration-300"
                style={{ color: '#C4973A' }}
              >
                Get in touch
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
