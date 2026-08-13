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
      style={{ background: 'hsl(var(--bg))' }}
    >
      <div className="px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span className="sec-num">03</span>
        </div>
        <h2
          data-reveal
          className="font-display font-semibold leading-[1.2] mb-4"
          style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'hsl(var(--text))' }}
        >
          Signature{' '}
          <em className="font-display italic font-normal">masterclasses</em>
        </h2>
        <p
          data-reveal
          className="font-body text-base max-w-[600px] leading-[1.65] mb-16"
          style={{ color: 'hsl(var(--muted))' }}
        >
          Two flagship programs. Available in English, French, and Arabic.
        </p>

        <div
          className="grid md:grid-cols-2 gap-px"
          style={{ background: 'hsl(var(--stroke))' }}
        >
          {masterclasses.map((mc, i) => (
            <div
              key={i}
              data-reveal
              className="p-10 md:p-14 flex flex-col rounded-3xl"
              style={{ background: 'hsl(var(--surface))' }}
            >
              <div
                className="font-body text-[0.68rem] tracking-widest uppercase mb-6"
                style={{ color: 'hsl(var(--muted))' }}
              >
                {mc.num} · {mc.tag}
              </div>

              <h3
                className="font-display italic font-semibold leading-[1.3] mb-6"
                style={{ fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)', color: 'hsl(var(--text))' }}
              >
                {mc.title}
              </h3>

              <div
                className="w-8 h-[1px] mb-8"
                style={{ background: 'linear-gradient(90deg, #89AACC, #4E85BF)' }}
              />

              <p
                className="font-body text-base leading-[1.7] mb-4 flex-1 max-w-[600px]"
                style={{ color: 'hsl(var(--text) / 0.75)' }}
              >
                {mc.preview}
              </p>
              <p
                className="font-body text-base leading-[1.65] mb-10 max-w-[600px]"
                style={{ color: 'hsl(var(--muted))' }}
              >
                {mc.body}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {mc.chips.map(chip => (
                  <span
                    key={chip}
                    className="font-body text-[0.65rem] tracking-widest uppercase px-3 py-1.5"
                    style={{
                      color: 'hsl(var(--text) / 0.7)',
                      background: 'hsl(var(--bg))',
                      border: '1px solid hsl(var(--stroke))',
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="font-body text-[0.65rem] tracking-widest uppercase"
                  style={{ color: 'hsl(var(--muted))' }}
                >
                  Delivered in
                </span>
                {mc.langs.map(lang => (
                  <span
                    key={lang}
                    className="font-body text-[0.65rem] tracking-widest px-2 py-1"
                    style={{
                      color: 'hsl(var(--text) / 0.7)',
                      border: '1px solid hsl(var(--stroke))',
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
