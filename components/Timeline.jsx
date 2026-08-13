'use client'

import { useEffect, useRef } from 'react'
import { timeline } from '@/lib/data'

export default function Timeline() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const lineEl = lineRef.current
    const cells = el.querySelectorAll('[data-tl-cell]')

    const obs = new IntersectionObserver(
      items => items.forEach(item => {
        if (item.isIntersecting) {
          item.target.style.opacity = '1'
          item.target.style.transform = 'translateX(0)'
          obs.unobserve(item.target)
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    cells.forEach(cell => {
      cell.style.opacity = '0'
      cell.style.transform = cell.dataset.tlCell === 'left' ? 'translateX(-40px)' : 'translateX(40px)'
      cell.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)`
      obs.observe(cell)
    })

    if (lineEl) {
      const update = () => {
        const rect = el.getBoundingClientRect()
        const viewH = window.innerHeight
        const progress = Math.min(1, Math.max(0, (viewH - rect.top) / (rect.height + viewH)))
        lineEl.style.transform = `scaleY(${progress})`
      }
      window.addEventListener('scroll', update, { passive: true })
      update()
      return () => { obs.disconnect(); window.removeEventListener('scroll', update) }
    }

    return () => obs.disconnect()
  }, [])

  const rows = []
  for (let i = 0; i < timeline.length; i += 2) {
    rows.push([timeline[i], timeline[i + 1] ?? null])
  }

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{ background: 'hsl(var(--bg))' }}
    >
      <div className="py-28 md:py-36 px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span className="sec-num">05</span>
        </div>
        <h2
          className="font-display italic font-semibold leading-[1.2] mb-4"
          style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'hsl(var(--text))' }}
        >
          What I&apos;ve built and changed
        </h2>
        <p
          className="font-body text-base leading-[1.65] mb-16 max-w-xl"
          style={{ color: 'hsl(var(--muted))' }}
        >
          Selected roles focused on outcomes and strategic contributions.
        </p>

        <div className="relative">
          {/* Vertical line — desktop */}
          <div
            className="absolute hidden md:block left-1/2 top-0 bottom-0 w-[1px] origin-top"
            style={{ background: 'hsl(var(--stroke))' }}
          >
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top will-change-transform"
              style={{ background: 'linear-gradient(to bottom, #89AACC, rgba(78,133,191,0.1))', transform: 'scaleY(0)' }}
            />
          </div>

          {/* Mobile line */}
          <div
            className="absolute md:hidden left-0 top-0 bottom-0 w-[1px]"
            style={{ background: 'hsl(var(--stroke))' }}
          />

          <div className="space-y-0">
            {rows.map((pair, rowIdx) => (
              <div key={rowIdx} className="grid md:grid-cols-2 gap-12 md:gap-0 pb-16 relative">
                {/* Center dot — desktop */}
                <div
                  className="absolute hidden md:block left-1/2 top-1 w-3 h-3 rounded-full border-2 -translate-x-1/2 z-10"
                  style={{
                    borderColor: '#89AACC',
                    background: pair[0]?.metric ? '#89AACC' : 'hsl(var(--bg))',
                  }}
                />

                {/* LEFT cell */}
                <div data-tl-cell="left" className="md:pr-12 lg:pr-16 pl-6 md:pl-0 relative">
                  <div
                    className="absolute md:hidden left-0 top-1 w-2.5 h-2.5 rounded-full border-2 -translate-x-1/2"
                    style={{
                      borderColor: '#89AACC',
                      background: pair[0]?.metric ? '#89AACC' : 'hsl(var(--bg))',
                    }}
                  />
                  <EntryContent item={pair[0]} />
                </div>

                {/* RIGHT cell */}
                <div data-tl-cell="right" className="md:pl-12 lg:pl-16 pl-6 relative">
                  {pair[1] && <EntryContent item={pair[1]} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EntryContent({ item }) {
  if (!item) return null
  return (
    <div>
      <div
        className="font-body text-[0.72rem] tracking-widest uppercase mb-1"
        style={{ color: 'hsl(var(--muted))' }}
      >
        {item.date}
      </div>
      <div
        className="font-display italic font-semibold text-lg md:text-2xl mb-0.5 accent-text"
      >
        {item.org}
      </div>
      <div
        className="font-body text-[0.72rem] tracking-widest uppercase mb-4"
        style={{ color: 'hsl(var(--muted) / 0.7)' }}
      >
        {item.place}
      </div>

      <h3
        className="font-display font-semibold text-xl md:text-2xl mb-3 leading-snug"
        style={{ color: 'hsl(var(--text))' }}
      >
        {item.role}
      </h3>

      {item.metric && (
        <span
          className="inline-block font-body text-[0.68rem] tracking-widest uppercase px-3 py-1.5 mb-3"
          style={{
            color: '#89AACC',
            background: 'rgba(137,170,204,0.08)',
            border: '1px solid rgba(137,170,204,0.25)',
          }}
        >
          {item.metric}
        </span>
      )}

      <p
        className="font-body text-base leading-relaxed"
        style={{ color: 'hsl(var(--text) / 0.75)' }}
      >
        {item.preview}
      </p>
      <p
        className="font-body text-base leading-[1.65] mt-2"
        style={{ color: 'hsl(var(--muted))' }}
      >
        {item.body}
      </p>

      {item.photo && (
        <div
          className="mt-5 overflow-hidden"
          style={{ border: '1px solid hsl(var(--stroke))' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.photo} alt={`${item.org} — ${item.role}`} className="w-full block" style={{ filter: 'grayscale(10%)' }} />
        </div>
      )}
    </div>
  )
}
