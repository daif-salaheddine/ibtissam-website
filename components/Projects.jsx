'use client'

import { useRef, useEffect, useState } from 'react'
import { projects, clients, speaking } from '@/lib/data'
import Ticker from '@/components/ui/Ticker'

function useReveal(ref) {
  useEffect(() => {
    const el = ref.current
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
}

export default function Projects() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section id="projects" ref={sectionRef} className="py-28 md:py-36" style={{ background: '#F5EDE0' }}>
      <div className="px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto mb-16">
        <div className="flex items-center gap-4 mb-6">
          <span className="sec-num">07</span>
        </div>
        <h2 data-reveal className="font-cormorant font-light leading-tight mb-4" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: '#2A2218' }}>
          Credibility built <em>through practice</em>
        </h2>
        <p data-reveal className="font-dm text-sm leading-relaxed mb-14 max-w-xl" style={{ color: '#9A8E84' }}>
          Selected engagements illustrating scope, depth, and the organizational trust that takes years to earn.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(42,34,24,0.07)' }}>
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Client ticker */}
      <div className="py-10 border-t border-b" style={{ borderColor: 'rgba(42,34,24,0.08)' }}>
        <div className="mb-4 px-8 md:px-16 lg:px-20 xl:px-28">
          <span className="font-mono text-[0.55rem] tracking-[0.25em] uppercase" style={{ color: '#9A8E84' }}>Clients</span>
        </div>
        <Ticker items={clients} speed="normal" />
      </div>

      {/* Speaking ticker */}
      <div className="py-8 border-b" style={{ borderColor: 'rgba(42,34,24,0.08)' }}>
        <div className="mb-4 px-8 md:px-16 lg:px-20 xl:px-28">
          <span className="font-mono text-[0.55rem] tracking-[0.25em] uppercase" style={{ color: '#9A8E84' }}>Speaking &amp; Media</span>
        </div>
        <Ticker items={speaking} speed="fast" />
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      data-reveal
      className="p-6 md:p-8 flex flex-col transition-all duration-400 relative overflow-hidden"
      style={{
        background: hover ? '#EDE3D4' : '#F5EDE0',
        minHeight: index < 2 ? 280 : 220,
        cursor: 'default',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="absolute top-4 right-4 font-cormorant font-light tabular-nums leading-none pointer-events-none"
        style={{ fontSize: '4rem', color: 'rgba(196,151,58,0.08)' }}
        aria-hidden
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="font-mono text-[0.52rem] tracking-[0.2em] uppercase mb-3 transition-colors duration-300" style={{ color: hover ? '#C4973A' : '#9A8E84' }}>
        {project.client}
      </div>

      <h3 className="font-cormorant font-semibold leading-snug mb-3 flex-1" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: '#2A2218' }}>
        {project.title}
      </h3>

      <p className="font-dm text-sm leading-relaxed mb-2" style={{ color: '#5A5048' }}>{project.preview}</p>
      <p className="font-dm text-xs leading-relaxed" style={{ color: '#9A8E84' }}>{project.body}</p>

      <div
        className="absolute bottom-0 left-0 h-[1px] transition-all duration-500"
        style={{ background: '#C4973A', width: hover ? '100%' : '0%' }}
      />
    </div>
  )
}
