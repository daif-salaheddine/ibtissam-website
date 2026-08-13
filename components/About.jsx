'use client'

import { useEffect, useRef } from 'react'
import { about, stats } from '@/lib/data'
import Counter from '@/components/ui/Counter'

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll('.reveal-up, .reveal-clip')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function About() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: '#080706' }}
    >
      <div className="py-28 md:py-36 px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto">

        {/* Section label */}
        <div className="reveal-up flex items-center gap-4 mb-16">
          <span className="sec-num">01</span>
          <span className="font-pixel text-[0.75rem] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Professional Identity
          </span>
        </div>

        {/* Stats row — styled as chips like Adam's awards */}
        <div className="reveal-up delay-1 flex flex-wrap gap-3 mb-20">
          {stats.map(({ value, suffix, label }) => (
            <div
              key={label}
              className="px-4 py-3 flex items-center gap-3"
              style={{ background: '#0B0B0B', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span className="font-cormorant font-semibold leading-none" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#C4973A' }}>
                <Counter target={value} suffix={suffix} />
              </span>
              <span className="font-pixel text-[0.65rem] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-[1fr_1fr_380px] gap-12 md:gap-16 items-start">

          {/* Quote */}
          <div className="reveal-up delay-2">
            <blockquote
              className="font-cormorant italic font-normal leading-[1.5]"
              style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)', color: 'rgba(255,255,255,0.9)' }}
            >
              <span className="block w-8 h-[2px] mb-6" style={{ background: '#C4973A' }} aria-hidden="true" />
              {about.quote}
            </blockquote>
          </div>

          {/* Portraits */}
          <div className="reveal-up delay-3 hidden md:flex flex-col gap-3">
            <div
              className="relative overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/10.jfif" alt="Ibtissam Daif" className="w-full block" style={{ filter: 'grayscale(8%)' }} />
            </div>
            <div
              className="relative overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/638284572_18560172718003108_182237673993080230_n.jpg" alt="Ibtissam Daif — media appearance" className="w-full block" />
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)' }}>
                <span className="font-pixel text-[0.65rem] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Al Aoula · National TV</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="reveal-up delay-4">
            <p className="font-dm text-base md:text-lg leading-[1.7] mb-8 max-w-[680px]" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {about.bioShort}
            </p>
            <p className="font-dm text-base leading-[1.7] max-w-[680px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {about.bioLong.split('\n\n').map((para, i) => (
                <span key={i} className="block mb-4">{para}</span>
              ))}
            </p>

            {/* Pillar chips — dark like Adam's award chips */}
            <div className="mt-10 flex flex-wrap gap-2">
              {about.pillars.map(p => (
                <span
                  key={p}
                  className="font-pixel text-[0.65rem] tracking-widest uppercase px-3 py-2 flex items-center"
                  style={{
                    background: '#0B0B0B',
                    border: '1px solid rgba(196,151,58,0.25)',
                    color: '#C4973A',
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
