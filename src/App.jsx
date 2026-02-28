import React, { Suspense, lazy, useState, useEffect } from 'react'
import Navigation from '@/components/ui/Navigation'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Loader from '@/components/ui/Loader'
import SpotlightCursor from '@/components/ui/SpotlightCursor'
import PremiumCursor from '@/components/ui/PremiumCursor'
import HeroSection from '@/components/sections/HeroSection'
import { ScrollTrigger } from '@/hooks/useGSAP'

// Code-split heavy sections
const AboutSection = lazy(() => import('@/components/sections/AboutSection'))
const SkillsSection = lazy(() => import('@/components/sections/SkillsSection'))
const ExperienceSection = lazy(() => import('@/components/sections/ExperienceSection'))
const ProjectsSection = lazy(() => import('@/components/sections/ProjectsSection'))
const EducationSection = lazy(() => import('@/components/sections/EducationSection'))
const CertificationsSection = lazy(() => import('@/components/sections/CertificationsSection'))
const ContactSection = lazy(() => import('@/components/sections/ContactSection'))

function SectionFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Ambient spotlight that trails the mouse */}
      <SpotlightCursor />

      {/* Premium dot + ring cursor (pointer devices only) */}
      <PremiumCursor />

      {/* Premium loader — hides after complete */}
      <Loader onComplete={() => setLoaded(true)} />

      {/* Main site – rendered underneath loader from the start for fast Suspense hydration */}
      <div
        className="transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0, pointerEvents: loaded ? 'auto' : 'none' }}
        aria-hidden={!loaded}
      >
        <ScrollProgress />
        <Navigation />

        <main>
          <section id="home">
            <HeroSection />
          </section>

          <Suspense fallback={<SectionFallback />}>
            <section id="about">
              <AboutSection />
            </section>
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <section id="skills">
              <SkillsSection />
            </section>
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <section id="experience">
              <ExperienceSection />
            </section>
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <section id="education">
              <EducationSection />
            </section>
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <section id="projects">
              <ProjectsSection />
            </section>
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <section id="certifications">
              <CertificationsSection />
            </section>
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <section id="contact">
              <ContactSection />
            </section>
          </Suspense>
        </main>

        <footer className="w-full bg-black/40 backdrop-blur-sm border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-lg font-bold tracking-wider text-primary">Raj Ghetiya</div>
            <div className="text-xs text-muted-foreground">
              © 2026 Raj Ghetiya. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
