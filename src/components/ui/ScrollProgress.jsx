import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docH > 0 ? (scrollTop / docH) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="scroll-progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />
  )
}
