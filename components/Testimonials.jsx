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
      style={{ background: '#080706' }}
    >
      <div className="relative z-10 px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span className="sec-num">04</span>
        </div>
        <h2
          data-reveal
          className="font-cormorant font-semibold leading-[1.2] mb-16"
          style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: '#FFFFFF' }}
        >
          In their own words
        </h2>

        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-reveal
              className="border-t pt-8"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <blockquote
                className="font-cormorant italic font-normal leading-[1.55] mb-8"
                style={{
                  fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                {t.quote}
              </blockquote>
              <div>
                <div className="font-dm text-sm font-medium" style={{ color: '#FFFFFF' }}>
                  {t.name}
                </div>
                <div className="font-pixel text-[0.68rem] tracking-widest uppercase mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {t.title}, {t.org}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
