import { useRef, memo } from 'react'
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'

const experiences = [
  {
    company: 'Newstar Infotech',
    role: 'Trainee MERN Stack Developer',
    duration: 'May 2025 – Jun 2025',
    location: 'Ahmedabad, Gujarat, India',
    type: 'Internship',
    color: '#3b82f6',
    logo: '💻',
    technologies: [
      'MongoDB',
      'Express',
      'Node.js',
      'REST APIs',
      'Mongoose',
      'EJS',
      'Passport.js',
      'Session Authentication',
    ],
    achievements: [
      'Developed a Hotel Listing web application using Node.js, Express, MongoDB, and EJS as the core training project.',
      'Designed and implemented RESTful APIs with full CRUD functionality for hotel listing and management operations.',
      'Implemented authentication using Passport.js with session-based login and secure user credential handling.',
      'Configured Passport Local Strategy for user registration, login, and protected route access.',
      'Structured backend architecture using Express routing, controllers, and middleware for clean separation of concerns.',
      'Integrated MongoDB with Mongoose schemas for efficient data modeling and validation.',
      'Implemented server-side rendering using EJS templates for dynamic content rendering.',
      'Tested and debugged API endpoints using Postman and improved overall backend performance.',
    ],
    url: 'https://www.newstarinfotech.com',
  },
]

const ExperienceSection = memo(function ExperienceSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)

  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef, 'up', { delay: 0.1 })

  return (
    <section ref={sectionRef} className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-[0.07]"
          style={{ background: 'radial-gradient(ellipse, var(--primary), transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-widest uppercase">Where I&apos;ve Worked</p>
          <h2 ref={titleRef} className="section-heading mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* Timeline */}
        <div ref={cardsRef} className="relative">
          {/* Timeline line */}
          <div className="timeline-line" />

          <div className="space-y-10 pl-10">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="relative group"
                style={{ '--exp-color': exp.color }}
              >
                {/* Timeline dot */}
                <div
                  className="timeline-dot group-hover:scale-150 group-hover:shadow-[0_0_20px_var(--exp-color)] transition-all duration-300"
                  style={{ top: '1.6rem', backgroundColor: exp.color, boxShadow: `0 0 10px ${exp.color}` }}
                />

                {/* Card */}
                <div
                  className="glass-card rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover-glow-border"
                  style={{ '--glow-color': exp.color }}
                >
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                      {/* Logo/emoji */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}
                      >
                        {exp.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg sm:text-xl font-bold text-white">{exp.role}</h3>
                          <span
                            className="text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Briefcase size={13} className="text-muted-foreground" />
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold transition-colors duration-200 flex items-center gap-1 hover:underline"
                            style={{ color: exp.color }}
                          >
                            {exp.company}
                            <ExternalLink size={11} />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-col gap-1.5 text-xs text-muted-foreground flex-shrink-0">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} style={{ color: exp.color }} />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} style={{ color: exp.color }} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-2.5 mb-5">
                    {exp.achievements.map((ach, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ background: exp.color, boxShadow: `0 0 6px ${exp.color}` }}
                        />
                        {ach}
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono font-medium px-3 py-1 rounded-full transition-all duration-200 hover:scale-105"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.7)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* "Open to work" nudge */}
        <div className="mt-12 text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border text-sm font-medium"
            style={{
              background: 'rgba(0,255,200,0.04)',
              borderColor: 'rgba(0,255,200,0.2)',
              color: 'rgba(0,255,200,0.9)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Currently seeking new full-time / internship opportunities
          </div>
        </div>
      </div>
    </section>
  )
})

export default ExperienceSection
