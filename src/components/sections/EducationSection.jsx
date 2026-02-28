import { useRef, memo } from 'react'
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'

const education = [
  {
    degree: 'Bachelor of Computer Science and Engineering',
    institution: 'Charotar University of Science and Technology',
    location: 'Anand, Gujarat',
    period: '2023 – 2027',
    result: 'CGPA: 9.39 / 10',
    resultColor: '#22c55e',
    color: '#00ffc8',
    icon: GraduationCap,
    iconBg: 'rgba(0,255,200,0.1)',
    iconColor: '#00ffc8',
  },
  {
    degree: 'Higher Secondary Education',
    institution: 'Delta Science School',
    location: 'Upleta, Gujarat',
    period: '2022 – 2023',
    result: 'Percentile: 89.18',
    resultColor: '#22c55e',
    color: '#ff4da6',
    icon: GraduationCap,
    iconBg: 'rgba(255,77,166,0.1)',
    iconColor: '#ff4da6',
  },
  {
    degree: 'Secondary School Education',
    institution: 'Delta Science School',
    location: 'Upleta, Gujarat',
    period: '2019 – 2020',
    result: 'Percentile: 98.38',
    resultColor: '#22c55e',
    color: '#f97316',
    icon: GraduationCap,
    iconBg: 'rgba(249,115,22,0.1)',
    iconColor: '#f97316',
  },
]

const EducationSection = memo(function EducationSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef, 'up', { delay: 0.1 })

  return (
    <section ref={sectionRef} className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-widest uppercase">Academic Journey</p>
          <h2 ref={titleRef} className="section-heading mb-4">
            My <span className="gradient-text">Education</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="space-y-6">
          {education.map((edu, i) => {
            const Icon = edu.icon
            return (
              <div
                key={i}
                className="group glass-card rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover-glow-border"
                style={{ '--glow-color': edu.color }}
              >
                {/* Decorative accent line */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-1 rounded-full hidden sm:block transition-all duration-300 group-hover:h-full group-hover:top-0 group-hover:bottom-0"
                  style={{ background: `linear-gradient(to bottom, ${edu.color}, transparent)` }}
                />

                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:scale-110 group-hover:rotate-6 self-center sm:self-start"
                    style={{ background: edu.iconBg, border: `1px solid ${edu.color}30` }}
                  >
                    <Icon size={24} style={{ color: edu.iconColor }} />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight group-hover:transition-colors duration-300"
                      style={{ ['--hover-color']: edu.color }}>
                      {edu.degree}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-white/70 mb-2 flex-wrap justify-center sm:justify-start">
                      <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                        <MapPin size={13} className="text-muted-foreground" />
                        <span className="font-semibold">{edu.institution}</span>
                      </div>
                      <span className="hidden sm:inline text-white/30">•</span>
                      <span>{edu.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-white/60 mb-3 justify-center sm:justify-start">
                      <Calendar size={13} className="text-muted-foreground" />
                      <span>{edu.period}</span>
                    </div>

                    <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                      <Award size={14} style={{ color: edu.resultColor }} />
                      <span className="font-semibold text-sm" style={{ color: edu.resultColor }}>
                        {edu.result}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
})

export default EducationSection
