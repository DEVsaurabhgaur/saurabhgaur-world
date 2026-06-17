'use client'

import { useEffect, useState, useRef } from 'react'
import { playClick } from '@/lib/audio'

export default function CyberCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [visible, setVisible] = useState(false)

  // Refs for direct DOM manipulation (avoids 60fps React re-renders)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const coordsRef = useRef<HTMLDivElement>(null)

  // Positions
  const mouseCoords = useRef({ x: -100, y: -100 })
  const ringCoords = useRef({ x: -100, y: -100 })
  const rafId = useRef<number | null>(null)
  const prevHovering = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(pointer: fine)')
    setIsMobile(!mediaQuery.matches)
    if (!mediaQuery.matches) return

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    // Dynamic hover states and sound feedback
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]')
      
      const hovering = !!isInteractive
      setIsHovering(hovering)

      // Play click sound on new hover entry
      if (hovering && !prevHovering.current) {
        playClick()
      }
      prevHovering.current = hovering
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    // Add pointer fine style to hide default cursor
    document.body.classList.add('custom-cursor-active')

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    // Butter-smooth direct LERP loop
    const animate = () => {
      // Lerp coefficient: lower value = smoother trail
      const lerpFactor = 0.16
      
      // Calculate ring coordinates (delayed follow)
      ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * lerpFactor
      ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * lerpFactor

      // Update Dot Position directly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseCoords.current.x}px, ${mouseCoords.current.y}px, 0)`
      }

      // Update Ring Position directly
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0)`
      }

      // Update Telemetry grid text directly
      if (coordsRef.current) {
        coordsRef.current.innerText = `SYS_LOC: [${Math.round(mouseCoords.current.x)}, ${Math.round(mouseCoords.current.y)}]`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [visible])

  if (isMobile || !visible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] select-none">
      {/* 1. Center Zero-Lag Glowing Dot */}
      <div
        ref={dotRef}
        className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 pointer-events-none will-change-transform ${
          isHovering 
            ? 'bg-orange-500 scale-150 shadow-[0_0_8px_#ff6b00]' 
            : 'bg-cyan-400 shadow-[0_0_8px_#00f5ff]'
        }`}
      />

      {/* 2. Trailing FUI HUD Crosshair Ring */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none will-change-transform"
      >
        {/* Rotating outer ring */}
        <div 
          className={`absolute rounded-full border border-dashed transition-all duration-300 ${
            isHovering 
              ? 'w-10 h-10 border-orange-500/80 animate-[spin_4s_linear_infinite]' 
              : 'w-7 h-7 border-cyan-400/40 animate-[spin_12s_linear_infinite]'
          }`}
        />

        {/* Crosshair locks (Ticks) */}
        <div className={`absolute flex items-center justify-between transition-all duration-300 ${
          isHovering ? 'w-8 h-8 opacity-100 rotate-45' : 'w-10 h-10 opacity-40 rotate-0'
        }`}>
          {/* Left/Right Ticks */}
          <span className={`w-1 h-[1px] ${isHovering ? 'bg-orange-500' : 'bg-cyan-400'}`} />
          <span className={`w-1 h-[1px] ${isHovering ? 'bg-orange-500' : 'bg-cyan-400'}`} />
        </div>
        
        <div className={`absolute flex flex-col items-center justify-between transition-all duration-300 ${
          isHovering ? 'w-8 h-8 opacity-100 rotate-45' : 'w-10 h-10 opacity-40 rotate-0'
        }`}>
          {/* Top/Bottom Ticks */}
          <span className={`w-[1px] h-1 ${isHovering ? 'bg-orange-500' : 'bg-cyan-400'}`} />
          <span className={`w-[1px] h-1 ${isHovering ? 'bg-orange-500' : 'bg-cyan-400'}`} />
        </div>

        {/* Telemetry Coordinate Label */}
        <div 
          ref={coordsRef}
          className={`absolute top-6 left-6 font-mono text-[7px] tracking-widest whitespace-nowrap bg-slate-950/85 px-1.5 py-0.5 rounded border transition-all duration-300 ${
            isHovering 
              ? 'text-orange-400 border-orange-500/30' 
              : 'text-cyan-400/60 border-cyan-500/10'
          }`}
        >
          SYS_LOC: [0, 0]
        </div>
      </div>
    </div>
  )
}

