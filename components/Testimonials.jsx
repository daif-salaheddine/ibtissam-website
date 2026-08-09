'use client'

import { useEffect, useRef } from 'react'
import { testimonials } from '@/lib/data'

export default function Testimonials() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const items = el.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    items.forEach((item, i) => {
      item.style.opacity = '0'
      item.style.transform = 'translateY(28px)'
      item.style.transition = `opacity 0.8s ${i * 0.1}s cubic-bezier(0.16,1,0.3,1), transform 0.8s ${i * 0.1}s cubic-bezier(0.16,1,0.3,1)`
      obs.observe(item)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-28 md:py-36 relative overflow-hidden"
      style={{ background: '#5A7060' }}
    >
      {/* Kelsey-style wavy decorative lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.12 }}
        aria-hidden="true"
      >
        <path
          d="M-100,120 Q150,60 400,120 T900,120 T1400,120 T1900,120"
          fill="none" stroke="white" strokeWidth="1.5"
        />
        <path
          d="M-100,200 Q150,140 400,200 T900,200 T1400,200 T1900,200"
          fill="none" stroke="white" strokeWidth="1"
        />
        <path
          d="M-100,320 Q200,260 500,320 T1000,300 T1500,320 T1900,300"
          fill="none" stroke="white" strokeWidth="1"
        />
        <path
          d="M-100,460 Q250,400 550,460 T1050,440 T1550,460 T1900,440"
          fill="none" stroke="white" strokeWidth="1.5"
        />
      </svg>

      <div className="relative z-10 px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span className="sec-num-light">04</span>
        </div>
        <h2
          data-reveal
          className="font-cormorant font-light leading-tight mb-16"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: '#FFFFFF' }}
        >
          In their own <em>words</em>
        </h2>

        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-reveal
              className="border-t pt-8"
              style={{ borderColor: 'rgba(255,255,255,0.25)' }}
            >
              <blockquote
                className="font-cormorant italic font-light leading-relaxed mb-8"
                style={{
                  fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)',
                  color: t.placeholder ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.95)',
                }}
              >
                {t.quote}
              </blockquote>
              <div>
                <div className="font-dm text-sm font-medium" style={{ color: t.placeholder ? 'rgba(255,255,255,0.3)' : '#FFFFFF' }}>
                  {t.name}
                </div>
                <div className="font-mono text-[0.55rem] tracking-[0.15em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {t.title}, {t.org}
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.some(t => t.placeholder) && (
          <p className="mt-12 font-mono text-[0.58rem] tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
            ↑ Placeholder — replace with real testimonials before sharing the link
          </p>
        )}
      </div>
    </section>
  )
}
