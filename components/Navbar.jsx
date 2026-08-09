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
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      ref={navRef}
      className="fixed top-0 inset-x-0 z-[200] transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(1.5)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(34,31,28,0.07)' : 'none',
      }}
    >
      <div className="px-8 md:px-16 lg:px-24 xl:px-32 max-w-[1800px] mx-auto h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          onClick={e => scrollTo(e, '#hero')}
          className="font-cormorant text-xl font-semibold tracking-wide"
          style={{ color: '#221F1C' }}
        >
          Ibtissam<span style={{ color: '#D9920E' }}>.</span>
        </a>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={e => scrollTo(e, href)}
              className="font-mono text-[0.62rem] tracking-[0.22em] uppercase transition-colors duration-300"
              style={{
                color: active === href ? '#D9920E' : '#9B968F',
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          onClick={e => scrollTo(e, '#contact')}
          className="hidden md:flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.18em] uppercase px-5 py-2 rounded-full transition-all duration-300 hover:opacity-80"
          style={{
            background: '#221F1C',
            color: '#FFFFFF',
          }}
        >
          Contact
        </a>

        {/* Mobile hamburger */}
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
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
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
              background: '#221F1C',
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
          style={{ background: 'rgba(243,241,236,0.97)', backdropFilter: 'blur(20px)' }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="font-cormorant text-4xl font-light"
              style={{ color: '#221F1C' }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
