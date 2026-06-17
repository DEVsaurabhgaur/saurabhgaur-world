'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Terminal as TerminalIcon, Sparkles } from 'lucide-react'
import { projects } from '@/data/projects'
import { playKeypress, playSweep, playAlert, playSuccess } from '@/lib/audio'

type CommandOutput = {
  type: 'input' | 'output' | 'error' | 'success'
  text: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
}

const COMMAND_SUGGESTIONS = ['help', 'about', 'projects', 'skills', 'system', 'matrix', 'clear']

export default function CyberTerminal({ isOpen, onClose }: Props) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [logs, setLogs] = useState<CommandOutput[]>([])
  const [isMatrixActive, setIsMatrixActive] = useState(false)
  
  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const matrixIntervalRef = useRef<number | null>(null)

  // Initialize terminal welcome logs
  useEffect(() => {
    if (isOpen) {
      playSweep()
      setLogs([
        { type: 'output', text: '==================================================' },
        { type: 'success', text: '      SG NODE CORE CLI v4.8.0 - SECURE LINK' },
        { type: 'output', text: '==================================================' },
        { type: 'output', text: 'SYS STATE: ACTIVE | USER: GUEST_NODE' },
        { type: 'output', text: 'ENCRYPTION: SHIELD-AES-256 | DIRECTORY: /saurabh' },
        { type: 'output', text: '--------------------------------------------------' },
        { type: 'success', text: 'Establishing neural interface connection... OK' },
        { type: 'success', text: 'Syncing project datasets... OK (5 node arrays loaded)' },
        { type: 'output', text: 'Type "help" to list available system protocols.' },
        { type: 'output', text: '--------------------------------------------------' },
      ])
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      setIsMatrixActive(false)
    }
  }, [isOpen])

  // Scroll to bottom when logs change
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  // Matrix Rain Canvas Effect
  useEffect(() => {
    if (!isMatrixActive || !canvasRef.current) {
      if (matrixIntervalRef.current) {
        clearInterval(matrixIntervalRef.current)
      }
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth
    canvas.height = canvas.parentElement?.offsetHeight || 400

    const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const alphabet = katakana.split('')

    const fontSize = 14
    const columns = canvas.width / fontSize

    const rainDrops: number[] = []
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 11, 15, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00F5FF' // Cyan matrix theme matching --accent
      ctx.font = fontSize + 'px monospace'

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)]
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize)

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0
        }
        rainDrops[i]++
      }
    }

    const handleResize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || 400
    }

    window.addEventListener('resize', handleResize)
    const interval = setInterval(draw, 30)
    matrixIntervalRef.current = interval as unknown as number

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMatrixActive])

  if (!isOpen) return null

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase()
    if (!trimmed) return

    playSuccess()
    const newLogs = [...logs, { type: 'input' as const, text: `guest@saurabhgaur.world:~$ ${cmdStr}` }]
    
    // Add to history
    setHistory((prev) => [cmdStr, ...prev.filter((c) => c !== cmdStr)].slice(0, 50))
    setHistoryIndex(-1)
    setInput('')

    switch (trimmed) {
      case 'clear':
        setLogs([])
        setIsMatrixActive(false)
        return
      case 'exit':
        setIsMatrixActive(false)
        onClose()
        return
      case 'help':
        setLogs([
          ...newLogs,
          { type: 'output', text: 'SYSTEM INTERFACE CODE CHANNELS:' },
          { type: 'output', text: '  help       - Display this assistance report.' },
          { type: 'output', text: '  about      - Stream biographical node records.' },
          { type: 'output', text: '  projects   - Query technical portfolio deployments.' },
          { type: 'output', text: '  skills     - Interrogate developer engine toolkit.' },
          { type: 'output', text: '  system     - Run simulated neural diagnostics & metrics.' },
          { type: 'output', text: '  matrix     - Initiate visual matrix code waterfall.' },
          { type: 'output', text: '  clear      - Wipe dashboard message logs.' },
          { type: 'output', text: '  exit       - Terminate session shell link.' },
        ])
        break
      case 'about':
        setLogs([
          ...newLogs,
          { type: 'success', text: '>> BIOGRAPHICAL CLASSIFIED DOSSIER:' },
          { type: 'output', text: '  Name       : Saurabh Kumar Gaur' },
          { type: 'output', text: '  Role       : AI/ML Engineer | LLM Evaluation Specialist' },
          { type: 'output', text: '  Affiliation: Outlier.ai (Engineering OpenClaw Atlas harness)' },
          { type: 'output', text: '  Academics  : B.Tech in Computer Science & Engineering (2025)' },
          { type: 'output', text: '  Focus      : Multi-agent systems, context persistence, RAG evaluation frameworks, and frontier model RLHF loops.' },
          { type: 'output', text: '  Artwork    : 200+ pieces mixing generative AI (Stable Diffusion) with classic hand sketches.' },
        ])
        break
      case 'projects': {
        const projLogs = projects.map((p) => ({
          type: 'output' as const,
          text: `  [${p.period}] ${p.title} -> ${p.subtitle}\n  * Tech: ${p.tags.join(', ')}\n  * Dev: ${p.description}\n`,
        }))
        setLogs([
          ...newLogs,
          { type: 'success', text: '>> PORTFOLIO INVENTORY QUERY:' },
          ...projLogs,
        ])
        break
      }
      case 'skills':
        setLogs([
          ...newLogs,
          { type: 'success', text: '>> INSTALLED LIBRARIES & CAPABILITIES:' },
          { type: 'output', text: '  [AI & LLMs]  LLM Evaluation, Prompt Engineering, RLHF, Multi-agent Systems, RAG, Stable Diffusion' },
          { type: 'output', text: '  [LANGUAGES]  Python, TypeScript, JavaScript, SQL, Bash scripting' },
          { type: 'output', text: '  [FRAMEWORKS] Next.js, React, FastAPI, Node.js, Tailwind CSS' },
          { type: 'output', text: '  [DEVELOPER]  Docker, Git/GitHub, Vercel, Supabase, Linux command-line, Vector DBs' },
        ])
        break
      case 'system': {
        // Generate simulated stats
        const latency = (Math.random() * 50 + 120).toFixed(1)
        const memory = (Math.random() * 5 + 60).toFixed(2)
        const cpu = (Math.random() * 10 + 15).toFixed(1)
        setLogs([
          ...newLogs,
          { type: 'success', text: '>> CORE HARNESS STATUS: ONLINE' },
          { type: 'output', text: `  Harness Latency : ${latency}ms (average model return rate)` },
          { type: 'output', text: `  Active GPU Cluster: Node-5A (V100/H100 Virtualized Stack)` },
          { type: 'output', text: `  Harness CPU Load: ${cpu}%` },
          { type: 'output', text: `  Memory Alloc   : ${memory}GB / 128.00GB` },
          { type: 'output', text: '  Active Agents  : OpenClaw-Server-A, OpenClaw-Server-C, Eval-Harness-04' },
          { type: 'success', text: '  ALL CONTRA-CHECKS :: VERIFIED (0 active failure nodes)' },
        ])
        break
      }
      case 'matrix':
        setIsMatrixActive(true)
        setLogs([
          ...newLogs,
          { type: 'success', text: '>> INITIALIZING MATRIX OVERRIDE CODESTREAM...' },
          { type: 'output', text: '  Press [Enter] or type any command to overlay commands over matrix rain. Type "clear" to abort waterfall.' },
        ])
        break
      default:
        playAlert()
        setLogs([
          ...newLogs,
          { type: 'error', text: `SYS-ERROR: Unrecognized command protocol: "${cmdStr}"` },
          { type: 'output', text: 'Enter "help" to retrieve standard console directions.' },
        ])
        break
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Play character tone
    if (e.key.length === 1) {
      playKeypress()
    }

    if (e.key === 'Enter') {
      executeCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const nextIndex = historyIndex + 1
      if (nextIndex < history.length) {
        setHistoryIndex(nextIndex)
        setInput(history[nextIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = historyIndex - 1
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex)
        setInput(history[nextIndex])
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#05080c]/95 backdrop-blur-md"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Scanline CRT overlay */}
      <div className="absolute inset-0 pointer-events-none crt-screen" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 245, 255, 0.02) 2px, rgba(0, 245, 255, 0.02) 4px)'
      }} />

      {/* Terminal window container */}
      <div
        className="relative w-full max-w-4xl h-[80vh] flex flex-col bg-[#070B0F] border border-cyan-500/30 rounded-lg overflow-hidden clip-cyber glow-glow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-cyan-950/20 border-b border-cyan-500/20 select-none">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider">
            <TerminalIcon size={14} className="animate-pulse" />
            <span>SG_WORLD_SHELL :: CONNECTED</span>
          </div>
          <button
            onClick={() => {
              playSweep()
              onClose()
            }}
            className="p-1 hover:bg-cyan-500/10 rounded text-cyan-400 hover:text-white transition-colors duration-150"
            aria-label="Close terminal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Terminal Output */}
        <div className="relative flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-cyan-500/30">
          
          {/* Matrix canvas background */}
          {isMatrixActive && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            />
          )}

          {/* Logs */}
          <div className="relative z-10 space-y-1.5 whitespace-pre-wrap">
            {logs.map((log, index) => {
              let color = 'text-slate-300'
              if (log.type === 'input') color = 'text-cyan-300 font-bold'
              else if (log.type === 'error') color = 'text-rose-500 font-bold'
              else if (log.type === 'success') color = 'text-emerald-400 font-bold'
              
              return (
                <div key={index} className={color}>
                  {log.text}
                </div>
              )
            })}
            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Prompt Suggestions */}
        <div className="px-6 py-2 bg-cyan-950/10 border-t border-cyan-500/10 flex flex-wrap items-center gap-2 select-none">
          <span className="text-[10px] text-cyan-500 font-mono tracking-widest flex items-center gap-1">
            <Sparkles size={10} /> SUGGESTED NODES:
          </span>
          {COMMAND_SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              onClick={() => executeCommand(sug)}
              className="px-2 py-0.5 rounded text-xs font-mono bg-cyan-500/5 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 transition-all duration-150"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Terminal Input Line */}
        <div className="p-4 bg-cyan-950/10 border-t border-cyan-500/20 flex items-center gap-2">
          <span className="text-cyan-400 font-mono font-bold select-none">guest@saurabhgaur.world:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-cyan-300 font-mono outline-none border-none caret-cyan-400 focus:ring-0 text-sm py-1"
            placeholder="Interrogate node core..."
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}
