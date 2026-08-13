'use client'

export default function Ticker({ items, speed = 'normal', className = '' }) {
  const doubled = [...items, ...items]

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div className={`inline-flex ${speed === 'fast' ? 'animate-ticker-fast' : 'animate-ticker'}`}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-baseline gap-3 mx-8">
            <span
              className="font-display italic text-xl md:text-2xl font-light"
              style={{ color: 'hsl(var(--text) / 0.85)' }}
            >
              {item.name}
            </span>
            <span
              className="font-body text-[0.55rem] tracking-widest uppercase"
              style={{ color: 'hsl(var(--muted))' }}
            >
              {item.category}
            </span>
            <span style={{ color: 'hsl(var(--stroke))', marginLeft: 24 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
