import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/** Fade in when element enters viewport */
export function useFadeInAnimation(ref, options = {}) {
  useEffect(() => {
    if (!ref?.current) return
    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 0.8,
          delay: options.delay || 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
            ...options.scrollTrigger,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])
}

/** Slide in from a direction */
export function useSlideInAnimation(ref, direction = 'up', options = {}) {
  useEffect(() => {
    if (!ref?.current) return
    const el = ref.current
    const from = {
      up: { y: 50, x: 0 },
      down: { y: -50, x: 0 },
      left: { x: -50, y: 0 },
      right: { x: 50, y: 0 },
    }[direction] || { y: 50, x: 0 }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, ...from },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: options.duration || 0.8,
          delay: options.delay || 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
            ...options.scrollTrigger,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])
}

/** Stagger children animations */
export function useStaggerAnimation(ref, selector, options = {}) {
  useEffect(() => {
    if (!ref?.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `${selector}`,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 0.6,
          stagger: options.stagger || 0.1,
          delay: options.delay || 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
            ...options.scrollTrigger,
          },
        },
        ref.current
      )
    })
    return () => ctx.revert()
  }, [])
}
