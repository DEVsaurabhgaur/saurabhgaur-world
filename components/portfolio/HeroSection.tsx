'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Activity, Cpu, Server, Shield, Radio } from 'lucide-react'
import { playClick } from '@/lib/audio'
import { useTextScramble } from '@/hooks/useTextScramble'

const SYSTEM_LOG_TEMPLATES = [
  'SYS: BENCHMARKING FRONTIER MODEL ON INSTRUCTION-FOLLOWING',
  'SYS: CORE SYNC COMPLETED WITH OUTLIER AI CORE',
  'SYS: ERROR RECONCILED ON REMOTE NODE_4 (RE-ROUTE OK)',
  'SYS: RAG PIPELINE RE-INDEXING EMBEDDINGS',
  'SYS: DYNAMIC ROUTING ENGAGED FOR AGENT-HARNESS',
  'SYS: ACTIVE DECODING ENGAGED ON SDXL WEIGHTS',
  'SYS: GENERATING SECURED STORAGE TOKENS',
  'SYS: METRIC ANOMALY VERIFICATION (z-score: 1.84)',
  'SYS: EXECUTING DUAL-SERVER STORY CHECKOUTS',
  'SYS: SEEDING STABLE SYNTHETIC DATASETS',
]

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const radarCanvasRef = useRef<HTMLCanvasElement>(null)
  const [glitchActive, setGlitchActive] = useState(false)
  const [cpuUsage, setCpuUsage] = useState(24.5)
  const [memUsage, setMemUsage] = useState(54.2)
  const [currentTime, setCurrentTime] = useState('')
  const [hudLogs, setHudLogs] = useState<string[]>([
    'SYS: ENGINE CORE HANDSHAKE STABLE (200ms)...',
    'SYS: LOAD BALANCER ACTIVE ON VIRTUAL SHIELDS...',
    'SYS: NEURAL INTERFACE STATUS :: SECURED.',
  ])

  // Text scramble hooks
  const { displayText: firstName, triggerScramble: scrambleFirst } = useTextScramble('SAURABH', true)
  const { displayText: lastName, triggerScramble: scrambleLast } = useTextScramble('GAUR', true)
  const { displayText: subText, triggerScramble: scrambleSub } = useTextScramble('AI/ML ENGINEER & LLM EVALUATION SPECIALIST', true)

  const triggerGlitchShake = () => {
    playClick()
    document.body.classList.add('screen-shake-active')
    setTimeout(() => {
      document.body.classList.remove('screen-shake-active')
    }, 180)
  }

  // Telemetry updates loops
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(new Date()) + ' IST')
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)

    const diagTimer = setInterval(() => {
      setCpuUsage((prev) => Math.max(12, Math.min(95, prev + (Math.random() - 0.5) * 8)))
      setMemUsage((prev) => Math.max(45, Math.min(75, prev + (Math.random() - 0.5) * 2)))
    }, 2000)

    const logTimer = setInterval(() => {
      const randLog = SYSTEM_LOG_TEMPLATES[Math.floor(Math.random() * SYSTEM_LOG_TEMPLATES.length)]
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      setHudLogs((prev) => [`[${timestamp}] ${randLog}`, prev[0], prev[1]].slice(0, 3))
    }, 3800)

    return () => {
      clearInterval(timer)
      clearInterval(diagTimer)
      clearInterval(logTimer)
    }
  }, [])

  // Glitch trigger
  useEffect(() => {
    const trigger = () => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
      setTimeout(trigger, Math.random() * 6000 + 4000)
    }
    const t = setTimeout(trigger, 2500)
    return () => clearTimeout(t)
  }, [])

  // HTML5 Canvas Radar scanner sweep
  useEffect(() => {
    const canvas = radarCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 160
    canvas.height = 160

    let angle = 0
    let animFrame: number

    const nodes = [
      { r: 35, theta: 0.6, size: 2.5, label: 'NODE_01' },
      { r: 60, theta: 2.1, size: 2, label: 'ATLAS_C' },
      { r: 50, theta: 4.2, size: 3, label: 'EVAL_04' },
      { r: 22, theta: 5.1, size: 2, label: 'SYS_BAL' },
    ]

    const draw = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const maxRadius = canvas.width / 2 - 8

      // Background grids
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.08)'
      ctx.lineWidth = 0.5
      for (let r = 15; r <= maxRadius; r += 20) {
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw crosshairs
      ctx.beginPath()
      ctx.moveTo(cx - maxRadius, cy)
      ctx.lineTo(cx + maxRadius, cy)
      ctx.moveTo(cx, cy - maxRadius)
      ctx.lineTo(cx, cy + maxRadius)
      ctx.stroke()

      // Calculate sweeps
      angle = (angle + 0.015) % (Math.PI * 2)

      // Sweep gradient line
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      const sweepX = cx + Math.cos(angle) * maxRadius
      const sweepY = cy + Math.sin(angle) * maxRadius
      ctx.lineTo(sweepX, sweepY)
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.4)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Echo sweep fan
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, maxRadius, angle - 0.4, angle)
      ctx.lineTo(cx, cy)
      ctx.fillStyle = 'rgba(0, 245, 255, 0.04)'
      ctx.fill()

      // Render radar pings
      nodes.forEach((node) => {
        const nx = cx + Math.cos(node.theta) * node.r
        const ny = cy + Math.sin(node.theta) * node.r

        let diff = angle - node.theta
        while (diff < 0) diff += Math.PI * 2
        diff = diff % (Math.PI * 2)

        let opacity = 0.06
        if (diff < 1.0) {
          opacity = 1.0 - diff / 1.0
        }

        ctx.beginPath()
        ctx.arc(nx, ny, node.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 245, 255, ${opacity * 0.9})`
        ctx.shadowBlur = 5
        ctx.shadowColor = `rgba(0, 245, 255, ${opacity * 0.8})`
        ctx.fill()
        ctx.shadowBlur = 0

        if (opacity > 0.4) {
          ctx.fillStyle = `rgba(0, 245, 255, ${opacity * 0.7})`
          ctx.font = '6px monospace'
          ctx.fillText(node.label, nx + 5, ny + 2)
        }
      })

      animFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animFrame)
  }, [])

  // Canvas background mesh
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrame: number
    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    type Particle = {
      x: number; y: number
      vx: number; vy: number
      opacity: number
      color: string
      size: number
    }

    const COLORS = ['0, 245, 255', '255, 107, 0', '123, 47, 190']
    const PARTICLE_COUNT = 60
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 1.5 + 0.5,
    }))

    let mouse = { x: -1000, y: -1000 }
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = 'rgba(0, 245, 255, 0.02)'
      ctx.lineWidth = 1
      const gridSize = 70
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      particles.forEach((p) => {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        let currVx = p.vx
        let currVy = p.vy

        if (dist < 120) {
          const force = (120 - dist) / 120
          const angle = Math.atan2(dy, dx)
          currVx -= Math.cos(angle) * force * 0.8
          currVy -= Math.sin(angle) * force * 0.8
        }

        p.x += currVx
        p.y += currVy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`
        ctx.shadowBlur = 6
        ctx.shadowColor = `rgba(${p.color}, 0.8)`
        ctx.fill()
        ctx.shadowBlur = 0
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.07 * (1 - dist / 110)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animFrame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden cyber-grid-bg">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(7,11,15,0.85) 100%)'
      }} />

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }} />

      <div className="container-site relative z-10 py-32 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Text */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded clip-cyber-sm select-none"
            style={{
              background: 'rgba(0, 245, 255, 0.04)',
              border: '1px solid rgba(0, 245, 255, 0.25)',
              fontFamily: 'var(--font-mono)',
            }}>
            <span className="w-2 h-2 rounded-full" style={{ background: '#00FF88', boxShadow: '0 0 8px #00FF88', animation: 'blink 1.5s ease-in-out infinite' }} />
            <span className="text-[10px] tracking-widest uppercase font-bold" style={{ color: 'var(--accent)' }}>
              CURRENTLY ENGINE :: OUTLIER.AI — CORE DEV
            </span>
          </div>

          <div className="relative select-none">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl font-display leading-none tracking-wider transition-all duration-300"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              onMouseEnter={() => { scrambleFirst(); scrambleLast() }}
            >
              {firstName}
            </h1>
            {glitchActive && (
              <>
                <h1 className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl font-display leading-none tracking-wider"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', animation: 'glitch 0.2s steps(1) forwards', clipPath: 'inset(30% 0 50% 0)', transform: 'translate(-4px, 2px)' }}>
                  {firstName}
                </h1>
                <h1 className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl font-display leading-none tracking-wider"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)', animation: 'glitch2 0.2s steps(1) forwards', clipPath: 'inset(60% 0 20% 0)', transform: 'translate(4px, -2px)' }}>
                  {firstName}
                </h1>
              </>
            )}
            
            <h1
              className="text-6xl sm:text-7xl md:text-8xl font-display leading-none tracking-wider mb-2 animate-neon"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
            >
              {lastName}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, var(--accent), transparent)', maxWidth: '180px', opacity: 0.4 }} />
            <span className="text-xs font-mono tracking-widest text-slate-400 font-bold">
              SYS-PROTOCOL :: SECURED
            </span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, var(--accent2), transparent)', maxWidth: '180px', opacity: 0.4 }} />
          </div>

          <p className="text-sm font-mono tracking-wider max-w-xl leading-relaxed"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
            onMouseEnter={scrambleSub}
          >
            <span style={{ color: 'var(--accent)', marginRight: '8px' }}>{'>'}</span>
            {subText}
            <span className="animate-blink font-bold text-cyan-400">_</span>
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/projects" className="btn-primary clip-cyber-sm" onClick={triggerGlitchShake}>
              View Projects →
            </Link>
            <Link href="/art" className="btn-outline clip-cyber-sm" onClick={triggerGlitchShake}>
              Browse Artwork
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 pt-6">
            {['LLM Eval', 'Agentic AI', 'RAG Pipelines', 'Next.js', 'Supabase', 'Stable Diffusion'].map((tag) => (
              <span key={tag} className="tag-pill clip-cyber-sm" style={{ borderStyle: 'solid' }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Right Column: High-tech Telemetry HUD dashboard */}
        <div className="lg:col-span-5 w-full select-none">
          <div className="relative card p-6 bg-[#090f16]/80 border border-cyan-500/20 clip-cyber glow-glow cyber-corners">
            
            <div className="absolute inset-0 pointer-events-none crt-screen rounded-lg" style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 245, 255, 0.015) 3px, rgba(0, 245, 255, 0.015) 6px)'
            }} />

            {/* HUD Header */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
                <Activity size={14} className="animate-pulse" />
                <span>TELEMETRY_DASHBOARD v4.0</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-500/80 bg-cyan-950/30 px-2.5 py-0.5 rounded border border-cyan-500/20">
                {currentTime || 'IST'}
              </div>
            </div>

            {/* Simulated hardware metrics */}
            <div className="space-y-4 font-mono text-xs mb-6">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-slate-400 flex items-center gap-1.5"><Cpu size={12} /> GPU_CLUSTER_UTILIZATION</span>
                  <span className="text-cyan-400 font-bold">{cpuUsage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-cyan-950/50 h-2.5 rounded overflow-hidden border border-cyan-500/20">
                  <div
                    className="bg-cyan-400 h-full transition-all duration-500 shadow-[0_0_8px_#00f5ff]"
                    style={{ width: `${cpuUsage}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-slate-400 flex items-center gap-1.5"><Server size={12} /> ACTIVE_EVAL_MEMORY</span>
                  <span className="text-orange-400 font-bold">{memUsage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-cyan-950/50 h-2.5 rounded overflow-hidden border border-orange-500/20">
                  <div
                    className="bg-orange-500 h-full transition-all duration-500 shadow-[0_0_8px_#ff6b00]"
                    style={{ width: `${memUsage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Radar Sweep & Details side-by-side */}
            <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
              {/* Sonar Radar Canvas */}
              <div className="flex items-center justify-center p-2 border border-cyan-500/15 bg-slate-950/30 rounded">
                <canvas ref={radarCanvasRef} className="w-36 h-36" />
              </div>
              
              {/* Telemetry info listing */}
              <div className="flex-1 font-mono text-[10px] space-y-2 text-slate-400 w-full">
                <div className="flex items-center gap-1.5 bg-slate-950/30 border border-slate-800 p-1.5 rounded">
                  <Radio size={12} className="text-emerald-400 animate-pulse" />
                  <div>
                    <p className="text-slate-500">RADAR_SWEEP</p>
                    <p className="text-emerald-400 font-bold">LOCK_STABLE</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-950/30 border border-slate-800 p-1.5 rounded">
                  <Shield size={12} className="text-cyan-400" />
                  <div>
                    <p className="text-slate-500">NEURAL_DECRYPT</p>
                    <p className="text-cyan-400 font-bold">AES_ENCRYPT_ON</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrolling Transaction Event Logs */}
            <div className="bg-slate-950/60 p-4 border border-cyan-500/10 rounded font-mono text-[10px] space-y-1.5 overflow-hidden h-[95px] flex flex-col justify-end">
              <span className="text-cyan-500/70 border-b border-cyan-500/10 pb-1.5 block font-bold tracking-wider">
                {'>>'} RECENT TRANSACTIONS LOGGER:
              </span>
              <div className="space-y-1">
                {hudLogs.map((log, index) => (
                  <div key={index} className="truncate text-emerald-400/90 flex gap-2">
                    <span className="text-cyan-500/50 select-none">❯</span>
                    <span className="truncate">{log}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
