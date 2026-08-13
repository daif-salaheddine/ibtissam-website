'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WORDS = ['Educate', 'Develop', 'Inspire', 'Transform']
const TOTAL_DURATION = 2700

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [labelVisible, setLabelVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLabelVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % WORDS.length)
    }, 900)
    return () => clearInterval(interval)
  }, [])

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
        setTimeout(onComplete, 400)
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
      className="fixed inset-0 z-[9999] flex flex-col select-none overflow-hidden"
      style={{ background: 'hsl(var(--bg))' }}
    >
      {/* Top-left: Portfolio label */}
      <motion.div
        className="absolute top-6 left-6 md:top-8 md:left-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        <span
          className="text-xs uppercase tracking-[0.3em]"
          style={{ color: 'hsl(var(--muted))' }}
        >
          Portfolio
        </span>
      </motion.div>

      {/* Center: cycling words */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="font-display italic text-5xl md:text-7xl lg:text-8xl"
            style={{ color: 'hsl(var(--text) / 0.8)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom-right: counter */}
      <div className="absolute bottom-8 right-6 md:bottom-12 md:right-10">
        <span
          className="font-display text-7xl md:text-9xl tabular-nums"
          style={{ color: 'hsl(var(--text))' }}
        >
          {String(count).padStart(3, '0')}
        </span>
      </div>

      {/* Bottom progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: 'hsl(var(--stroke) / 0.5)' }}
      >
        <div
          className="h-full accent-gradient origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            transition: 'transform 0.05s linear',
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
        />
      </div>
    </motion.div>
  )
}
