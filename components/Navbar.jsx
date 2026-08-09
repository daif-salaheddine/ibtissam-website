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
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      ref={navRef}
      className="fixed top-0 inset-x-0 z-[200] transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(42,34,24,0.08)' : 'none',
      }}
    >
      <div className="px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          onClick={e => scrollTo(e, '#hero')}
          className="font-cormorant text-xl tracking-wide transition-colors duration-500"
          style={{ color: scrolled ? '#2A2218' : '#FFFFFF', fontWeight: 400 }}
        >
          Ibtissam <span style={{ color: '#C4973A' }}>Daif</span>
        </a>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={e => scrollTo(e, href)}
              className="font-mono text-[0.8rem] tracking-[0.16em] uppercase transition-colors duration-300"
              style={{ color: active === href ? '#C4973A' : scrolled ? '#9A8E84' : 'rgba(255,255,255,0.7)' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          onClick={e => scrollTo(e, '#contact')}
          className="hidden md:inline-flex items-center font-mono text-[0.8rem] font-medium tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-300"
          style={{
            border: scrolled ? '1px solid rgba(42,34,24,0.3)' : '1px solid rgba(255,255,255,0.5)',
            color: scrolled ? '#2A2218' : '#FFFFFF',
          }}
        >
          Contact
        </a>

        <MobileMenu />
      </div>
    </header>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)

  const scrollTo = (href) => {
    setOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex flex-col gap-[5px] p-2"
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="block w-6 h-[1.5px] transition-all duration-300"
            style={{
              background: '#2A2218',
              transform: open
                ? i === 0 ? 'translateY(6.5px) rotate(45deg)' : i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'scaleX(0)'
                : 'none',
            }}
          />
        ))}
      </button>

      {open && (
        <div
          className="fixed inset-0 top-16 z-[190] flex flex-col items-center justify-center gap-8"
          style={{ background: 'rgba(245,237,224,0.98)', backdropFilter: 'blur(20px)' }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="font-cormorant text-4xl font-light"
              style={{ color: '#2A2218' }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
