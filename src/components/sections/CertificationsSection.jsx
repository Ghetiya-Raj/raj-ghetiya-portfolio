import { useRef, useState, useEffect, useCallback, memo } from 'react'
import { Award, ExternalLink, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'

const CERT_MOBILE_VISIBLE  = 3
const CERT_DESKTOP_VISIBLE = 6

const certifications = [
  {
    id: 1,
    title: 'Machine Learning with Python',
    issuer: 'IBM via Coursera',
    date: 'Aug 2025',
    credentialUrl: 'https://coursera.org/verify/DB6VLXWFS2JH',
    skills: ['Machine Learning', 'Python', 'Data Science', 'AI'],
    description: "IBM's comprehensive ML course covering supervised/unsupervised learning, classification, regression, and clustering.",
    color: '#0F62FE',
  },
  {
    id: 2,
    title: 'MERN Stack Front To Back',
    issuer: 'Coursera & Packt',
    date: 'Aug 2025',
    credentialUrl: 'https://drive.google.com/file/d/1oIJWfez3S1eFwb9EbKf3RRNRPzL8SXYj/view',
    skills: ['MERN Stack', 'React', 'Redux', 'Node.js', 'MongoDB'],
    description: '3-course specialization covering full-stack MERN development, API creation, and deployment.',
    color: '#FF6B35',
  },
  {
    id: 3,
    title: 'Design and Analysis of Algorithms',
    issuer: 'NPTEL – IIT Madras',
    date: 'Jan–Mar 2025',
    credentialUrl: 'https://drive.google.com/file/d/1PYJxqtoGP4dFAysU9WA_Xwm6J_wkmN-z/view',
    skills: ['Algorithm Design', 'Complexity', 'Optimization'],
    description: '8-week NPTEL course on advanced algorithm design and analysis techniques.',
    color: '#9B59B6',
  },
  {
    id: 4,
    title: 'Data Structures & Algorithms using Java',
    issuer: 'NPTEL – IIT Kharagpur',
    date: 'Jul–Oct 2024',
    credentialUrl: 'https://drive.google.com/file/d/11YTbxIzj6wIhfJ_q2smC3oum0D0ZIX-c/view',
    skills: ['Data Structures', 'Algorithms', 'Java'],
    description: '12-week comprehensive DSA course using Java. Score: 53%',
    color: '#3776AB',
  },
  {
    id: 5,
    title: 'Getting Started with AI on Jetson Nano',
    issuer: 'NVIDIA',
    date: 'Jan 2025',
    credentialUrl: 'https://drive.google.com/file/d/1p9QpkPZhn-B_UtKZfEjXOzVIn_c4UrdZ/view',
    skills: ['AI', 'Jetson Nano', 'Deep Learning', 'Edge Computing'],
    description: 'NVIDIA Certificate of Competency for AI deployment on Jetson Nano edge devices.',
    color: '#76B900',
  },
  {
    id: 6,
    title: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    date: 'Mar 2025',
    credentialUrl: 'https://drive.google.com/file/d/1qkhJ79G7ZxN0BC87UuvvNIausw26J7Gw/view',
    skills: ['Problem Solving', 'Algorithms', 'Programming'],
    description: 'HackerRank Problem Solving (Basic) skill certification.',
    color: '#00EA64',
  },
  
]

function CertCard({ cert, index }) {
  return (
    <div
      className="cert-card group relative rounded-2xl overflow-hidden
                 transition-all duration-500 hover:-translate-y-2
                 active:scale-[0.98] active:brightness-[1.03]
                 md:hover:shadow-2xl"
      style={{
        background: 'rgba(13,13,26,0.7)',
        backdropFilter: 'blur(16px)',
        border: `1px solid rgba(255,255,255,0.06)`,
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Color line top */}
      <div className="h-1 w-full transition-all duration-300" style={{ background: cert.color }} />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 30px ${cert.color}20, 0 0 40px ${cert.color}15` }}
      />

      <div className="relative z-10 p-5 sm:p-6">
        {/* Head */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
          >
            <Award size={18} style={{ color: cert.color }} />
          </div>
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium transition-colors duration-200 flex-shrink-0 mt-1"
            style={{ color: cert.color }}
          >
            View <ExternalLink size={11} />
          </a>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-white leading-snug mb-1.5">
          {cert.title}
        </h3>

        <p className="text-xs font-semibold mb-1" style={{ color: cert.color }}>
          {cert.issuer}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <Calendar size={11} />
          {cert.date}
        </div>

        <p className="text-xs text-white/55 leading-relaxed mb-4 line-clamp-2">
          {cert.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {cert.skills.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: `${cert.color}10`,
                color: `${cert.color}cc`,
                border: `1px solid ${cert.color}25`,
              }}
            >
              {s}
            </span>
          ))}
          {cert.skills.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">
              +{cert.skills.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

const CertificationsSection = memo(function CertificationsSection() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const gridRef    = useRef(null)

  const [showAll,   setShowAll]   = useState(false)
  const [isMobile,  setIsMobile]  = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef, 'up', { delay: 0.1 })

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

  const visibleCerts =
    isMobile  && !showAll ? certifications.slice(0, CERT_MOBILE_VISIBLE)  :
    isDesktop && !showAll ? certifications.slice(0, CERT_DESKTOP_VISIBLE) :
    certifications

  const showDesktopToggle = isDesktop && certifications.length > CERT_DESKTOP_VISIBLE
  const showMobileToggle  = isMobile  && certifications.length > CERT_MOBILE_VISIBLE

  // Stagger entry — re-runs whenever visible card list changes (expand/collapse)
  // so newly revealed cards always animate in and are never left at opacity:0.
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = grid.querySelectorAll('.cert-card')

    // Only animate cards that haven't been shown yet (no explicit opacity set)
    const newCards = Array.from(cards).filter(c => !c.dataset.revealed)
    newCards.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(25px)' })

    // If nothing new to animate, bail early
    if (newCards.length === 0) return

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        newCards.forEach((c, i) => {
          setTimeout(() => {
            c.style.transition = 'opacity 0.55s ease, transform 0.55s ease'
            c.style.opacity = '1'
            c.style.transform = 'translateY(0)'
            c.dataset.revealed = 'true'
          }, i * 90)
        })
        obs.disconnect()
      }
    }, {
      // Lower threshold + positive rootMargin so the observer fires
      // even when partial section is in view on short mobile viewports.
      threshold: 0.05,
      rootMargin: '0px 0px 60px 0px',
    })

    obs.observe(grid)
    return () => obs.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCerts.length])

  return (
    <section ref={sectionRef} className="relative py-12 md:py-20 px-4 sm:px-5 lg:px-8 overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse, var(--violet), transparent)', filter: 'blur(70px)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-widest uppercase">Credentials</p>
          <h2 ref={titleRef} className="section-heading mb-4">
            Certifications & <span className="gradient-text">Achievements</span>
          </h2>
          <div className="section-divider" />
          <p className="text-muted-foreground max-w-xl mx-auto mt-5 text-sm sm:text-base">
            Professional certifications and continuous learning milestones
          </p>
        </div>

        {/* Grid with expand/collapse */}
        <div
          ref={gridRef}
          className="cert-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {visibleCerts.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>

        {/* Desktop expand button */}
        {showDesktopToggle && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleToggle}
              className="flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm
                         transition-all duration-300 hover:scale-105 active:scale-95
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
              style={{
                border: '1px solid rgba(168,85,247,0.3)',
                color: 'var(--violet)',
                background: 'rgba(168,85,247,0.05)',
              }}
            >
              {showAll ? (
                <><span>Show Less</span><ChevronUp size={16} /></>
              ) : (
                <><span>See All Certifications</span><ChevronDown size={16} /></>
              )}
            </button>
          </div>
        )}

        {/* Mobile expand button */}
        {showMobileToggle && (
          <div className="flex justify-center mt-7">
            <button
              onClick={handleToggle}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm
                         transition-all duration-300 hover:scale-105 active:scale-95
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              style={{
                border: '1px solid rgba(168,85,247,0.35)',
                color: 'var(--violet)',
                background: 'rgba(168,85,247,0.06)',
              }}
            >
              {showAll ? (
                <><span>Show Less</span><ChevronUp size={16} /></>
              ) : (
                <><span>See All ({certifications.length - CERT_MOBILE_VISIBLE} more)</span><ChevronDown size={16} /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
})

export default CertificationsSection
