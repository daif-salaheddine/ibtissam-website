'use client'

import { useState, useRef, useEffect } from 'react'
import { services } from '@/lib/data'

function useReveal(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const cards = el.querySelectorAll('[data-reveal]')
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
    cards.forEach((card, i) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(24px)'
      card.style.transition = `opacity 0.7s ${i * 0.07}s cubic-bezier(0.16,1,0.3,1), transform 0.7s ${i * 0.07}s cubic-bezier(0.16,1,0.3,1)`
      obs.observe(card)
    })
    return () => obs.disconnect()
  }, [])
}

export default function Services() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-28 md:py-36"
      style={{
        background: 'hsl(var(--surface))',
        borderTop: '1px solid hsl(var(--stroke))',
      }}
    >
      <div className="px-8 md:px-16 lg:px-24 xl:px-32 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="sec-num">04</span>
        </div>
        <div className="mb-14 md:flex md:justify-between md:items-end gap-12">
          <h2
            className="font-display font-light leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: 'hsl(var(--text))' }}
          >
            What I can do{' '}
            <em className="font-display italic">for your organization</em>
          </h2>
          <p
            className="mt-4 md:mt-0 font-body text-base leading-relaxed max-w-md"
            style={{ color: 'hsl(var(--muted))' }}
          >
            Eight areas. Each engagement designed from scratch for the client. Delivered in English, French, and Arabic.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'hsl(var(--stroke))' }}
        >
          {services.map((svc, i) => (
            <ServiceCard key={i} svc={svc} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ svc }) {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)

  return (
    <div
      data-reveal
      className="group p-6 flex flex-col transition-all duration-500 hover:z-10"
      style={{
        background: hover ? 'hsl(var(--bg))' : 'hsl(var(--surface))',
        minHeight: 240,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className="font-body text-[0.55rem] tracking-[0.2em] uppercase"
          style={{ color: 'hsl(var(--muted))' }}
        >
          {svc.num}
        </span>
        <span
          className="font-body text-[0.5rem] tracking-[0.15em] uppercase accent-text"
        >
          {svc.cat}
        </span>
      </div>

      <h3
        className="font-display italic font-semibold text-xl mb-3 leading-tight transition-colors duration-300"
        style={{ color: 'hsl(var(--text))' }}
      >
        {svc.title}
      </h3>

      <p
        className="font-body text-sm leading-relaxed mb-4 flex-1"
        style={{ color: 'hsl(var(--muted))' }}
      >
        {svc.lead}
      </p>

      {open && (
        <ul className="mb-4 space-y-1.5">
          {svc.items.map(item => (
            <li
              key={item}
              className="flex items-start gap-2 font-body text-xs leading-relaxed"
              style={{ color: 'hsl(var(--text) / 0.75)' }}
            >
              <span className="accent-text mt-0.5 flex-shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className="font-body text-[0.55rem] tracking-[0.18em] uppercase mt-auto self-start transition-colors duration-300"
        style={{ color: hover ? 'hsl(var(--text))' : 'hsl(var(--muted))' }}
      >
        {open ? 'Less ↑' : 'Details ↓'}
      </button>
    </div>
  )
}
