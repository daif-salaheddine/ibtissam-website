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

  // Pair entries: [0,1], [2,3], [4,5] …
  const rows = []
  for (let i = 0; i < timeline.length; i += 2) {
    rows.push([timeline[i], timeline[i + 1] ?? null])
  }

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{ background: '#F5EDE0' }}
    >
      <div className="py-28 md:py-36 px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span className="sec-num">05</span>
        </div>
        <h2 className="font-cormorant font-semibold leading-[1.2] mb-4" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: '#2A2218' }}>
          What I&apos;ve built and changed
        </h2>
        <p className="font-dm text-base leading-[1.65] mb-16 max-w-xl" style={{ color: '#9A8E84' }}>
          Selected roles focused on outcomes and strategic contributions.
        </p>

        <div className="relative">
          {/* Vertical line — desktop only */}
          <div className="absolute hidden md:block left-1/2 top-0 bottom-0 w-[1px] origin-top" style={{ background: 'rgba(42,34,24,0.1)' }}>
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top will-change-transform"
              style={{ background: 'linear-gradient(to bottom, #C4973A, rgba(196,151,58,0.1))', transform: 'scaleY(0)' }}
            />
          </div>

          {/* Mobile: single left border line */}
          <div className="absolute md:hidden left-0 top-0 bottom-0 w-[1px]" style={{ background: 'rgba(42,34,24,0.12)' }} />

          <div className="space-y-0">
            {rows.map((pair, rowIdx) => (
              <div key={rowIdx} className="grid md:grid-cols-2 gap-12 md:gap-0 pb-16 relative">
                {/* Center dot for this row — desktop */}
                <div
                  className="absolute hidden md:block left-1/2 top-1 w-3 h-3 rounded-full border-2 -translate-x-1/2 z-10"
                  style={{ borderColor: '#C4973A', background: pair[0]?.metric ? '#C4973A' : '#F5EDE0' }}
                />

                {/* LEFT cell */}
                <div
                  data-tl-cell="left"
                  className="md:pr-12 lg:pr-16 pl-6 md:pl-0 relative"
                >
                  {/* Mobile dot */}
                  <div
                    className="absolute md:hidden left-0 top-1 w-2.5 h-2.5 rounded-full border-2 -translate-x-1/2"
                    style={{ borderColor: '#C4973A', background: pair[0]?.metric ? '#C4973A' : '#F5EDE0' }}
                  />
                  <EntryContent item={pair[0]} align="left" />
                </div>

                {/* RIGHT cell */}
                <div
                  data-tl-cell="right"
                  className="md:pl-12 lg:pl-16 pl-6 md:border-l-0 relative"
                  style={{ borderColor: 'transparent' }}
                >
                  {pair[1] && <EntryContent item={pair[1]} align="right" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EntryContent({ item, align }) {
  if (!item) return null
  return (
    <div>
      <div className="font-mono text-[0.75rem] tracking-[0.12em] uppercase mb-1" style={{ color: '#9A8E84' }}>{item.date}</div>
      <div className="font-cormorant font-semibold text-lg md:text-2xl mb-0.5" style={{ color: '#C4973A' }}>{item.org}</div>
      <div className="font-mono text-[0.75rem] tracking-[0.1em] uppercase mb-4" style={{ color: '#9A8E84' }}>{item.place}</div>

      <h3 className="font-cormorant font-semibold text-xl md:text-2xl mb-3 leading-snug" style={{ color: '#2A2218' }}>
        {item.role}
      </h3>

      {item.metric && (
        <span
          className="inline-block font-mono text-[0.75rem] tracking-[0.1em] uppercase px-3 py-1.5 mb-3"
          style={{ color: '#3D6840', background: 'rgba(61,104,64,0.10)', border: '1px solid rgba(61,104,64,0.25)' }}
        >
          ↑ {item.metric}
        </span>
      )}

      <p className="font-dm text-base leading-relaxed" style={{ color: '#5A5048' }}>{item.preview}</p>
      <p className="font-dm text-base leading-[1.65] mt-2" style={{ color: '#9A8E84' }}>{item.body}</p>

      {item.photo && (
        <div className="mt-5 overflow-hidden" style={{ border: '1px solid rgba(42,34,24,0.08)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.photo} alt={`${item.org} — ${item.role}`} className="w-full block" style={{ filter: 'grayscale(10%)' }} />
        </div>
      )}
    </div>
  )
}
