'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const NAME = 'IBTISSAM DAIF'
const TOTAL_DURATION = 2400

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / TOTAL_DURATION, 1)
      const eased = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress
      const current = Math.floor(eased * 100)
      setCount(current)
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setCount(100)
        setTimeout(onComplete, 180)
      }
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
      style={{ background: '#F5EDE0' }}
    >
      <div
        className="font-mono text-[12vw] md:text-[8vw] leading-none tabular-nums"
        style={{ color: '#2A2218' }}
      >
        {String(count).padStart(2, '0')}
      </div>

      <div
        className="mt-6 font-cormorant tracking-[0.18em] text-[5vw] md:text-[3vw] uppercase"
        style={{ color: '#2A2218' }}
        aria-label={NAME}
      >
        {NAME.split('').map((char, i) => {
          const threshold = char === ' ' ? 40 : Math.floor((i / NAME.length) * 85) + 10
          return (
            <span
              key={i}
              className="inline-block transition-opacity duration-500"
              style={{ opacity: count >= threshold ? 1 : 0, transitionDelay: `${i * 20}ms` }}
            >
              {char === ' ' ? ' ' : char}
            </span>
          )
        })}
      </div>

      <div
        className="absolute bottom-10 font-mono text-[0.6rem] tracking-[0.3em] uppercase"
        style={{ color: '#9A8E84' }}
      >
        Education &amp; Workforce Development Consultant
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{ background: '#C4973A' }}
        initial={{ width: '0%' }}
        animate={{ width: `${count}%` }}
        transition={{ duration: 0.05 }}
      />
    </motion.div>
  )
}
