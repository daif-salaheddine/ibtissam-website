'use client'

import { useRef, useEffect } from 'react'
import { contact } from '@/lib/data'
import MagneticButton from '@/components/ui/MagneticButton'

export default function Contact() {
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
      { threshold: 0.1 }
    )
    items.forEach((item, i) => {
      item.style.opacity = '0'
      item.style.transform = 'translateY(24px)'
      item.style.transition = `opacity 0.8s ${i * 0.1}s cubic-bezier(0.16,1,0.3,1), transform 0.8s ${i * 0.1}s cubic-bezier(0.16,1,0.3,1)`
      obs.observe(item)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 md:py-40 min-h-screen flex flex-col justify-center relative overflow-hidden"
      style={{ background: '#0A0806', borderTop: '1px solid rgba(242,235,224,0.05)' }}
    >
      {/* Background name watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-cormorant font-light leading-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(6rem, 22vw, 20rem)',
            color: 'rgba(232,160,32,0.03)',
            letterSpacing: '-0.02em',
          }}
        >
          Ibtissam
        </span>
      </div>

      <div className="relative z-10 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        {/* Section number */}
        <div data-reveal className="flex items-center gap-4 mb-16">
          <span className="sec-num">08</span>
          <div className="h-[1px] w-8" style={{ background: 'rgba(242,235,224,0.08)' }} />
          <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: '#6B6055' }}>
            Start a Conversation
          </span>
        </div>

        {/* Eyebrow */}
        <div
          data-reveal
          className="font-mono text-[0.6rem] tracking-[0.25em] uppercase mb-6"
          style={{ color: '#6B6055' }}
        >
          {contact.eyebrow}
        </div>

        {/* Display name */}
        <div data-reveal className="mb-6">
          <div
            className="font-cormorant font-light leading-[0.9] block"
            style={{ fontSize: 'clamp(4rem, 14vw, 13rem)', color: '#F2EBE0' }}
          >
            Ibtissam
          </div>
          <div
            className="font-cormorant italic font-semibold leading-[0.9] block"
            style={{ fontSize: 'clamp(4rem, 14vw, 13rem)', color: '#E8A020' }}
          >
            Daif
          </div>
        </div>

        {/* Credentials */}
        <p
          data-reveal
          className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-8"
          style={{ color: '#6B6055' }}
        >
          {contact.creds}
        </p>

        {/* Quote */}
        <blockquote
          data-reveal
          className="font-cormorant italic font-light leading-relaxed mb-12 max-w-2xl"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: '#A89B88' }}
        >
          {contact.quote}
        </blockquote>

        {/* CTA */}
        <div data-reveal className="mb-16">
          <MagneticButton
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-4 px-10 py-4 border font-mono text-[0.65rem] tracking-[0.2em] uppercase transition-all duration-400 hover:bg-amber hover:text-bg hover:border-amber group"
            style={{ color: '#E8A020', borderColor: 'rgba(232,160,32,0.4)' }}
          >
            Start a conversation
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </MagneticButton>
        </div>

        {/* Contact grid */}
        <div
          data-reveal
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t"
          style={{ borderColor: 'rgba(242,235,224,0.07)' }}
        >
          <div>
            <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase mb-2" style={{ color: '#6B6055' }}>
              Phone
            </div>
            <a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="font-dm text-sm transition-colors duration-300 hover:text-amber"
              style={{ color: '#F2EBE0' }}
            >
              {contact.phone}
            </a>
          </div>
          <div>
            <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase mb-2" style={{ color: '#6B6055' }}>
              Email
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="font-dm text-sm transition-colors duration-300 hover:text-amber break-all"
              style={{ color: '#F2EBE0' }}
            >
              {contact.email}
            </a>
          </div>
          <div>
            <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase mb-2" style={{ color: '#6B6055' }}>
              LinkedIn
            </div>
            <a
              href={`https://${contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-dm text-sm transition-colors duration-300 hover:text-amber"
              style={{ color: '#F2EBE0' }}
            >
              {contact.linkedin}
            </a>
          </div>
          <div>
            <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase mb-2" style={{ color: '#6B6055' }}>
              Based Between
            </div>
            <span className="font-dm text-sm" style={{ color: '#F2EBE0' }}>
              {contact.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
