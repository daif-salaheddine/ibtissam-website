'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 800 : 2500

    let renderer, animId

    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
    } catch {
      return // WebGL not supported
    }

    const setSize = () => {
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false)
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight
      camera.updateProjectionMatrix()
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.z = 6

    // Particle positions
    const positions = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12
      sizes[i] = Math.random() * 2 + 0.5
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0xE8A020,
      size: 0.04,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    setSize()

    const clock = new THREE.Clock()
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      points.rotation.y = t * 0.018
      points.rotation.x = Math.sin(t * 0.007) * 0.08
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => setSize()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}
