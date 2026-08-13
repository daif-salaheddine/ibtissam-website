'use client'

import { useRef, useEffect, useState } from 'react'
import { contact } from '@/lib/data'

const MARQUEE_TEXT = 'EDUCATING · CONSULTING · DEVELOPING · TRANSFORMING · '

export default function Contact() {
  const sectionRef = useRef(null)
  const marqueeRef = useRef(null)

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

  useEffect(() => {
    if (!marqueeRef.current) return
    let tween
    const run = async () => {
      const { gsap } = await import('gsap')
      tween = gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      })
    }
    run()
    return () => tween?.kill()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="pt-24 pb-0 relative overflow-hidden"
      style={{ background: 'hsl(var(--bg))' }}
    >
      {/* GSAP Marquee */}
      <div className="overflow-hidden mb-16 border-t border-b py-6" style={{ borderColor: 'hsl(var(--stroke))' }}>
        <div
          ref={marqueeRef}
          className="whitespace-nowrap font-display italic leading-none select-none"
          style={{
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            color: 'hsl(var(--stroke))',
          }}
        >
          {MARQUEE_TEXT.repeat(10)}
        </div>
      </div>

      <div className="relative z-10 px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto w-full pb-32">

        {/* Sec label */}
        <div data-reveal className="flex items-center gap-4 mb-12">
          <span className="sec-num">08</span>
          <span
            className="font-body text-[0.75rem] tracking-widest uppercase"
            style={{ color: 'hsl(var(--muted))' }}
          >
            Start a Conversation
          </span>
        </div>

        {/* Two-column */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-24 items-start">

          {/* Left: name + creds + CTA */}
          <div>
            <div
              data-reveal
              className="font-body text-[0.75rem] tracking-widest uppercase mb-6"
              style={{ color: 'hsl(var(--muted))' }}
            >
              {contact.eyebrow}
            </div>

            <div data-reveal className="mb-6">
              <div
                className="font-display font-semibold leading-[0.9] block"
                style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)', color: 'hsl(var(--text))' }}
              >
                Ibtissam
              </div>
              <div
                className="font-display italic font-semibold leading-[0.9] block accent-text"
                style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)' }}
              >
                Daif
              </div>
            </div>

            <p
              data-reveal
              className="font-body text-[0.72rem] tracking-widest uppercase mb-12"
              style={{ color: 'hsl(var(--muted))' }}
            >
              {contact.creds}
            </p>

            <div data-reveal>
              <EmailButton href={`mailto:${contact.email}`}>
                Start a conversation ↗
              </EmailButton>
            </div>
          </div>

          {/* Right: quote + contact grid */}
          <div className="flex flex-col justify-center lg:pt-8">
            <blockquote
              data-reveal
              className="font-display italic font-light leading-relaxed mb-12"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: 'hsl(var(--text) / 0.65)' }}
            >
              {contact.quote}
            </blockquote>

            <div
              data-reveal
              className="grid grid-cols-2 gap-6 pt-8 border-t"
              style={{ borderColor: 'hsl(var(--stroke))' }}
            >
              <div>
                <div
                  className="font-body text-[0.68rem] tracking-widest uppercase mb-2"
                  style={{ color: 'hsl(var(--muted) / 0.7)' }}
                >
                  Phone
                </div>
                <span
                  className="font-body text-sm"
                  style={{ color: 'hsl(var(--text) / 0.75)' }}
                >
                  {contact.phone}
                </span>
              </div>
              <div>
                <div
                  className="font-body text-[0.68rem] tracking-widest uppercase mb-2"
                  style={{ color: 'hsl(var(--muted) / 0.7)' }}
                >
                  Email
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-body text-sm transition-colors duration-300 break-all"
                  style={{ color: 'hsl(var(--text) / 0.75)' }}
                >
                  {contact.email}
                </a>
              </div>
              <div>
                <div
                  className="font-body text-[0.68rem] tracking-widest uppercase mb-2"
                  style={{ color: 'hsl(var(--muted) / 0.7)' }}
                >
                  LinkedIn
                </div>
                <a
                  href={`https://${contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm transition-colors duration-300"
                  style={{ color: 'hsl(var(--text) / 0.75)' }}
                >
                  {contact.linkedin}
                </a>
              </div>
              <div>
                <div
                  className="font-body text-[0.68rem] tracking-widest uppercase mb-2"
                  style={{ color: 'hsl(var(--muted) / 0.7)' }}
                >
                  Based Between
                </div>
                <span
                  className="font-body text-sm"
                  style={{ color: 'hsl(var(--text) / 0.75)' }}
                >
                  {contact.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function EmailButton({ href, children }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative inline-flex">
      {isHovered && (
        <span
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: -2,
            background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
          }}
        />
      )}
      <a
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 inline-flex items-center gap-2 rounded-full font-body font-medium text-sm px-7 py-3.5 transition-transform duration-200"
        style={{
          background: 'hsl(var(--surface))',
          color: 'hsl(var(--text))',
          border: isHovered ? 'none' : '2px solid hsl(var(--stroke))',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {children}
      </a>
    </div>
  )
}
