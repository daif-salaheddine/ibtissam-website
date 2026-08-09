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
    const entries = el.querySelectorAll('[data-tl-item]')

    const obs = new IntersectionObserver(
      items => items.forEach(item => {
        if (item.isIntersecting) {
          item.target.style.opacity = '1'
          item.target.style.transform = 'translateX(0)'
          obs.unobserve(item.target)
        }
      }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    entries.forEach((entry, i) => {
      entry.style.opacity = '0'
      entry.style.transform = i % 2 === 0 ? 'translateX(-40px)' : 'translateX(40px)'
      entry.style.transition = `opacity 0.8s ${i * 0.1}s cubic-bezier(0.16,1,0.3,1), transform 0.8s ${i * 0.1}s cubic-bezier(0.16,1,0.3,1)`
      obs.observe(entry)
    })

    let lineObs
    if (lineEl) {
      const update = () => {
        const rect = el.getBoundingClientRect()
        const viewH = window.innerHeight
        const progress = Math.min(1, Math.max(0, (viewH - rect.top) / (rect.height + viewH)))
        lineEl.style.transform = `scaleY(${progress})`
      }
      window.addEventListener('scroll', update, { passive: true })
      update()
      lineObs = () => window.removeEventListener('scroll', update)
    }

    return () => { obs.disconnect(); lineObs?.() }
  }, [])

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
        {/* Vertical line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] origin-top" style={{ background: 'rgba(42,34,24,0.1)' }}>
          <div
            ref={lineRef}
            className="absolute inset-0 origin-top will-change-transform"
            style={{ background: 'linear-gradient(to bottom, #C4973A, rgba(196,151,58,0.1))', transform: 'scaleY(0)' }}
          />
        </div>

        <div className="space-y-0">
          {timeline.map((item, i) => (
            <div
              key={i}
              data-tl-item
              className={`relative grid md:grid-cols-2 gap-8 md:gap-16 pb-16 pl-8 md:pl-0 ${
                i % 2 === 0 ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'
              }`}
            >
              {/* Dot */}
              <div
                className="absolute left-0 md:left-1/2 top-1 w-3 h-3 rounded-full border-2 -translate-x-1/2"
                style={{ borderColor: '#C4973A', background: item.metric ? '#C4973A' : '#F5EDE0' }}
              />

              <div className={i % 2 === 0 ? 'md:text-right' : 'md:col-start-2'}>
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
                    <img src={item.photo} alt={`${item.org} — ${item.role}`} className="w-full object-cover" style={{ maxHeight: '260px', filter: 'grayscale(10%)' }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  )
}
