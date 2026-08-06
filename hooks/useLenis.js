'use client'
import { useEffect } from 'react'

export function useLenis() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let lenis
    let gsapTicker

    async function init() {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger').then(m => ({ ScrollTrigger: m.ScrollTrigger })),
      ])

      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      })

      lenis.on('scroll', ScrollTrigger.update)

      gsapTicker = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(gsapTicker)
      gsap.ticker.lagSmoothing(0)

      // Scroll progress bar
      const bar = document.getElementById('scroll-progress')
      if (bar) {
        lenis.on('scroll', ({ progress }) => {
          bar.style.transform = `scaleX(${progress})`
        })
      }
    }

    init()

    return () => {
      if (lenis) lenis.destroy()
      if (gsapTicker) {
        import('gsap').then(({ gsap }) => gsap.ticker.remove(gsapTicker))
      }
    }
  }, [])
}
