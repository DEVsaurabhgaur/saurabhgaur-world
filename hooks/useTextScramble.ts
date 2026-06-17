'use client'

import { useCallback, useEffect, useState, useRef } from 'react'

const CYBER_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function useTextScramble(targetText: string, triggerOnLoad = true) {
  const [displayText, setDisplayText] = useState(targetText)
  const isAnimatingRef = useRef(false)
  const frameRef = useRef<number | null>(null)

  const triggerScramble = useCallback(() => {
    if (isAnimatingRef.current) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }

    isAnimatingRef.current = true
    const textLength = targetText.length
    let iteration = 0
    const totalIterations = Math.max(15, Math.min(35, textLength * 1.5))

    const animate = () => {
      let result = ''
      for (let i = 0; i < textLength; i++) {
        if (targetText[i] === ' ') {
          result += ' '
          continue
        }
        
        const charProgress = i / textLength
        const animProgress = iteration / totalIterations
        
        if (animProgress > charProgress + (Math.random() * 0.1)) {
          result += targetText[i]
        } else {
          result += CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)]
        }
      }

      setDisplayText(result)

      if (iteration < totalIterations) {
        iteration++
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayText(targetText)
        isAnimatingRef.current = false
      }
    }

    frameRef.current = requestAnimationFrame(animate)
  }, [targetText])

  useEffect(() => {
    if (triggerOnLoad) {
      triggerScramble()
    }
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [triggerScramble, triggerOnLoad])

  return { displayText, triggerScramble }
}
