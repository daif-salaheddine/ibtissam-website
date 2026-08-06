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
      style={{ background: '#111009', borderTop: '1px solid rgba(242,235,224,0.07)' }}
    >
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="sec-num">04</span>
          <div className="h-[1px] w-8" style={{ background: 'rgba(242,235,224,0.1)' }} />
        </div>
        <div className="mb-14 md:flex md:justify-between md:items-end gap-12">
          <h2
            className="font-cormorant font-light leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: '#F2EBE0' }}
          >
            What she can do <em>for your organization</em>
          </h2>
          <p className="mt-4 md:mt-0 font-dm text-sm leading-relaxed max-w-md" style={{ color: '#6B6055' }}>
            Eight service areas. Each engagement is tailored, never templated. Delivered natively in English, French, and Arabic.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(242,235,224,0.07)' }}>
          {services.map((svc, i) => (
            <ServiceCard key={i} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ svc, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      data-reveal
      className="group p-6 flex flex-col transition-all duration-500 hover:z-10"
      style={{
        background: '#111009',
        minHeight: 240,
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#1A1714'}
      onMouseLeave={e => e.currentTarget.style.background = '#111009'}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase" style={{ color: '#6B6055' }}>
          {svc.num}
        </span>
        <span className="font-mono text-[0.5rem] tracking-[0.15em] uppercase" style={{ color: '#E8A020' }}>
          {svc.cat}
        </span>
      </div>

      <h3
        className="font-cormorant font-semibold text-xl mb-3 leading-tight group-hover:text-amber transition-colors duration-300"
        style={{ color: '#F2EBE0' }}
      >
        {svc.title}
      </h3>

      <p className="font-dm text-sm leading-relaxed mb-4 flex-1" style={{ color: '#6B6055' }}>
        {svc.lead}
      </p>

      {open && (
        <ul className="mb-4 space-y-1.5">
          {svc.items.map(item => (
            <li key={item} className="flex items-start gap-2 font-dm text-xs leading-relaxed" style={{ color: '#A89B88' }}>
              <span style={{ color: '#E8A020', marginTop: 1, flexShrink: 0 }}>→</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className="font-mono text-[0.55rem] tracking-[0.18em] uppercase mt-auto self-start transition-colors duration-300 hover:text-amber"
        style={{ color: '#6B6055' }}
      >
        {open ? 'Less ↑' : 'Details ↓'}
      </button>
    </div>
  )
}
