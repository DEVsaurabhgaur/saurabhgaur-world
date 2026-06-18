'use client'

let audioCtx: AudioContext | null = null
let soundEnabled = false

export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false
  return soundEnabled
}

export function toggleSound(): boolean {
  if (typeof window === 'undefined') return false
  soundEnabled = !soundEnabled
  
  if (soundEnabled) {
    initAudio()
  }
  return soundEnabled
}

function initAudio() {
  if (typeof window === 'undefined') return
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
}

function playTone(freq: number, type: OscillatorType, duration: number, volume: number = 0.1, slideTo?: number) {
  if (typeof window === 'undefined' || !soundEnabled) return
  try {
    initAudio()
    if (!audioCtx) return

    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    
    osc.type = type
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(slideTo, audioCtx.currentTime + duration)
    }
    
    gain.gain.setValueAtTime(volume, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration)
    
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    
    osc.start()
    osc.stop(audioCtx.currentTime + duration)
  } catch {
    console.warn('Audio playback failed')
  }
}

export function playClick() {
  playTone(1800, 'sine', 0.05, 0.03)
}

/** Softer, higher hover blip — distinct from the sharper click tone */
export function playHover() {
  playTone(2400, 'sine', 0.03, 0.015)
}

export function playKeypress() {
  playTone(1400, 'sine', 0.03, 0.015)
}

export function playSweep() {
  playTone(200, 'triangle', 0.18, 0.04, 1200)
}

export function playAlert() {
  if (typeof window === 'undefined' || !soundEnabled) return
  try {
    initAudio()
    if (!audioCtx) return

    const now = audioCtx.currentTime
    const osc1 = audioCtx.createOscillator()
    const osc2 = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    
    osc1.type = 'sawtooth'
    osc1.frequency.setValueAtTime(140, now)
    osc1.frequency.setValueAtTime(100, now + 0.1)
    
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(142, now)
    osc2.frequency.setValueAtTime(102, now + 0.1)
    
    gain.gain.setValueAtTime(0.05, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35)
    
    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(audioCtx.destination)
    
    osc1.start()
    osc2.start()
    osc1.stop(now + 0.35)
    osc2.stop(now + 0.35)
  } catch {}
}

export function playSuccess() {
  if (typeof window === 'undefined' || !soundEnabled) return
  try {
    initAudio()
    if (!audioCtx) return

    const now = audioCtx.currentTime
    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    notes.forEach((note, idx) => {
      const osc = audioCtx!.createOscillator()
      const gain = audioCtx!.createGain()
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(note, now + idx * 0.07)
      
      gain.gain.setValueAtTime(0.03, now + idx * 0.07)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.2)
      
      osc.connect(gain)
      gain.connect(audioCtx!.destination)
      osc.start(now + idx * 0.07)
      osc.stop(now + idx * 0.07 + 0.2)
    })
  } catch {}
}
