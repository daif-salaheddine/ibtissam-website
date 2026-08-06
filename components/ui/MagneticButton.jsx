'use client'

import { useRef, useCallback } from 'react'

export default function MagneticButton({ children, className = '', style = {}, onClick, href, ...props }) {
  const btnRef = useRef(null)

  const onMouseMove = useCallback((e) => {
    const el = btnRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const strength = 0.28
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
  }, [])

  const onMouseLeave = useCallback(() => {
    const el = btnRef.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
    el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
    setTimeout(() => {
      if (el) el.style.transition = ''
    }, 500)
  }, [])

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        className={className}
        style={style}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={btnRef}
      className={className}
      style={style}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </button>
  )
}
