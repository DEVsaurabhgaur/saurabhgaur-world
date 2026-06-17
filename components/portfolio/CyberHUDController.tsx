'use client'

import { useState, useEffect, useRef } from 'react'
import { ShieldAlert, Sliders, Volume2, VolumeX, Eye, EyeOff, Radio } from 'lucide-react'
import { playClick, toggleSound, isSoundEnabled } from '@/lib/audio'

export default function CyberHUDController() {
  const [open, setOpen] = useState(false)
  const [crtActive, setCrtActive] = useState(true)
  const [flickerActive, setFlickerActive] = useState(false)
  const [matrixActive, setMatrixActive] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Sync sound state
    setSoundOn(isSoundEnabled())
  }, [])

  const handleToggleCrt = () => {
    playClick()
    setCrtActive(!crtActive)
  }

  const handleToggleFlicker = () => {
    playClick()
    const newState = !flickerActive
    setFlickerActive(newState)
    if (newState) {
      document.body.classList.add('crt-screen')
    } else {
      document.body.classList.remove('crt-screen')
    }
  }

  const handleToggleSound = () => {
    const active = toggleSound()
    setSoundOn(active)
    if (active) playClick()
  }

  // Fullscreen Matrix Stream cascade
  useEffect(() => {
    if (!matrixActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = '0123456789ABCDEF/\\#$@'
    const charArr = chars.split('')
    const fontSize = 10
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    let animFrame: number

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 11, 15, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'rgba(0, 245, 255, 0.04)' // Very subtle cyan matrix streams
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i]++
      }
      animFrame = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    animFrame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', handleResize)
    }
  }, [matrixActive])

  return (
    <>
      {/* Matrix Background */}
      {matrixActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-0"
          style={{ mixBlendMode: 'screen' }}
        />
      )}

      {/* CRT Scanline */}
      {crtActive && <div className="fui-scanline" />}

      {/* Expandable Control Center */}
      <div className="fixed right-4 bottom-24 z-[90] select-none font-mono">
        {!open ? (
          <button
            onClick={() => {
              playClick()
              setOpen(true)
            }}
            className="flex items-center gap-1.5 px-3 py-2 border border-cyan-500/30 bg-slate-950/85 hover:bg-cyan-500/10 text-cyan-400 rounded hover:scale-105 transition-all duration-200 clip-cyber-sm glow-glow text-xs uppercase"
            aria-label="Launch systems dashboard"
          >
            <Sliders size={13} className="animate-pulse" />
            <span>HUD_CONTROL</span>
          </button>
        ) : (
          <div 
            className="w-64 card p-5 bg-[#070B0F]/95 border border-cyan-500/30 rounded clip-cyber glow-glow flex flex-col gap-4"
          >
            {/* HUD Header */}
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 text-xs text-cyan-400 font-bold">
              <span className="flex items-center gap-1.5"><ShieldAlert size={12} /> HUD PREFERENCES</span>
              <button 
                onClick={() => {
                  playClick()
                  setOpen(false)
                }} 
                className="hover:text-white transition-colors"
                aria-label="Close systems dashboard"
              >
                [X]
              </button>
            </div>

            {/* Telemetry settings */}
            <div className="space-y-3 text-[10px] text-slate-300">
              {/* Scanlines Toggle */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Eye size={11} className="text-cyan-500" /> CRT SCANLINES</span>
                <button
                  onClick={handleToggleCrt}
                  className={`px-2 py-0.5 border rounded text-[9px] transition-all duration-150 ${
                    crtActive ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300' : 'border-slate-800 text-slate-500'
                  }`}
                >
                  {crtActive ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Flicker Toggle */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><EyeOff size={11} className="text-cyan-500" /> SCREEN FLICKER</span>
                <button
                  onClick={handleToggleFlicker}
                  className={`px-2 py-0.5 border rounded text-[9px] transition-all duration-150 ${
                    flickerActive ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300' : 'border-slate-800 text-slate-500'
                  }`}
                >
                  {flickerActive ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Matrix rain Toggle */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Radio size={11} className="text-cyan-500" /> MATRIX STREAM</span>
                <button
                  onClick={() => {
                    playClick()
                    setMatrixActive(!matrixActive)
                  }}
                  className={`px-2 py-0.5 border rounded text-[9px] transition-all duration-150 ${
                    matrixActive ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300' : 'border-slate-800 text-slate-500'
                  }`}
                >
                  {matrixActive ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Sound Toggle */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  {soundOn ? <Volume2 size={11} className="text-cyan-500" /> : <VolumeX size={11} className="text-slate-500" />} 
                  INTERFACE FX
                </span>
                <button
                  onClick={handleToggleSound}
                  className={`px-2 py-0.5 border rounded text-[9px] transition-all duration-150 ${
                    soundOn ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300' : 'border-slate-800 text-slate-500'
                  }`}
                >
                  {soundOn ? 'UNMUTE' : 'MUTE'}
                </button>
              </div>
            </div>

            {/* Spectrum Equalizer simulation */}
            <div className="pt-3 border-t border-cyan-500/20">
              <div className="flex items-center justify-between text-[8px] text-cyan-500/60 mb-1.5 font-bold">
                <span>SPECTRUM_MONITOR</span>
                <span className="animate-pulse">SYNC</span>
              </div>
              <div className="flex justify-between items-end h-8 gap-0.5 px-1 bg-cyan-950/20 rounded border border-cyan-500/10 overflow-hidden">
                {[...Array(20)].map((_, i) => {
                  const animDur = 0.4 + Math.random() * 0.6
                  return (
                    <div
                      key={i}
                      className="bg-cyan-400 w-1.5 rounded-t"
                      style={{
                        animation: `eqBounce ${animDur}s ease-in-out infinite alternate`,
                        boxShadow: '0 0 2px #00f5ff',
                        height: '15%',
                      }}
                    />
                  )
                })}
              </div>
            </div>

            {/* inline style for spectrum bounce keyframe */}
            <style jsx global>{`
              @keyframes eqBounce {
                0% { height: 10%; }
                100% { height: 85%; }
              }
            `}</style>
          </div>
        )}
      </div>
    </>
  )
}
