'use client'

import { useEffect, useRef, useState } from 'react'
import { expertise } from '@/lib/data'

export default function Expertise() {
  const containerRef = useRef(null)
  const [active, setActive] = useState(0)
  const panelRefs = useRef([])

  // GSAP scroll-pinned expertise on desktop
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    let ctx
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const panels = panelRefs.current.filter(Boolean)
        if (panels.length < 3) return

        // Start panels 2 & 3 off to the right
        gsap.set([panels[1], panels[2]], { xPercent: 100 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            start: 'top top',
            end: '+=200%',
            scrub: 1.5,
            onUpdate: self => {
              const prog = self.progress
              if (prog < 0.5) setActive(0)
              else if (prog < 0.85) setActive(1)
              else setActive(2)
            },
          },
        })

        tl
          .to(panels[0], { xPercent: -100, duration: 1 }, 0)
          .to(panels[1], { xPercent: 0, duration: 1 }, 0)
          .to(panels[1], { xPercent: -100, duration: 1 }, 1)
          .to(panels[2], { xPercent: 0, duration: 1 }, 1)
      }, containerRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="min-h-screen overflow-hidden"
      style={{ background: '#080706' }}
    >
      <div className="relative w-full min-h-screen flex flex-col lg:block">
        {/* Section label — absolute on desktop */}
        <div
          className="absolute top-20 left-6 md:left-12 z-10 flex items-center gap-4"
        >
          <span className="sec-num">02</span>
          <div className="h-[1px] w-8" style={{ background: 'rgba(242,235,224,0.1)' }} />
          <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase hidden md:block" style={{ color: '#6B6055' }}>
            Three Pillars, Integrated by Design
          </span>
        </div>

        {/* Mobile: stack vertically */}
        <div className="lg:hidden pt-32 pb-20 space-y-16 px-6 md:px-12 max-w-[1400px] mx-auto">
          {expertise.map((pillar, i) => (
            <PillarCard key={i} pillar={pillar} index={i} mobile />
          ))}
        </div>

        {/* Desktop: pinned panels */}
        <div className="hidden lg:block absolute inset-0">
          {expertise.map((pillar, i) => (
            <div
              key={i}
              ref={el => panelRefs.current[i] = el}
              className="absolute inset-0 will-change-transform"
            >
              <PillarCard pillar={pillar} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PillarCard({ pillar, index, mobile = false }) {
  return (
    <div
      className={`${mobile ? '' : 'h-full flex items-center justify-center'}`}
    >
      <div className={`${mobile ? '' : 'w-full max-w-[1400px] mx-auto px-12'} grid lg:grid-cols-2 gap-16 items-center`}>
        {/* Left: roman numeral + tags */}
        <div className="relative">
          {/* Huge watermark number */}
          <div
            className="absolute -top-8 -left-4 font-cormorant font-light leading-none pointer-events-none select-none"
            style={{
              fontSize: 'clamp(8rem, 20vw, 18rem)',
              color: 'rgba(232,160,32,0.04)',
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            {pillar.roman}
          </div>

          <div className="relative">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {pillar.tags.map(tag => (
                <span
                  key={tag}
                  className="font-mono text-[0.52rem] tracking-[0.18em] uppercase px-2.5 py-1 border"
                  style={{
                    color: '#A06B10',
                    borderColor: 'rgba(232,160,32,0.2)',
                    background: 'rgba(232,160,32,0.04)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2
              className="font-cormorant font-semibold leading-tight mb-2"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', color: '#F2EBE0' }}
            >
              {pillar.title}
            </h2>
            <div
              className="font-mono text-[0.6rem] tracking-[0.22em] uppercase mb-8"
              style={{ color: '#6B6055' }}
            >
              {pillar.sub}
            </div>

            {/* Outcome */}
            <div
              className="p-5 border-l-2"
              style={{
                borderColor: '#E8A020',
                background: 'rgba(232,160,32,0.05)',
              }}
            >
              <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-1.5" style={{ color: '#E8A020' }}>
                Outcome
              </div>
              <p className="font-dm text-sm leading-relaxed" style={{ color: '#A89B88' }}>
                {pillar.outcome.text}
              </p>
            </div>
          </div>
        </div>

        {/* Right: list */}
        <div>
          <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-6" style={{ color: '#6B6055' }}>
            Core Capabilities
          </div>
          <ul className="space-y-3">
            {[...pillar.preview, ...pillar.full].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 font-dm text-sm md:text-base leading-relaxed"
                style={{ color: i < pillar.preview.length ? '#F2EBE0' : '#A89B88' }}
              >
                <span style={{ color: '#E8A020', marginTop: 2, flexShrink: 0 }}>→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
