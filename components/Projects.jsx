'use client'

import { useRef, useEffect, useState } from 'react'
import { projects, clients, speaking } from '@/lib/data'
import Ticker from '@/components/ui/Ticker'

const COL_SPANS = [7, 5, 5, 7]

export default function Projects() {
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
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    items.forEach((item, i) => {
      item.style.opacity = '0'
      item.style.transform = 'translateY(24px)'
      item.style.transition = `opacity 0.75s ${i * 0.07}s cubic-bezier(0.16,1,0.3,1), transform 0.75s ${i * 0.07}s cubic-bezier(0.16,1,0.3,1)`
      obs.observe(item)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-28 md:py-36" style={{ background: 'hsl(var(--bg))' }}>
      <div className="px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto mb-16">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px" style={{ background: 'hsl(var(--stroke))' }} />
          <span className="sec-num">07</span>
        </div>
        <div className="mb-14 md:flex md:justify-between md:items-end gap-12">
          <div>
            <h2
              data-reveal
              className="font-display font-semibold leading-[1.2] mb-4"
              style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'hsl(var(--text))' }}
            >
              Featured{' '}
              <em className="font-display italic font-normal">projects</em>
            </h2>
            <p
              data-reveal
              className="font-body text-base leading-[1.65] max-w-xl"
              style={{ color: 'hsl(var(--muted))' }}
            >
              Selected engagements illustrating scope, depth, and the organizational trust that takes years to earn.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <BentoCard
              key={i}
              project={project}
              index={i}
              colSpan={COL_SPANS[i % COL_SPANS.length]}
            />
          ))}
        </div>
      </div>

      {/* Client ticker */}
      <div
        className="py-10 border-t border-b"
        style={{ borderColor: 'hsl(var(--stroke))' }}
      >
        <div className="mb-4 px-8 md:px-16 lg:px-20 xl:px-28">
          <span
            className="font-body text-[0.72rem] tracking-widest uppercase"
            style={{ color: 'hsl(var(--muted))' }}
          >
            Clients
          </span>
        </div>
        <Ticker items={clients} speed="normal" />
      </div>

      {/* Speaking ticker */}
      <div className="py-8 border-b" style={{ borderColor: 'hsl(var(--stroke))' }}>
        <div className="mb-4 px-8 md:px-16 lg:px-20 xl:px-28">
          <span
            className="font-body text-[0.72rem] tracking-widest uppercase"
            style={{ color: 'hsl(var(--muted))' }}
          >
            Speaking &amp; Media
          </span>
        </div>
        <Ticker items={speaking} speed="fast" />
      </div>
    </section>
  )
}

function BentoCard({ project, index, colSpan }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      data-reveal
      className="group relative overflow-hidden rounded-3xl flex flex-col"
      style={{
        gridColumn: `span ${colSpan}`,
        background: hover ? 'hsl(var(--surface))' : 'hsl(var(--surface))',
        border: `1px solid ${hover ? '#89AACC' : 'hsl(var(--stroke))'}`,
        minHeight: 260,
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Halftone overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
          opacity: 0.8,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Number watermark */}
      <div
        className="absolute top-4 right-6 font-display font-light tabular-nums leading-none pointer-events-none select-none"
        style={{ fontSize: '5rem', color: 'rgba(137,170,204,0.06)' }}
        aria-hidden
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
        <div
          className="font-body text-[0.68rem] tracking-widest uppercase mb-3 transition-colors duration-300"
          style={{ color: hover ? '#89AACC' : 'hsl(var(--muted))' }}
        >
          {project.client}
        </div>

        <h3
          className="font-display italic font-semibold leading-snug mb-4 flex-1"
          style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: 'hsl(var(--text))' }}
        >
          {project.title}
        </h3>

        <p
          className="font-body text-base leading-[1.65] mb-2"
          style={{ color: 'hsl(var(--text) / 0.7)' }}
        >
          {project.preview}
        </p>
        <p
          className="font-body text-sm leading-[1.6]"
          style={{ color: 'hsl(var(--muted))' }}
        >
          {project.body}
        </p>

        {/* Hover pill */}
        {hover && (
          <div className="mt-6 self-start">
            <span className="relative inline-flex rounded-full overflow-hidden">
              <span
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, #89AACC, #4E85BF)' }}
              />
              <span
                className="relative font-body text-xs px-4 py-2 m-[1px] rounded-full"
                style={{ background: 'hsl(var(--bg))', color: 'hsl(var(--text))' }}
              >
                View —{' '}
                <em className="font-display italic">{project.title}</em>
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Bottom gradient line on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-300"
        style={{
          background: 'linear-gradient(90deg, #89AACC, #4E85BF)',
          opacity: hover ? 1 : 0,
        }}
      />
    </div>
  )
}
