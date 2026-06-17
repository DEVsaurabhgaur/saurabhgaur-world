'use client'

import { useEffect, useState } from 'react'

export default function CyberCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(pointer: fine)')
    setIsMobile(!mediaQuery.matches)
    
    if (!mediaQuery.matches) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }

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
      
      setIsHovering(!!isInteractive)
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    document.body.classList.add('custom-cursor-active')

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [visible])

  if (isMobile || !visible) return null

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 -translate-x-1/2 -translate-y-1/2 select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Outer spinning target crosshair */}
      <div 
        className={`w-7 h-7 rounded-full border border-dashed border-cyan-400/40 animate-spin transition-all duration-300 ${
          isHovering ? 'scale-125 border-orange-400/60' : ''
        }`}
        style={{ animationDuration: '6s' }}
      />
      
      {/* Center glowing core */}
      <div 
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full transition-all duration-300 ${
          isHovering ? 'bg-orange-400 scale-150 shadow-[0_0_8px_#ff6b00]' : 'bg-cyan-400 shadow-[0_0_8px_#00f5ff]'
        }`} 
      />
      
      {/* Coordinate index label */}
      <div className="absolute top-4 left-4 font-mono text-[7px] text-cyan-400/70 tracking-widest whitespace-nowrap bg-slate-950/85 px-1.5 py-0.5 rounded border border-cyan-500/10">
        GRID: [{position.x}, {position.y}]
      </div>
    </div>
  )
}
