import { useState, useEffect, useRef, memo } from 'react'

/**
 * TypewriterName
 * Accepts a single `text` prop and animates:
 *   typing  → pause → deleting → typing (infinite loop)
 *
 * Props:
 *   text        {string}  – text to animate
 *   typeSpeed   {number}  – ms per character while typing   (default 80)
 *   deleteSpeed {number}  – ms per character while deleting (default 50)
 *   pauseTime   {number}  – ms to hold after fully typed    (default 800)
 *   className   {string}  – forwarded to the outer <span>
 */
const TypewriterName = memo(function TypewriterName({
  text = '',
  typeSpeed = 130,
  deleteSpeed = 85,
  pauseTime = 2000,
  className = '',
}) {
  const [displayed, setDisplayed]   = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused,   setIsPaused]   = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!text) return

    const clear = () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }

    // ── Pause phase: hold full text before deleting ──────────
    if (isPaused) {
      timerRef.current = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseTime)
      return clear
    }

    // ── Typing phase ─────────────────────────────────────────
    if (!isDeleting) {
      if (displayed.length < text.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(text.slice(0, displayed.length + 1))
        }, typeSpeed)
      } else {
        // Fully typed → enter pause
        setIsPaused(true)
      }
      return clear
    }

    // ── Deleting phase ────────────────────────────────────────
    if (displayed.length > 0) {
      timerRef.current = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length - 1))
      }, deleteSpeed)
    } else {
      // Fully deleted → restart typing
      setIsDeleting(false)
    }

    return clear
  }, [displayed, isDeleting, isPaused, text, typeSpeed, deleteSpeed, pauseTime])

  return (
    <span className={className}>
      {displayed}
      <span className="typing-cursor" aria-hidden="true" />
    </span>
  )
})

export default TypewriterName
