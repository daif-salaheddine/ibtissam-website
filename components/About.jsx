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
      className="py-28 md:py-36 px-8 md:px-16 lg:px-24 xl:px-32 max-w-[1800px] mx-auto"
    >
      {/* Section label */}
      <div className="reveal-up flex items-center gap-4 mb-16">
        <span className="sec-num">01</span>
        <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: '#9B968F' }}>
          Professional Identity
        </span>
      </div>

      {/* Stats row */}
      <div className="reveal-up delay-1 grid grid-cols-3 gap-6 md:gap-12 mb-20">
        {stats.map(({ value, suffix, label }) => (
          <div key={label} className="text-center md:text-left">
            <div
              className="font-cormorant font-semibold leading-none"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: '#D9920E' }}
            >
              <Counter target={value} suffix={suffix} />
            </div>
            <div
              className="mt-2 font-mono text-[0.58rem] tracking-[0.18em] uppercase"
              style={{ color: '#9B968F' }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid md:grid-cols-[1fr_1fr_380px] gap-12 md:gap-16 items-start">
        {/* Quote */}
        <div className="reveal-up delay-2">
          <blockquote
            className="font-cormorant italic font-light leading-[1.4]"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', color: '#221F1C' }}
          >
            <span
              className="block w-8 h-[2px] mb-6"
              style={{ background: '#D9920E' }}
              aria-hidden="true"
            />
            {about.quote}
          </blockquote>
        </div>

        {/* Portrait */}
        <div className="reveal-up delay-3 hidden md:block relative">
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: '3/4',
              background: '#F8F5EE',
              border: '1px solid rgba(34,31,28,0.08)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/10.jfif"
              alt="Ibtissam Daif at Fisher College graduation, Boston"
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(10%)' }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(34,31,28,0.15) 0%, transparent 50%)',
              }}
            />
          </div>
        </div>

        {/* Bio + pillars */}
        <div className="reveal-up delay-4">
          <p
            className="font-dm text-lg md:text-xl leading-[1.8] mb-8"
            style={{ color: '#6B6560' }}
          >
            {about.bioShort}
          </p>
          <p
            className="font-dm text-base md:text-lg leading-[1.85]"
            style={{ color: '#9B968F' }}
          >
            {about.bioLong.split('\n\n').map((para, i) => (
              <span key={i} className="block mb-4">{para}</span>
            ))}
          </p>

          {/* Pillar tags */}
          <div className="mt-10 flex flex-wrap gap-3">
            {about.pillars.map(p => (
              <span
                key={p}
                className="font-mono text-[0.58rem] tracking-[0.15em] uppercase px-3 py-1.5 border"
                style={{
                  color: '#8A5C0A',
                  borderColor: 'rgba(138,92,10,0.25)',
                  background: 'rgba(217,146,14,0.07)',
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
