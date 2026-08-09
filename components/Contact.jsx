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
      style={{ background: 'transparent' }}
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
            color: 'rgba(217,146,14,0.04)',
            letterSpacing: '-0.02em',
          }}
        >
          Ibtissam
        </span>
      </div>

      <div className="relative z-10 px-8 md:px-16 lg:px-24 xl:px-32 max-w-[1800px] mx-auto w-full">
        {/* Section number */}
        <div data-reveal className="flex items-center gap-4 mb-16">
          <span className="sec-num">08</span>
          <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: '#9B968F' }}>
            Start a Conversation
          </span>
        </div>

        {/* Eyebrow */}
        <div
          data-reveal
          className="font-mono text-[0.6rem] tracking-[0.25em] uppercase mb-6"
          style={{ color: '#9B968F' }}
        >
          {contact.eyebrow}
        </div>

        {/* Display name */}
        <div data-reveal className="mb-6">
          <div
            className="font-cormorant font-light leading-[0.9] block"
            style={{ fontSize: 'clamp(4rem, 14vw, 13rem)', color: '#221F1C' }}
          >
            Ibtissam
          </div>
          <div
            className="font-cormorant italic font-semibold leading-[0.9] block"
            style={{ fontSize: 'clamp(4rem, 14vw, 13rem)', color: '#D9920E' }}
          >
            Daif
          </div>
        </div>

        {/* Credentials */}
        <p
          data-reveal
          className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-8"
          style={{ color: '#9B968F' }}
        >
          {contact.creds}
        </p>

        {/* Quote */}
        <blockquote
          data-reveal
          className="font-cormorant italic font-light leading-relaxed mb-12 max-w-2xl"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: '#6B6560' }}
        >
          {contact.quote}
        </blockquote>

        {/* CTA */}
        <div data-reveal className="mb-16">
          <MagneticButton
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-4 px-10 py-4 font-mono text-[0.65rem] tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:opacity-80 group"
            style={{ background: '#221F1C', color: '#FFFFFF', border: 'none' }}
          >
            Start a conversation
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </MagneticButton>
        </div>

        {/* Contact grid */}
        <div
          data-reveal
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t"
          style={{ borderColor: 'rgba(34,31,28,0.08)' }}
        >
          <div>
            <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase mb-2" style={{ color: '#9B968F' }}>
              Phone
            </div>
            <a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="font-dm text-sm transition-colors duration-300 hover:text-amber"
              style={{ color: '#221F1C' }}
            >
              {contact.phone}
            </a>
          </div>
          <div>
            <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase mb-2" style={{ color: '#9B968F' }}>
              Email
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="font-dm text-sm transition-colors duration-300 hover:text-amber break-all"
              style={{ color: '#221F1C' }}
            >
              {contact.email}
            </a>
          </div>
          <div>
            <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase mb-2" style={{ color: '#9B968F' }}>
              LinkedIn
            </div>
            <a
              href={`https://${contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-dm text-sm transition-colors duration-300 hover:text-amber"
              style={{ color: '#221F1C' }}
            >
              {contact.linkedin}
            </a>
          </div>
          <div>
            <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase mb-2" style={{ color: '#9B968F' }}>
              Based Between
            </div>
            <span className="font-dm text-sm" style={{ color: '#221F1C' }}>
              {contact.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
