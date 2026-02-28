import { useState, useEffect, useCallback } from 'react'
import { Menu, X, Github, Linkedin } from 'lucide-react'
import { SiLeetcode } from 'react-icons/si'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Ghetiya-Raj', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rajghetiya61', Icon: Linkedin },
  { label: 'LeetCode', href: 'https://leetcode.com/u/Ghetiya_Raj/', Icon: SiLeetcode },
]

function scrollTo(id) {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
    const offset = window.scrollY + window.innerHeight / 3
    for (const link of NAV_LINKS) {
      const el = document.querySelector(link.href)
      if (el && el.offsetTop <= offset && el.offsetTop + el.offsetHeight > offset - 50) {
        setActive(link.href)
        break
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleClick = (href) => {
    setMobileOpen(false)
    scrollTo(href)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08080e]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-column grid: left logo | center links | right icons */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16">

          {/* LEFT: Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleClick('#home')}
              className="nav-logo font-bold text-xl tracking-widest select-none"
              aria-label="Scroll to top"
            >
              RG
            </button>
          </div>

          {/* CENTER: Desktop nav links */}
          <ul className="hidden lg:flex items-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleClick(link.href)}
                  className={`nav-item-link px-3 py-2 text-sm font-medium${
                    active === link.href ? ' active' : ''
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* RIGHT: Social icons (desktop) + Hamburger (mobile) */}
          <div className="col-start-3 flex items-center justify-end gap-1">

            {/* Social icons — desktop only */}
            <div className="hidden lg:flex items-center gap-1">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="nav-social-icon"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors duration-200"
              style={{ color: 'var(--muted-foreground)' }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className="lg:hidden nav-mobile-menu"
        style={{
          maxHeight: mobileOpen ? '520px' : '0px',
          opacity: mobileOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.32s ease, opacity 0.25s ease',
          borderTop: mobileOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
          background: 'rgba(8,8,14,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <ul className="flex flex-col px-4 py-3 gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleClick(link.href)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  color: active === link.href ? 'var(--primary)' : 'var(--muted-foreground)',
                  background: active === link.href ? 'rgba(0,255,200,0.07)' : 'transparent',
                }}
              >
                {link.label}
              </button>
            </li>
          ))}

          {/* Social icons in mobile menu */}
          <li>
            <div
              className="flex items-center gap-3 px-4 pt-3 pb-1 mt-2"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="nav-social-icon"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}
