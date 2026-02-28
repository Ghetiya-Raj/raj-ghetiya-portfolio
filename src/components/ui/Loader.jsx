import { useEffect, useRef, useState } from 'react'

/**
 * PREMIUM LOADER
 * Canvas-based 3D particle sphere animation.
 * Particles orbit a glowing core, then collapse/fade as site loads.
 * Uses requestAnimationFrame — no blocking, GPU-optimized.
 */
export default function Loader({ onComplete }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const animRef = useRef(null)
  const startTimeRef = useRef(null)
  const [visible, setVisible] = useState(true)
  const DURATION = 2200 // ms total

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width = 400
    const H = canvas.height = 400
    const cx = W / 2, cy = H / 2

    // ── Particle system ──────────────────────────────────────
    const NUM = 120
    const particles = Array.from({ length: NUM }, (_, i) => {
      const theta = Math.acos(2 * Math.random() - 1)
      const phi = Math.random() * Math.PI * 2
      const r = 90 + Math.random() * 30
      return {
        x: Math.sin(theta) * Math.cos(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(theta),
        r,
        size: 1 + Math.random() * 2,
        speed: 0.004 + Math.random() * 0.004,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? [0, 255, 200] : [255, 77, 166],
      }
    })

    let angle = 0

    function render(ts) {
      if (!startTimeRef.current) startTimeRef.current = ts
      const elapsed = ts - startTimeRef.current
      const progress = Math.min(elapsed / DURATION, 1)

      ctx.clearRect(0, 0, W, H)

      // Background
      ctx.fillStyle = '#08080e'
      ctx.fillRect(0, 0, W, H)

      // Outer glow halo
      const haloAlpha = Math.sin(progress * Math.PI) * 0.15
      const halo = ctx.createRadialGradient(cx, cy, 20, cx, cy, 160)
      halo.addColorStop(0, `rgba(0,255,200,${haloAlpha + 0.05})`)
      halo.addColorStop(1, 'transparent')
      ctx.fillStyle = halo
      ctx.fillRect(0, 0, W, H)

      angle += 0.006
      const collapseStart = 0.75
      const collapseFactor = progress > collapseStart
        ? 1 - (progress - collapseStart) / (1 - collapseStart)
        : 1

      // Sort by z for depth
      const sorted = particles
        .map(p => {
          const a = angle + p.phase
          const cosA = Math.cos(a), sinA = Math.sin(a)
          const x3 = p.x * cosA - p.z * sinA
          const y3 = p.y
          const z3 = p.x * sinA + p.z * cosA
          const rr = p.r * collapseFactor
          const sx = cx + x3 * rr
          const sy = cy + y3 * rr
          const sz = z3
          return { ...p, sx, sy, sz }
        })
        .sort((a, b) => a.sz - b.sz)

      sorted.forEach(p => {
        const depthNorm = (p.sz + 1) / 2
        const alpha = (0.3 + depthNorm * 0.7) * (1 - progress * 0.6)
        const [r, g, b] = p.color
        const size = p.size * (0.5 + depthNorm * 0.5) * collapseFactor
        const grd = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, size * 2.5)
        grd.addColorStop(0, `rgba(${r},${g},${b},${alpha})`)
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, size * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
      })

      // Core glow
      const coreSize = 12 * collapseFactor
      const coreGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize * 4)
      coreGrd.addColorStop(0, `rgba(0,255,200,${0.9 * collapseFactor})`)
      coreGrd.addColorStop(0.3, `rgba(0,255,200,${0.4 * collapseFactor})`)
      coreGrd.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(cx, cy, coreSize * 4, 0, Math.PI * 2)
      ctx.fillStyle = coreGrd
      ctx.fill()

      // "Rg" text
      const textAlpha = progress < 0.2
        ? progress / 0.2
        : progress > 0.7
          ? Math.max(0, 1 - (progress - 0.7) / 0.3)
          : 1
      ctx.save()
      ctx.globalAlpha = textAlpha
      ctx.font = 'bold 52px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const grad = ctx.createLinearGradient(cx - 40, cy, cx + 40, cy)
      grad.addColorStop(0, '#00ffc8')
      grad.addColorStop(1, '#ff4da6')
      ctx.fillStyle = grad
      ctx.shadowColor = '#00ffc8'
      ctx.shadowBlur = 20
      ctx.fillText('RG', cx, cy + 4)
      ctx.restore()

      // Loading label
      const labelAlpha = progress < 0.8 ? Math.min(1, progress * 3) : (1 - progress) / 0.2
      ctx.save()
      ctx.globalAlpha = Math.max(0, labelAlpha)
      ctx.font = '13px JetBrains Mono, monospace'
      ctx.textAlign = 'center'
      ctx.fillStyle = 'rgba(0,255,200,0.7)'
      ctx.fillText('LOADING', cx, H - 56)
      // dots
      const dots = Math.floor(elapsed / 400) % 4
      ctx.fillText('.'.repeat(dots), cx + 46, H - 56)
      ctx.restore()

      if (progress < 1) {
        animRef.current = requestAnimationFrame(render)
      } else {
        // Start fade-out
        if (containerRef.current) {
          containerRef.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
          containerRef.current.style.opacity = '0'
          containerRef.current.style.transform = 'scale(1.04)'
          setTimeout(() => {
            setVisible(false)
            onComplete?.()
          }, 650)
        }
      }
    }

    animRef.current = requestAnimationFrame(render)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#08080e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'opacity, transform',
      }}
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{
          display: 'block',
          maxWidth: '80vw',
          maxHeight: '80vw',
        }}
      />
    </div>
  )
}
