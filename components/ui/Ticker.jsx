'use client'

export default function Ticker({ items, speed = 'normal', className = '' }) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div
        className={`inline-flex ${speed === 'fast' ? 'animate-ticker-fast' : 'animate-ticker'}`}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-baseline gap-3 mx-8">
            <span className="font-cormorant text-xl md:text-2xl font-light" style={{ color: '#F2EBE0' }}>
              {item.name}
            </span>
            <span className="font-mono text-[0.5rem] tracking-[0.2em] uppercase" style={{ color: '#E8A020' }}>
              {item.category}
            </span>
            <span style={{ color: '#9E908A', marginLeft: 24 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
