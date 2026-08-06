'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const posRef = useRef({ x: -100, y: -100 })
  const followRef = useRef({ x: -100, y: -100 })
  const hovering = useRef(false)
  const rafRef = useRef(null)

  useEffect(() => {
    // Only show on desktop hover-capable devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseEnterHoverable = () => { hovering.current = true }
    const onMouseLeaveHoverable = () => { hovering.current = false }

    document.addEventListener('mousemove', onMouseMove, { passive: true })

    // Attach to hover targets
    const attachHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterHoverable)
        el.addEventListener('mouseleave', onMouseLeaveHoverable)
      })
    }
    attachHover()

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      followRef.current.x = lerp(followRef.current.x, posRef.current.x, 0.10)
      followRef.current.y = lerp(followRef.current.y, posRef.current.y, 0.10)

      // Dot snaps
      dot.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`

      // Ring follows with lag
      ring.style.transform = `translate(${followRef.current.x}px, ${followRef.current.y}px) translate(-50%, -50%) scale(${hovering.current ? 1.8 : 1})`
      ring.style.opacity = hovering.current ? '0.4' : '0.6'

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove', onMouseMove)
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterHoverable)
        el.removeEventListener('mouseleave', onMouseLeaveHoverable)
      })
    }
  }, [])

  return (
    <>
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] will-change-transform"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#E8A020',
        }}
      />
      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9996] will-change-transform transition-opacity duration-300"
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: '1px solid #E8A020',
          transition: 'transform 0.15s ease-out, opacity 0.3s',
        }}
      />
    </>
  )
}
