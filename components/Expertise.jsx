'use client'

import { useEffect, useRef, useState } from 'react'
import { expertise } from '@/lib/data'

// Section background: deep golden-mustard (like Kelsey's "How we work together")
const BG = '#8A7020'

export default function Expertise() {
  const containerRef = useRef(null)
  const [active, setActive] = useState(0)
  const panelRefs = useRef([])

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
      style={{ background: BG }}
    >
      <div className="relative w-full min-h-screen flex flex-col lg:block">
        {/* Section label */}
        <div className="absolute top-20 left-6 md:left-12 z-10 flex items-center gap-4">
          <span className="sec-num-light">02</span>
          <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase hidden md:block" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Three Pillars, Integrated by Design
          </span>
        </div>

        {/* Mobile */}
        <div className="lg:hidden pt-32 pb-20 space-y-16 px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto">
          {expertise.map((pillar, i) => (
            <PillarCard key={i} pillar={pillar} index={i} mobile />
          ))}
        </div>

        {/* Desktop pinned panels */}
        <div className="hidden lg:block absolute inset-0">
          {expertise.map((pillar, i) => (
            <div
              key={i}
              ref={el => panelRefs.current[i] = el}
              className="absolute inset-0 will-change-transform"
              style={{ background: BG }}
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
    <div className={`${mobile ? '' : 'h-full flex items-center justify-center'}`}>
      <div className={`${mobile ? '' : 'w-full max-w-[1400px] mx-auto px-12'} grid lg:grid-cols-2 gap-16 items-center`}>
        {/* Left */}
        <div className="relative">
          {/* Watermark */}
          <div
            className="absolute -top-8 -left-4 font-cormorant font-light leading-none pointer-events-none select-none"
            style={{ fontSize: 'clamp(8rem, 20vw, 18rem)', color: 'rgba(255,255,255,0.06)', lineHeight: 1 }}
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
                  className="font-mono text-[0.52rem] tracking-[0.18em] uppercase px-2.5 py-1"
                  style={{ color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2
              className="font-cormorant font-semibold leading-tight mb-2"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', color: '#FFFFFF' }}
            >
              {pillar.title}
            </h2>
            <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {pillar.sub}
            </div>

            {/* Outcome */}
            <div className="p-5 border-l-2" style={{ borderColor: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.08)' }}>
              <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Outcome
              </div>
              <p className="font-dm text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {pillar.outcome.text}
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Core Capabilities
          </div>
          <ul className="space-y-3">
            {[...pillar.preview, ...pillar.full].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 font-dm text-sm md:text-base leading-relaxed"
                style={{ color: i < pillar.preview.length ? '#FFFFFF' : 'rgba(255,255,255,0.7)' }}
              >
                <span style={{ color: 'rgba(255,255,255,0.6)', marginTop: 2, flexShrink: 0 }}>→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
