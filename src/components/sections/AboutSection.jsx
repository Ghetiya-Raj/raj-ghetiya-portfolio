import { useRef, memo } from 'react'
import { GraduationCap, Code2, Trophy, Lightbulb } from 'lucide-react'
import { useFadeInAnimation, useSlideInAnimation, useStaggerAnimation } from '@/hooks/useGSAP'

const highlightCards = [
  {
    icon: GraduationCap,
    title: 'B.Tech CE',
    description: 'Charotar University of Science & Technology',
    accent: '#00ffc8',
  },
  {
    icon: Code2,
    title: 'Full Stack Developer',
    description: 'React · Node.js · MongoDB · Express.js',
    accent: '#a855f7',
  },
  {
    icon: Trophy,
    title: 'CP Enthusiast',
    description: 'Competitive Programmer · LeetCode · Codeforces',
    accent: '#ff4da6',
  },
  {
    icon: Lightbulb,
    title: 'Problem Solver',
    description: 'Efficient & elegant algorithmic thinking',
    accent: '#06b6d4',
  },
]

const AboutSection = memo(function AboutSection() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const cardsRef   = useRef(null)

  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef, 'up', { delay: 0.1 })
  useStaggerAnimation(cardsRef, '.highlight-card', { delay: 0.2, stagger: 0.1 })

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Soft ambient — no color flashing */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, var(--primary), transparent 70%)', filter: 'blur(90px)' }} />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, var(--violet), transparent 70%)', filter: 'blur(90px)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ──────────────────────────────── */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-widest uppercase">Who I am</p>
          <h2 ref={titleRef} className="section-heading mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* ── Two-column layout ───────────────────── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">

          {/* Left — bio card */}
          <div className="h-full">
            <div className="glass-card rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-center gap-4">
              <p className="text-[0.97rem] sm:text-base leading-7 text-white/80 [text-wrap:pretty]">
                I&apos;m a <span className="text-primary font-semibold">B.Tech Computer Engineering</span> student at Charotar University of Science and Technology, passionate about Web Development and Competitive Programming.
              </p>
              <p className="text-[0.97rem] sm:text-base leading-7 text-white/65 [text-wrap:pretty]">
                I&apos;m seeking opportunities to leverage my full-stack skills to contribute to innovative, real-world projects and create meaningful impact through technology.
              </p>
              <p className="text-[0.97rem] sm:text-base leading-7 text-white/65 [text-wrap:pretty]">
                I love building <span className="text-accent font-medium">intuitive web applications</span>, tackling complex algorithmic challenges, and continuously growing as an engineer.
              </p>
            </div>
          </div>

          {/* Right — 2×2 highlight cards */}
          <div ref={cardsRef} className="grid grid-cols-2 gap-4" style={{ gridTemplateRows: 'repeat(2, 1fr)' }}>
            {highlightCards.map(({ icon: Icon, title, description, accent }) => (
              <div
                key={title}
                className="highlight-card flex flex-col gap-3 p-5 rounded-2xl opacity-0
                           transition-transform duration-300 hover:-translate-y-0.5"
                style={{
                  background: `${accent}08`,
                  border: `1px solid ${accent}25`,
                  boxShadow: `0 2px 16px 0 ${accent}0e`,
                }}
              >
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ background: `${accent}18` }}
                >
                  <Icon className="w-4 h-4" style={{ color: accent }} />
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight mb-1" style={{ color: accent }}>
                    {title}
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
})

export default AboutSection
