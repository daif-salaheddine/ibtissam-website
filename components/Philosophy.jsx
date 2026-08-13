'use client'

import { useRef, useEffect } from 'react'
import { philosophy } from '@/lib/data'

function useReveal(ref) {
  useEffect(() => {
    const el = ref.current
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
      item.style.transition = `opacity 0.8s ${i * 0.08}s cubic-bezier(0.16,1,0.3,1), transform 0.8s ${i * 0.08}s cubic-bezier(0.16,1,0.3,1)`
      obs.observe(item)
    })
    return () => obs.disconnect()
  }, [])
}

export default function Philosophy() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="py-28 md:py-36"
      style={{ background: 'hsl(var(--surface))' }}
    >
      <div className="px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span className="sec-num">06</span>
        </div>
        <h2
          data-reveal
          className="font-display italic font-semibold leading-[1.2] mb-16 max-w-xl"
          style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'hsl(var(--text))' }}
        >
          How I think about learning
        </h2>

        {/* Pull quote */}
        <blockquote
          data-reveal
          className="font-display italic font-normal leading-[1.5] mb-20 max-w-3xl"
          style={{ fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)', color: 'hsl(var(--text) / 0.75)' }}
        >
          <span
            className="block w-6 h-[2px] mb-6"
            style={{ background: 'linear-gradient(90deg, #89AACC, #4E85BF)' }}
            aria-hidden
          />
          {philosophy.quote}
        </blockquote>

        {/* Methodology */}
        <div data-reveal className="mb-20">
          <div
            className="font-body text-[0.75rem] tracking-widest uppercase mb-8"
            style={{ color: 'hsl(var(--muted))' }}
          >
            The Four-Stage Methodology
          </div>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: 'hsl(var(--stroke))' }}
          >
            {philosophy.methodology.map((step, i) => (
              <div
                key={i}
                className="p-6"
                style={{ background: 'hsl(var(--bg))' }}
              >
                <div
                  className="font-display text-3xl md:text-4xl font-light mb-4 tabular-nums"
                  style={{ color: 'rgba(137,170,204,0.3)' }}
                >
                  {step.num}
                </div>
                <h3
                  className="font-display italic font-semibold text-xl md:text-2xl mb-3"
                  style={{ color: 'hsl(var(--text))' }}
                >
                  {step.step}
                </h3>
                <p
                  className="font-body text-base leading-relaxed mb-2"
                  style={{ color: 'hsl(var(--text) / 0.7)' }}
                >
                  {step.preview}
                </p>
                <p
                  className="font-body text-base leading-[1.65]"
                  style={{ color: 'hsl(var(--muted))' }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Beliefs */}
        <div>
          <div
            className="font-body text-[0.75rem] tracking-widest uppercase mb-8"
            style={{ color: 'hsl(var(--muted))' }}
          >
            Beliefs That Shape Every Engagement
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {philosophy.beliefs.map((belief, i) => (
              <div
                key={i}
                data-reveal
                className="p-6 border-t-2"
                style={{
                  borderImage: 'linear-gradient(90deg, #89AACC, #4E85BF) 1',
                  background: 'rgba(137,170,204,0.03)',
                }}
              >
                <h4
                  className="font-display italic font-semibold text-xl mb-3"
                  style={{ color: 'hsl(var(--text))' }}
                >
                  {belief.title}
                </h4>
                <p
                  className="font-body text-base leading-relaxed"
                  style={{ color: 'hsl(var(--text) / 0.6)' }}
                >
                  {belief.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
