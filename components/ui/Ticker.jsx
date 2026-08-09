'use client'

export default function Ticker({ items, speed = 'normal', className = '' }) {
  const doubled = [...items, ...items]

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div className={`inline-flex ${speed === 'fast' ? 'animate-ticker-fast' : 'animate-ticker'}`}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-baseline gap-3 mx-8">
            <span className="font-cormorant text-xl md:text-2xl font-light" style={{ color: '#2A2218' }}>
              {item.name}
            </span>
            <span className="font-mono text-[0.5rem] tracking-[0.2em] uppercase" style={{ color: '#8A6820' }}>
              {item.category}
            </span>
            <span style={{ color: '#9A8E84', marginLeft: 24 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
