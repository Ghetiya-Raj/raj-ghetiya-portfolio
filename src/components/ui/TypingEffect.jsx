import { useState, useEffect, useRef, memo } from 'react'

const TypingEffect = memo(function TypingEffect({
  texts = [],
  typeSpeed = 100,
  deleteSpeed = 60,
  pauseTime = 1600,
  className = '',
  cursorClassName = '',
  loop = true,
}) {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('typing') // 'typing' | 'pause' | 'deleting'
  const [index, setIndex] = useState(0)
  const charRef = useRef(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!texts.length) return
    const current = texts[index % texts.length]

    const tick = () => {
      if (phase === 'typing') {
        charRef.current++
        setDisplayed(current.slice(0, charRef.current))
        if (charRef.current >= current.length) {
          setPhase('pause')
          timerRef.current = setTimeout(() => setPhase('deleting'), pauseTime)
          return
        }
        timerRef.current = setTimeout(tick, typeSpeed)
      } else if (phase === 'deleting') {
        charRef.current--
        setDisplayed(current.slice(0, charRef.current))
        if (charRef.current <= 0) {
          const next = (index + 1) % texts.length
          if (!loop && next === 0) return
          setIndex(next)
          setPhase('typing')
          return
        }
        timerRef.current = setTimeout(tick, deleteSpeed)
      }
    }

    timerRef.current = setTimeout(tick, phase === 'typing' ? typeSpeed : deleteSpeed)
    return () => clearTimeout(timerRef.current)
  }, [phase, index, texts, typeSpeed, deleteSpeed, pauseTime, loop])

  return (
    <span className={className}>
      {displayed}
      <span className={`typing-cursor ${cursorClassName}`} />
    </span>
  )
})

export default TypingEffect
