'use client'

export default function Ticker({ items, speed = 'normal', className = '' }) {
  const doubled = [...items, ...items]

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div className={`inline-flex ${speed === 'fast' ? 'animate-ticker-fast' : 'animate-ticker'}`}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-baseline gap-3 mx-8">
            <span className="font-cormorant text-xl md:text-2xl font-light" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {item.name}
            </span>
            <span className="font-pixel text-[0.55rem] tracking-widest uppercase" style={{ color: 'rgba(196,151,58,0.7)' }}>
              {item.category}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)', marginLeft: 24 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
