import { useEffect, useRef, useCallback, useState } from 'react'

/**
 * SPOTLIGHT CURSOR — Unique Feature
 * A soft radial glow that follows the cursor, illuminating content
 * as if a light source trails the mouse. Creates a premium "light in dark" effect.
 * GPU-composited via CSS: mix-blend-mode overlay + pointer-events: none.
 * Disabled on touch / coarse pointer / viewport < 1024 px — no flash, no leak.
 */
export default function SpotlightCursor() {
  const spotRef = useRef(null)
  const posRef = useRef({ x: -300, y: -300 })
  const animRef = useRef(null)

  // Synchronous detection for correct first render, then reactive for resize.
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' &&
    (!window.matchMedia('(pointer: fine)').matches ||
     !window.matchMedia('(min-width: 1024px)').matches)
  )

  // Keep isMobile in sync with viewport / pointer changes.
  useEffect(() => {
    const mqPointer = window.matchMedia('(pointer: fine)')
    const mqWidth   = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsMobile(!mqPointer.matches || !mqWidth.matches)
    mqPointer.addEventListener('change', update)
    mqWidth.addEventListener('change',   update)
    return () => {
      mqPointer.removeEventListener('change', update)
      mqWidth.removeEventListener('change',   update)
    }
  }, [])

  const smoothMove = useCallback(() => {
    const el = spotRef.current
    if (!el) return
    el.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`
    animRef.current = requestAnimationFrame(smoothMove)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handleMove = (e) => {
      posRef.current = {
        x: e.clientX - 300,
        y: e.clientY - 300,
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    animRef.current = requestAnimationFrame(smoothMove)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [isMobile, smoothMove])

  if (isMobile) return null

  return (
    <div
      className="spotlight-overlay"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      <div
        ref={spotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(
            circle,
            rgba(0, 255, 200, 0.055) 0%,
            rgba(0, 255, 200, 0.03) 30%,
            rgba(168, 85, 247, 0.02) 60%,
            transparent 75%
          )`,
          pointerEvents: 'none',
          willChange: 'transform',
          mixBlendMode: 'screen',
          zIndex: 9998,
        }}
      />
    </div>
  )
}
