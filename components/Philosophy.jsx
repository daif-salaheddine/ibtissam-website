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
      style={{ background: 'transparent' }}
    >
      <div className="px-8 md:px-16 lg:px-24 xl:px-32 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="sec-num">06</span>
        </div>
        <h2
          data-reveal
          className="font-cormorant font-light leading-tight mb-16 max-w-xl"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: '#221F1C' }}
        >
          How I <em>think about learning</em>
        </h2>

        {/* Pull quote */}
        <blockquote
          data-reveal
          className="font-cormorant italic font-light leading-relaxed mb-20 max-w-3xl"
          style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', color: '#6B6560' }}
        >
          <span
            className="block w-6 h-[2px] mb-6"
            style={{ background: '#D9920E' }}
            aria-hidden
          />
          {philosophy.quote}
        </blockquote>

        {/* Methodology */}
        <div data-reveal className="mb-20">
          <div className="font-mono text-[0.6rem] tracking-[0.25em] uppercase mb-8" style={{ color: '#9B968F' }}>
            The Four-Stage Methodology
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(34,31,28,0.05)' }}>
            {philosophy.methodology.map((step, i) => (
              <div
                key={i}
                className="p-6"
                style={{ background: '#F8F5EE' }}
              >
                <div
                  className="font-mono text-3xl md:text-4xl font-light mb-4 tabular-nums"
                  style={{ color: 'rgba(217,146,14,0.28)' }}
                >
                  {step.num}
                </div>
                <h3
                  className="font-cormorant font-semibold text-xl md:text-2xl mb-3"
                  style={{ color: '#221F1C' }}
                >
                  {step.step}
                </h3>
                <p className="font-dm text-base leading-relaxed mb-2" style={{ color: '#6B6560' }}>
                  {step.preview}
                </p>
                <p className="font-dm text-sm leading-relaxed" style={{ color: '#9B968F' }}>
                  {step.body}
                </p>
                {i < 3 && (
                  <div
                    className="hidden lg:flex justify-end items-center mt-4"
                    style={{ color: 'rgba(217,146,14,0.35)' }}
                    aria-hidden
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Beliefs */}
        <div>
          <div className="font-mono text-[0.6rem] tracking-[0.25em] uppercase mb-8" style={{ color: '#9B968F' }}>
            Beliefs That Shape Every Engagement
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            {philosophy.beliefs.map((belief, i) => (
              <div
                key={i}
                data-reveal
                className="p-6 border-t-2"
                style={{
                  borderColor: 'rgba(217,146,14,0.3)',
                  background: 'rgba(217,146,14,0.04)',
                }}
              >
                <h4
                  className="font-cormorant font-semibold text-xl mb-3"
                  style={{ color: '#221F1C' }}
                >
                  {belief.title}
                </h4>
                <p className="font-dm text-base leading-relaxed" style={{ color: '#6B6560' }}>
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
