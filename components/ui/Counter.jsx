'use client'

import { useEffect, useRef, useState } from 'react'

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

export default function Counter({ target, duration = 1800, suffix = '' }) {
  const [count, setCount] = useState(0)
  const elRef = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            setCount(Math.round(easeOutCubic(progress) * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.6 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return (
    <span ref={elRef} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}
