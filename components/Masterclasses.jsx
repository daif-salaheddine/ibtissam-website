'use client'

import { useEffect, useRef } from 'react'
import { masterclasses } from '@/lib/data'

export default function Masterclasses() {
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    items.forEach((item, i) => {
      item.style.opacity = '0'
      item.style.transform = 'translateY(28px)'
      item.style.transition = `opacity 0.8s ${i * 0.12}s cubic-bezier(0.16,1,0.3,1), transform 0.8s ${i * 0.12}s cubic-bezier(0.16,1,0.3,1)`
      obs.observe(item)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="masterclasses"
      ref={sectionRef}
      className="py-28 md:py-36"
      style={{ background: '#080706', borderTop: '1px solid rgba(242,235,224,0.07)' }}
    >
      <div className="px-8 md:px-16 lg:px-24 xl:px-32 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="sec-num">03</span>
        </div>
        <h2
          data-reveal
          className="font-cormorant font-light leading-tight mb-4"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: '#F2EBE0' }}
        >
          Signature <em>masterclasses</em>
        </h2>
        <p
          data-reveal
          className="font-dm text-base md:text-lg max-w-2xl leading-relaxed mb-16"
          style={{ color: '#6B6055' }}
        >
          Two flagship programs. Available in English, French, and Arabic.
        </p>

        {/* Two-column grid */}
        <div className="grid md:grid-cols-2 gap-px" style={{ background: 'rgba(242,235,224,0.07)' }}>
          {masterclasses.map((mc, i) => (
            <div
              key={i}
              data-reveal
              className="p-10 md:p-14 flex flex-col"
              style={{ background: '#080706' }}
            >
              {/* Tag */}
              <div
                className="font-mono text-[0.55rem] tracking-[0.22em] uppercase mb-6"
                style={{ color: '#E8A020' }}
              >
                {mc.num} — {mc.tag}
              </div>

              {/* Title */}
              <h3
                className="font-cormorant font-semibold leading-tight mb-6"
                style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', color: '#F2EBE0' }}
              >
                {mc.title}
              </h3>

              {/* Divider */}
              <div
                className="w-8 h-[1px] mb-8"
                style={{ background: 'rgba(232,160,32,0.3)' }}
              />

              {/* Preview */}
              <p
                className="font-dm text-base md:text-lg leading-relaxed mb-4 flex-1"
                style={{ color: '#A89B88' }}
              >
                {mc.preview}
              </p>
              <p
                className="font-dm text-sm leading-relaxed mb-10"
                style={{ color: '#6B6055' }}
              >
                {mc.body}
              </p>

              {/* Chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {mc.chips.map(chip => (
                  <span
                    key={chip}
                    className="font-mono text-[0.52rem] tracking-[0.15em] uppercase px-3 py-1.5"
                    style={{
                      color: '#A06B10',
                      background: 'rgba(232,160,32,0.07)',
                      border: '1px solid rgba(232,160,32,0.18)',
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Languages */}
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[0.52rem] tracking-[0.2em] uppercase"
                  style={{ color: '#6B6055' }}
                >
                  Delivered in
                </span>
                {mc.langs.map(lang => (
                  <span
                    key={lang}
                    className="font-mono text-[0.58rem] tracking-[0.12em] px-2 py-1"
                    style={{
                      color: '#F2EBE0',
                      border: '1px solid rgba(242,235,224,0.15)',
                    }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
