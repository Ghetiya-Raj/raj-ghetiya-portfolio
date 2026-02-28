import { useRef, useState, useEffect, useCallback, memo } from 'react'
import { Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'

// Limits — change to control initial visible count
const MOBILE_VISIBLE  = 3
const DESKTOP_VISIBLE = 6

const projects = [
  {
    id: 1,
    title: 'Electrotrack',
    description: 'Advanced electronics tracking and inventory management system with real-time monitoring capabilities.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/kunj24/Electrotrack',
    category: 'Full Stack',
    gradient: 'from-cyan-500 to-blue-600',
    accent: '#00ffc8',
  },
  {
    id: 2,
    title: 'FaceBeats',
    description: 'AI-powered facial recognition music recommendation system that analyzes emotions to suggest personalized playlists.',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'ML'],
    githubUrl: 'https://github.com/kunj24/facebeats',
    category: 'AI/ML',
    gradient: 'from-pink-500 to-rose-600',
    accent: '#ff4da6',
  },
  {
    id: 3,
    title: 'Wanderlust',
    description: 'Full-stack hotel listing platform with authentication, review system, and MongoDB Atlas. Features CRUD, star ratings, and responsive design.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Bootstrap', 'Passport.js'],
    githubUrl: 'https://github.com/kunj24/wanderlust',
    liveUrl: 'https://wanderlust-sylk.onrender.com',
    category: 'Full Stack',
    gradient: 'from-orange-500 to-yellow-500',
    accent: '#f97316',
  },
  {
    id: 4,
    title: 'Thinkly',
    description: 'Learning platform built with the MERN stack, featuring courses, user progress tracking, and instructor dashboards.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript'],
    githubUrl: 'https://github.com/kunj24/Thinkly',
    category: 'MERN Stack',
    gradient: 'from-violet-500 to-purple-600',
    accent: '#a855f7',
  },
  {
    id: 5,
    title: 'HACK-MASTER',
    description: 'Crop-prediction system that lets farmers input local parameters and returns recommended crops using ML models.',
    technologies: ['Python', 'scikit-learn', 'TensorFlow', 'Pandas', 'Flask'],
    githubUrl: 'https://github.com/kunj24/HACK-MASTER',
    category: 'AI/ML',
    gradient: 'from-green-500 to-emerald-600',
    accent: '#22c55e',
  },
  {
    id: 6,
    title: 'Portfolio',
    description: 'Personal portfolio built with Next.js, showcasing projects, 3D scenes, and interactive UI components.',
    technologies: ['Next.js', 'React', 'Three.js', 'Tailwind CSS', 'TypeScript'],
    githubUrl: 'https://github.com/kunj24/portfolio',
    liveUrl: 'https://portfolio-ruby-iota-47.vercel.app/',
    category: 'Personal',
    gradient: 'from-sky-500 to-indigo-600',
    accent: '#0ea5e9',
  },
  
]

function ProjectCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    setIsTouch(('ontouchstart' in window) || navigator.maxTouchPoints > 0)
  }, [])

  const handleMove = useCallback((e) => {
    if (isTouch || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 14
    setTilt({ x, y })
  }, [isTouch])

  return (
    <div
      ref={cardRef}
      className="group relative glass-card rounded-2xl overflow-hidden
                 transition-all duration-500 hover:-translate-y-2 hover-glow-border
                 active:scale-[0.98] active:brightness-[1.04]"
      style={{
        transform: hovered && !isTouch
          ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(-8px)`
          : 'perspective(1000px) rotateY(0) rotateX(0)',
        '--glow-color': project.accent,
        animationDelay: `${index * 0.1}s`,
        /* No background-color change on active — only scale + brightness */
      }}
      onMouseEnter={() => !isTouch && setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
    >
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.accent}10, transparent 70%)` }}
      />

      {/* Shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 overflow-hidden pointer-events-none transition-opacity duration-500">
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -skew-x-12" />
      </div>

      <div className="relative z-10 p-6 sm:p-7 h-full flex flex-col">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}30` }}
          >
            {project.category}
          </span>
          <div className="flex gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200 hover:scale-110"
              aria-label={`GitHub - ${project.title}`}
            >
              <Github size={16} />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label={`Live demo - ${project.title}`}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
          style={{ '--from': project.accent }}
        >
          {project.title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed mb-5 flex-1">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2.5 py-1 rounded-lg transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const ProjectsSection = memo(function ProjectsSection() {
  const sectionRef  = useRef(null)
  const titleRef    = useRef(null)
  const gridRef     = useRef(null)

  const [showAll,     setShowAll]     = useState(false)
  const [isMobile,    setIsMobile]    = useState(false)
  const [isDesktop,   setIsDesktop]   = useState(false)

  // Responsive detection
  useEffect(() => {
    const mqMobile  = window.matchMedia('(max-width: 639px)')
    const mqDesktop = window.matchMedia('(min-width: 1024px)')
    const update = () => {
      setIsMobile(mqMobile.matches)
      setIsDesktop(mqDesktop.matches)
    }
    update()
    mqMobile.addEventListener('change',  update)
    mqDesktop.addEventListener('change', update)
    return () => {
      mqMobile.removeEventListener('change',  update)
      mqDesktop.removeEventListener('change', update)
    }
  }, [])

  const handleToggle = useCallback(() => {
    setShowAll((prev) => !prev)
  }, [])

  // Determine visible slice
  const visibleProjects =
    isMobile  && !showAll ? projects.slice(0, MOBILE_VISIBLE)  :
    isDesktop && !showAll ? projects.slice(0, DESKTOP_VISIBLE) :
    projects

  const showDesktopToggle = isDesktop && projects.length > DESKTOP_VISIBLE
  const showMobileToggle  = isMobile  && projects.length > MOBILE_VISIBLE

  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef, 'up', { delay: 0.1 })

  return (
    <section ref={sectionRef} className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, var(--accent), transparent)', filter: 'blur(60px)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-widest uppercase">What I&apos;ve built</p>
          <h2 ref={titleRef} className="section-heading mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* Cards grid — animated height on expand */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Desktop expand/collapse */}
        {showDesktopToggle && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleToggle}
              className="flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm
                         transition-all duration-300 hover:scale-105 active:scale-95
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              style={{
                border: '1px solid rgba(0,255,200,0.28)',
                color: 'var(--primary)',
                background: 'rgba(0,255,200,0.05)',
              }}
            >
              {showAll ? (
                <><span>Show Less</span><ChevronUp size={16} /></>
              ) : (
                <><span>See All Projects</span><ChevronDown size={16} /></>
              )}
            </button>
          </div>
        )}

        {/* Mobile expand/collapse */}
        {showMobileToggle && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleToggle}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm
                         transition-all duration-300 hover:scale-105 active:scale-95
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              style={{
                border: '1px solid rgba(0,255,200,0.3)',
                color: 'var(--primary)',
                background: 'rgba(0,255,200,0.06)',
              }}
            >
              {showAll ? (
                <><span>Show Less</span><ChevronUp size={16} /></>
              ) : (
                <><span>See All Projects ({projects.length - MOBILE_VISIBLE} more)</span><ChevronDown size={16} /></>
              )}
            </button>
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="https://github.com/kunj24"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm
                       transition-all duration-300 hover:scale-105 active:scale-95 border"
            style={{
              border: '1px solid rgba(0,255,200,0.3)',
              color: 'var(--primary)',
              background: 'rgba(0,255,200,0.05)',
            }}
          >
            <Github size={18} />
            See all projects on GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  )
})

export default ProjectsSection
