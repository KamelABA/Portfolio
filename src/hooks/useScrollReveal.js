import { useEffect, useRef } from 'react'

/**
 * IntersectionObserver-based scroll reveal hook.
 * Adds the 'visible' class to elements with class 'reveal' when they enter the viewport.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px 0px -60px 0px',
      }
    )

    // Observe all .reveal children + the node itself if it has .reveal
    const revealElements = node.querySelectorAll('.reveal')
    revealElements.forEach((el) => observer.observe(el))
    if (node.classList.contains('reveal')) {
      observer.observe(node)
    }

    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return ref
}

export default useScrollReveal
