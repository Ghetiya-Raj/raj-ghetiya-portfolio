import { useRef, useEffect, memo } from 'react'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'
import MagneticButton from '@/components/ui/MagneticButton'
import TypewriterName from '@/components/ui/TypewriterName'

function scrollTo(id) {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// ── Premium Profile Photo Component ──────────────────────────
const ProfilePhoto = memo(function ProfilePhoto() {
  return (
    <div className="relative group select-none">
      {/* Far ambient glow */}
      <div
        className="absolute -inset-10 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,200,0.14) 0%, transparent 70%)',
          filter: 'blur(42px)',
          animation: 'pulseGlow 4s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* Spinning conic-gradient ring */}
      <div
        className="absolute -inset-[3px] rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, var(--primary), var(--accent), var(--violet), var(--primary))',
          animation: 'spin 8s linear infinite',
          filter: 'blur(2px)',
        }}
        aria-hidden="true"
      />

      {/* Dark gap between ring and photo */}
      <div
        className="absolute inset-[3px] rounded-full"
        style={{ background: 'var(--background)' }}
        aria-hidden="true"
      />

      {/* Actual photo */}
      <div
        className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden z-10"
        style={{
          border: '2px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        <img
          src="/images/raj-ghetiya.jpg"
          alt="Raj Ghetiya"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="eager"
          decoding="async"
        />
        {/* Glass sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Available badge */}
      <div
        className="absolute bottom-3 -right-1 flex items-center gap-1.5 px-2.5 py-1 rounded-full
                   text-xs font-semibold z-20 whitespace-nowrap"
        style={{
          background: 'rgba(8,8,14,0.9)',
          border: '1px solid rgba(0,255,200,0.35)',
          backdropFilter: 'blur(14px)',
          color: 'var(--primary)',
          boxShadow: '0 4px 20px rgba(0,255,200,0.18)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        Available
      </div>
    </div>
  )
})

// ── Hero Section ──────────────────────────────────────────────
const HeroSection = memo(function HeroSection() {
  const sectionRef   = useRef(null)
  const titleRef     = useRef(null)
  const subtitleRef  = useRef(null)
  const ctaRef       = useRef(null)

  // Parallax layer refs
  const orbLayerRef   = useRef(null)   // ambient orbs  – slowest
  const photoLayerRef = useRef(null)   // photo         – medium, opposite
  const textLayerRef  = useRef(null)   // text block    – subtle

  const targetMouse  = useRef({ x: 0, y: 0 })
  const currentMouse = useRef({ x: 0, y: 0 })
  const rafRef       = useRef(null)

  // GSAP scroll-triggered entry
  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef,    'up', { delay: 0.2 })
  useSlideInAnimation(subtitleRef, 'up', { delay: 0.4 })
  useSlideInAnimation(ctaRef,      'up', { delay: 0.6 })

  // Smooth mouse parallax (RAF-based – 60 fps, GPU-accelerated)
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onMove = (e) => {
      const r = section.getBoundingClientRect()
      targetMouse.current = {
        x: ((e.clientX - r.left)  / r.width  - 0.5) * 2,
        y: ((e.clientY - r.top)   / r.height - 0.5) * 2,
      }
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      currentMouse.current.x = lerp(currentMouse.current.x, targetMouse.current.x, 0.055)
      currentMouse.current.y = lerp(currentMouse.current.y, targetMouse.current.y, 0.055)

      const cx = currentMouse.current.x
      const cy = currentMouse.current.y

      if (orbLayerRef.current)
        orbLayerRef.current.style.transform  = `translate(${cx * 14}px, ${cy * 9}px)`
      if (photoLayerRef.current)
        photoLayerRef.current.style.transform = `translate(${cx * -22}px, ${cy * -14}px)`
      if (textLayerRef.current)
        textLayerRef.current.style.transform  = `translate(${cx * 5}px,  ${cy * 3}px)`

      rafRef.current = requestAnimationFrame(tick)
    }

    section.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      section.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Base radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 55% at 60% -5%, rgba(0,255,200,0.065) 0%, transparent 58%)',
        }}
        aria-hidden="true"
      />

      {/* ── Parallax ambient orbs (layer 1 – slowest) ── */}
      <div
        ref={orbLayerRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        aria-hidden="true"
      >
        <div
          className="absolute top-[12%] right-[14%] w-[420px] h-[420px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,200,0.07) 0%, transparent 70%)',
            filter: 'blur(65px)',
            animation: 'floatOrb 15s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-[18%] left-[8%] w-[320px] h-[320px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
            filter: 'blur(75px)',
            animation: 'floatOrb 20s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute top-[45%] left-[28%] w-[260px] h-[260px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,77,166,0.05) 0%, transparent 70%)',
            filter: 'blur(85px)',
            animation: 'floatOrb 25s ease-in-out infinite 4s',
          }}
        />
      </div>

      {/* Subtle grid mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,200,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.017,
        }}
        aria-hidden="true"
      />

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-52 pointer-events-none z-[2]"
        style={{ background: 'linear-gradient(to top, #08080e, transparent)' }}
        aria-hidden="true"
      />

      {/* ══════ MAIN CONTENT ══════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-14 xl:gap-20">

          {/* ── TEXT (left desktop / bottom mobile) ── */}
          <div
            ref={textLayerRef}
            className="flex-1 max-w-2xl will-change-transform"
          >
            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-7 border"
              style={{
                background: 'rgba(0,255,200,0.07)',
                borderColor: 'rgba(0,255,200,0.22)',
                color: 'var(--primary)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Open to opportunities
            </div>

            {/* Heading */}
            <div ref={titleRef}>
              <p className="text-base sm:text-lg text-muted-foreground font-medium mb-2">
                Hello, I&apos;m
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-5">
                <TypewriterName
                  text="Raj Ghetiya"
                  typeSpeed={140}
                  deleteSpeed={110}
                  pauseTime={3000}
                  className="gradient-text"
                />
              </h1>
            </div>

            {/* Description */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl text-white/65 leading-relaxed max-w-xl mb-10"
            >
              Web developer by day, competitive programmer by night — I craft
              interactive, efficient applications that push the boundaries of the web.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-14">
              <MagneticButton intensity={0.25}>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="group relative overflow-hidden px-8 py-4 rounded-full font-semibold text-base text-black
                             transition-all duration-300 hover:scale-105 active:scale-95
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), #06b6d4)',
                    boxShadow: '0 8px 30px rgba(0,255,200,0.22)',
                  }}
                >
                  <span className="relative z-10">Hire Me</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, var(--primary))' }}
                  />
                </button>
              </MagneticButton>

              <MagneticButton intensity={0.2}>
                <a
                  href="https://drive.google.com/uc?export=download&id=1X0EiQfzSWtYv7dSPY9hPpe_ZAYM7DNIB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden px-8 py-4 rounded-full font-semibold text-base
                             transition-all duration-300 hover:scale-105 active:scale-95
                             flex items-center justify-center gap-2
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  style={{
                    border: '1px solid rgba(0,255,200,0.32)',
                    color: 'var(--primary)',
                    background: 'rgba(0,255,200,0.05)',
                  }}
                >
                  <span>Download Resume</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                  </svg>
                </a>
              </MagneticButton>
            </div>

            {/* Scroll indicator */}
            <button
              onClick={() => scrollTo('#about')}
              className="flex flex-col items-center gap-1.5 text-xs text-muted-foreground
                         hover:text-primary transition-colors duration-300 group focus-visible:outline-none"
              aria-label="Scroll to About section"
            >
              <span>Scroll down</span>
              <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1
                              group-hover:border-primary/40 transition-colors duration-300">
                <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
              </div>
            </button>
          </div>

          {/* ── PROFILE PHOTO (right desktop / top mobile) ── */}
          <div
            ref={photoLayerRef}
            className="flex-shrink-0 will-change-transform"
          >
            <ProfilePhoto />
          </div>
        </div>
      </div>
    </section>
  )
})

export default HeroSection
