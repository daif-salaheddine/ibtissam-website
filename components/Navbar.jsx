'use client'

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Home',    href: '#hero' },
  { label: 'About',   href: '#about' },
  { label: 'Work',    href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href, label) => {
    e.preventDefault()
    setActive(label)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
      aria-label="Primary navigation"
    >
      <div
        className="inline-flex items-center rounded-full backdrop-blur-md border px-2 py-2 transition-shadow duration-300"
        style={{
          background: 'hsl(var(--surface))',
          borderColor: 'hsl(var(--stroke))',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Logo ring */}
        <LogoRing />

        {/* Divider */}
        <div
          className="hidden sm:block w-px h-5 mx-1"
          style={{ background: 'hsl(var(--stroke))' }}
        />

        {/* Nav links */}
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={(e) => handleNav(e, href, label)}
            className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200"
            style={{
              color: active === label ? 'hsl(var(--text))' : 'hsl(var(--muted))',
              background: active === label ? 'hsl(var(--stroke) / 0.5)' : 'transparent',
            }}
            onMouseEnter={e => {
              if (active !== label) {
                e.currentTarget.style.color = 'hsl(var(--text))'
                e.currentTarget.style.background = 'hsl(var(--stroke) / 0.3)'
              }
            }}
            onMouseLeave={e => {
              if (active !== label) {
                e.currentTarget.style.color = 'hsl(var(--muted))'
                e.currentTarget.style.background = 'transparent'
              }
            }}
          >
            {label}
          </a>
        ))}

        {/* Divider */}
        <div
          className="hidden sm:block w-px h-5 mx-1"
          style={{ background: 'hsl(var(--stroke))' }}
        />

        {/* Say hi button */}
        <SayHiButton />
      </div>
    </nav>
  )
}

function LogoRing() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative w-9 h-9 flex-shrink-0 mr-1 cursor-pointer transition-transform duration-200"
      style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient ring */}
      <div
        className="absolute inset-0 rounded-full p-[1.5px]"
        style={{
          background: hovered
            ? 'linear-gradient(270deg, #89AACC 0%, #4E85BF 100%)'
            : 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
          transition: 'background 0.3s',
        }}
      >
        {/* Inner circle */}
        <div
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{ background: 'hsl(var(--bg))' }}
        >
          <span
            className="font-display italic select-none leading-none"
            style={{ fontSize: 13, color: 'hsl(var(--text))' }}
          >
            ID
          </span>
        </div>
      </div>
    </div>
  )
}

function SayHiButton() {
  const [hovered, setHovered] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative ml-1">
      {/* Gradient ring (shows on hover) */}
      {hovered && (
        <span
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: -2,
            background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
          }}
        />
      )}
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-md transition-colors duration-200 z-10"
        style={{
          background: 'hsl(var(--surface))',
          color: hovered ? 'hsl(var(--text))' : 'hsl(var(--muted))',
        }}
      >
        Say hi ↗
      </button>
    </div>
  )
}
