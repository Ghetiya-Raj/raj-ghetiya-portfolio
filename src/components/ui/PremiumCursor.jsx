import { useEffect, useRef, memo, useState } from 'react'

/**
 * PremiumCursor
 * – Small dot that follows cursor instantly (transform, GPU)
 * – Larger ring that lags behind via linear interpolation
 * – Scales up on hover of interactive elements
 * – Zero React state during animation → no re-renders
 * – Fully cleaned up on unmount
 * – Disabled on touch / coarse pointer / narrow-screen devices
 */
const PremiumCursor = memo(function PremiumCursor() {
  // Initialise synchronously so first render is correct (no flash),
  // then update reactively on resize / device change so cursor
  // correctly activates when resizing mobile → desktop and vice-versa.
  const [isPointerDevice, setIsPointerDevice] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    window.matchMedia('(min-width: 1024px)').matches
  )

  // Keep isPointerDevice in sync with viewport / input changes.
  useEffect(() => {
    const mqPointer = window.matchMedia('(pointer: fine)')
    const mqWidth   = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsPointerDevice(mqPointer.matches && mqWidth.matches)
    mqPointer.addEventListener('change', update)
    mqWidth.addEventListener('change',   update)
    return () => {
      mqPointer.removeEventListener('change', update)
      mqWidth.removeEventListener('change',   update)
    }
  }, [])

  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const rafId   = useRef(null)

  // Live refs — read/write without triggering re-renders
  const mouse     = useRef({ x: -200, y: -200 })
  const ring      = useRef({ x: -200, y: -200 })
  const hovering  = useRef(false)
  const ringHalf  = useRef(18) // half of ring width (36px default)

  useEffect(() => {
    // Disabled on touch / tablet / narrow devices
    if (!isPointerDevice) return

    const dot    = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    /* ── Mouse position tracker ─────────────────── */
    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    /* ── Interactive element detection ──────────── */
    const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, [tabindex]'

    const onMouseOver = (e) => {
      if (!hovering.current && e.target.closest(INTERACTIVE)) {
        hovering.current = true
        ringHalf.current = 26          // half of 52px expanded ring
        ringEl.style.width        = '52px'
        ringEl.style.height       = '52px'
        ringEl.style.borderColor  = 'rgba(0,255,200,0.65)'
        dot.style.opacity         = '0.7'
      }
    }

    const onMouseOut = (e) => {
      if (hovering.current && e.target.closest(INTERACTIVE)) {
        hovering.current = false
        ringHalf.current = 18          // half of 36px default ring
        ringEl.style.width        = '36px'
        ringEl.style.height       = '36px'
        ringEl.style.borderColor  = 'rgba(0,255,200,0.35)'
        dot.style.opacity         = '1'
      }
    }

    /* ── Animation loop — all DOM writes, no setState ── */
    const tick = () => {
      const mx = mouse.current.x
      const my = mouse.current.y

      // Dot: instant snap (sub-pixel GPU transform)
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`

      // Ring: lerp toward cursor
      ring.current.x += (mx - ring.current.x) * 0.12
      ring.current.y += (my - ring.current.y) * 0.12

      ringEl.style.transform = `translate(${ring.current.x - ringHalf.current}px, ${ring.current.y - ringHalf.current}px)`

      rafId.current = requestAnimationFrame(tick)
    }

    /* ── Attach ─────────────────────────────────── */
    window.addEventListener('mousemove', onMove,     { passive: true })
    document.addEventListener('mouseover',  onMouseOver, { passive: true })
    document.addEventListener('mouseout',   onMouseOut,  { passive: true })
    rafId.current = requestAnimationFrame(tick)

    /* ── Cleanup ─────────────────────────────────── */
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover',  onMouseOver)
      document.removeEventListener('mouseout',   onMouseOut)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [isPointerDevice]) // stable — only runs when pointer capability is confirmed

  // Do NOT render DOM elements on touch / mobile — saves GPU memory, avoids
  // stuck invisible elements and prevents accidental cursor:none on mobile.
  if (!isPointerDevice) return null

  return (
    <>
      {/* Cursor dot — snaps instantly to pointer */}
      <div
        ref={dotRef}
        className="premium-cursor-dot"
        aria-hidden="true"
      />

      {/* Cursor ring — follows with lerp delay */}
      <div
        ref={ringRef}
        className="premium-cursor-ring"
        aria-hidden="true"
      />
    </>
  )
})

export default PremiumCursor
