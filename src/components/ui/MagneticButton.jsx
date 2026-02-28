import { useRef, useCallback, memo } from 'react'

/**
 * MagneticButton — gives a subtle magnetic pull to the wrapped element.
 * Pure DOM manipulation with requestAnimationFrame — no re-renders.
 */
const MagneticButton = memo(function MagneticButton({ children, intensity = 0.25, className = '' }) {
  const ref = useRef(null)
  const animRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  const lerp = (a, b, t) => a + (b - a) * t

  const animate = useCallback(() => {
    const el = ref.current
    if (!el) return
    currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.12)
    currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.12)
    el.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px)`
    if (
      Math.abs(currentRef.current.x - targetRef.current.x) > 0.01 ||
      Math.abs(currentRef.current.y - targetRef.current.y) > 0.01
    ) {
      animRef.current = requestAnimationFrame(animate)
    }
  }, [])

  const handleMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    targetRef.current = {
      x: (e.clientX - cx) * intensity,
      y: (e.clientY - cy) * intensity,
    }
    if (animRef.current) cancelAnimationFrame(animRef.current)
    animRef.current = requestAnimationFrame(animate)
  }, [intensity, animate])

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 }
    if (animRef.current) cancelAnimationFrame(animRef.current)
    animRef.current = requestAnimationFrame(animate)
  }, [animate])

  return (
    <div
      ref={ref}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
})

export default MagneticButton
