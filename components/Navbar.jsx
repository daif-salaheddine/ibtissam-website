'use client'

import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Work', href: '#masterclasses' },
  { label: 'Story', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href)).filter(Boolean)
    if (!sections.length) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id) }),
      { threshold: 0.3 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, menuOpen ? 300 : 0)
  }

  return (
    <header
      ref={navRef}
      className="fixed top-0 inset-x-0 z-[200] transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="px-5 sm:px-6 md:px-10 lg:px-14 max-w-[1800px] mx-auto h-16 flex items-center justify-between">

        {/* Brand */}
        <a
          href="#hero"
          onClick={e => scrollTo(e, '#hero')}
          className="font-cormorant text-xl tracking-wide transition-colors duration-500"
          style={{ color: '#FFFFFF', fontWeight: 400 }}
        >
          Ibtissam <span style={{ color: '#C4973A' }}>Daif</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={e => scrollTo(e, href)}
              className="font-pixel text-[0.75rem] tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{ color: active === href ? '#C4973A' : 'rgba(255,255,255,0.7)' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          onClick={e => scrollTo(e, '#contact')}
          className="hidden md:inline-flex items-center font-pixel text-[0.75rem] tracking-widest uppercase px-5 py-2.5 transition-all duration-300"
          style={{
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#FFFFFF',
          }}
        >
          Contact
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 hover:opacity-70 transition-opacity"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          style={{ color: '#FFFFFF' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <div
        className="fixed inset-0 z-50 flex flex-col transition-all duration-500"
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
          background: 'rgba(0,0,0,0.97)',
          backdropFilter: 'blur(16px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <span className="font-cormorant text-xl" style={{ color: '#FFFFFF', fontWeight: 400 }}>
            Ibtissam <span style={{ color: '#C4973A' }}>Daif</span>
          </span>
          <button
            className="p-2 hover:opacity-70 transition-opacity"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{ color: '#FFFFFF' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center flex-1 gap-8">
          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={href}
              href={href}
              onClick={e => scrollTo(e, href)}
              className="font-cormorant text-4xl font-light transition-all duration-500"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: menuOpen ? `${100 + i * 60}ms` : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                color: '#FFFFFF',
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
