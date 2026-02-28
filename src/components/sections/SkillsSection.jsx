import { useRef, useState, useEffect, memo } from 'react'
import {
  SiHtml5, SiCss3, SiTailwindcss, SiJavascript, SiTypescript,
  SiReact, SiNodedotjs, SiExpress,
  SiMongodb,SiMysql, SiC, SiCplusplus, SiPython, SiGit, SiGithub,SiOpenjdk,
  SiBootstrap
} from 'react-icons/si'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'

const skills = [
  { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', icon: SiCss3, color: '#1572B6' },
  { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Express', icon: SiExpress, color: '#68A063' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'SQL', icon: SiMysql, color: '#4479A1' },
  { name: 'C', icon: SiC, color: '#A8B9CC' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
  { name: 'Java', icon: SiOpenjdk, color: '#F89820', label: 'Java' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
  
]

function SkillCard({ skill, index }) {
  const Icon = skill.icon
  return (
    <div
      data-reveal
      className="group relative glass-card rounded-2xl p-5 text-center transition-all duration-400 hover:scale-110 hover:-translate-y-2 cursor-default"
      style={{
        '--glow': skill.color,
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ boxShadow: `inset 0 0 20px ${skill.color}20, 0 0 30px ${skill.color}15` }}
      />
      <div className="relative z-10">
        {Icon ? (
          <Icon
            size={36}
            className="mx-auto mb-3 transition-all duration-300 group-hover:scale-110"
            style={{ color: skill.color, filter: `drop-shadow(0 0 8px ${skill.color}80)` }}
          />
        ) : (
          <div
            className="w-9 h-9 mx-auto mb-3 font-black text-sm flex items-center justify-center rounded transition-all duration-300 group-hover:scale-110"
            style={{ color: skill.color, filter: `drop-shadow(0 0 8px ${skill.color}80)`, fontSize: '14px', fontFamily: 'JetBrains Mono, monospace' }}
          >
            {skill.label || skill.name}
          </div>
        )}
        <p className="text-xs font-medium text-white/70 group-hover:text-white transition-colors duration-300">
          {skill.name}
        </p>
      </div>
    </div>
  )
}

const SkillsSection = memo(function SkillsSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)

  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef, 'up', { delay: 0.1 })

  // Stagger reveal using IntersectionObserver
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = grid.querySelectorAll('[data-reveal]')
    cards.forEach(c => {
      c.style.opacity = '0'
      c.style.transform = 'translateY(30px)'
    })
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cards.forEach((c, i) => {
          setTimeout(() => {
            c.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
            c.style.opacity = '1'
            c.style.transform = 'translateY(0)'
          }, i * 55)
        })
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    obs.observe(grid)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,200,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-widest uppercase">What I use</p>
          <h2 ref={titleRef} className="section-heading mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="section-divider" />
          <p className="text-muted-foreground max-w-xl mx-auto mt-6">
            Technologies and frameworks I work with daily
          </p>
        </div>

        {/* Skills grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-4 mb-16"
        >
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { n: '17+', l: 'Technologies', c: '#00ffc8' },
            { n: '6+', l: 'Projects', c: '#ff4da6' },
            { n: '2+', l: 'Months Exp', c: '#06b6d4' },
            { n: '4', l: 'Skill Areas', c: '#a855f7' },
          ].map(({ n, l, c }) => (
            <div key={l} className="text-center group">
              <div
                className="text-3xl sm:text-4xl font-black mb-1 group-hover:scale-110 transition-transform duration-300"
                style={{ color: c, textShadow: `0 0 20px ${c}60` }}
              >
                {n}
              </div>
              <div className="text-xs text-muted-foreground font-medium">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default SkillsSection
