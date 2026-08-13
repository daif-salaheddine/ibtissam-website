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
      className="py-32 md:py-40 relative overflow-hidden"
      style={{ background: '#000000' }}
    >
      <div className="relative z-10 px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto w-full">

        {/* Sec label */}
        <div data-reveal className="flex items-center gap-4 mb-12">
          <span className="sec-num">08</span>
          <span className="font-pixel text-[0.75rem] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Start a Conversation
          </span>
        </div>

        {/* Two-column */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-24 items-start">

          {/* Left: display name + creds + CTA */}
          <div>
            <div data-reveal className="font-pixel text-[0.75rem] tracking-widest uppercase mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {contact.eyebrow}
            </div>

            <div data-reveal className="mb-6">
              <div className="font-cormorant font-semibold leading-[0.9] block" style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)', color: '#FFFFFF' }}>
                Ibtissam
              </div>
              <div className="font-cormorant italic font-semibold leading-[0.9] block" style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)', color: '#C4973A' }}>
                Daif
              </div>
            </div>

            <p data-reveal className="font-pixel text-[0.72rem] tracking-widest uppercase mb-12" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {contact.creds}
            </p>

            <div data-reveal>
              <MagneticButton
                href={`mailto:${contact.email}`}
                className="btn-outline-light group"
              >
                Start a conversation
              </MagneticButton>
            </div>
          </div>

          {/* Right: quote + contact grid */}
          <div className="flex flex-col justify-center lg:pt-8">
            <blockquote
              data-reveal
              className="font-cormorant italic font-light leading-relaxed mb-12"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: 'rgba(255,255,255,0.65)' }}
            >
              {contact.quote}
            </blockquote>

            <div
              data-reveal
              className="grid grid-cols-2 gap-6 pt-8 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div>
                <div className="font-pixel text-[0.68rem] tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Phone</div>
                <span className="font-dm text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {contact.phone}
                </span>
              </div>
              <div>
                <div className="font-pixel text-[0.68rem] tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Email</div>
                <a href={`mailto:${contact.email}`} className="font-dm text-sm transition-colors duration-300 break-all" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {contact.email}
                </a>
              </div>
              <div>
                <div className="font-pixel text-[0.68rem] tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>LinkedIn</div>
                <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="font-dm text-sm transition-colors duration-300" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {contact.linkedin}
                </a>
              </div>
              <div>
                <div className="font-pixel text-[0.68rem] tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Based Between</div>
                <span className="font-dm text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{contact.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
