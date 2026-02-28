import { useEffect, useRef } from 'react'

/**
 * IntersectionObserver-based scroll animation hook.
 * Adds/removes a CSS class when element enters the viewport.
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-fade-in-up')
          el.style.opacity = '1'
          if (!options.repeat) observer.unobserve(el)
        } else if (options.repeat) {
          el.classList.remove('animate-fade-in-up')
          el.style.opacity = '0'
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -60px 0px',
      }
    )

    el.style.opacity = '0'
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

/**
 * Reveals multiple children with a stagger delay.
 */
export function useStaggerReveal(selector = '[data-reveal]', delay = 100) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.querySelectorAll(selector)
    items.forEach((item) => { item.style.opacity = '0'; item.style.transform = 'translateY(30px)' })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((item, i) => {
            setTimeout(() => {
              item.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
              item.style.opacity = '1'
              item.style.transform = 'translateY(0)'
            }, i * delay)
          })
          observer.unobserve(container)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return containerRef
}
