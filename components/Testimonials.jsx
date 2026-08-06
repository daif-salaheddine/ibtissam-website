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
      className="py-28 md:py-36"
      style={{ background: '#111009', borderTop: '1px solid rgba(242,235,224,0.07)' }}
    >
      <div className="px-8 md:px-16 lg:px-24 xl:px-32 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span className="sec-num">04</span>
        </div>
        <h2
          data-reveal
          className="font-cormorant font-light leading-tight mb-16"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: '#F2EBE0' }}
        >
          In their own <em>words</em>
        </h2>

        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-reveal
              className="border-t-2 pt-8"
              style={{ borderColor: 'rgba(232,160,32,0.25)' }}
            >
              <blockquote
                className="font-cormorant italic font-light leading-relaxed mb-8"
                style={{
                  fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)',
                  color: t.placeholder ? 'rgba(242,235,224,0.25)' : '#F2EBE0',
                }}
              >
                {t.quote}
              </blockquote>
              <div>
                <div
                  className="font-dm text-sm font-medium"
                  style={{ color: t.placeholder ? 'rgba(232,160,32,0.35)' : '#E8A020' }}
                >
                  {t.name}
                </div>
                <div
                  className="font-mono text-[0.55rem] tracking-[0.15em] uppercase mt-1"
                  style={{ color: '#9E908A' }}
                >
                  {t.title}, {t.org}
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.some(t => t.placeholder) && (
          <p
            className="mt-12 font-mono text-[0.58rem] tracking-[0.18em] uppercase"
            style={{ color: 'rgba(232,160,32,0.35)' }}
          >
            ↑ Placeholder — replace with real testimonials before sharing the link
          </p>
        )}
      </div>
    </section>
  )
}
