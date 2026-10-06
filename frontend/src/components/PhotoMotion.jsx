import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GROUPS = '.team-row, .mosaic, .story__grid, .work-grid, .ba__pair, .ba-grid'

export function PhotoMotion() {
  const { pathname } = useLocation()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = new WeakSet()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    )

    const watch = (el) => {
      if (seen.has(el)) return
      seen.add(el)
      const group = el.closest(GROUPS)
      const peers = group ? [...group.querySelectorAll('.photo')] : [el]
      const index = Math.max(0, peers.indexOf(el))
      el.style.setProperty('--photo-delay', `${Math.min(index, 5) * 0.14}s`)
      if (reduce) {
        el.classList.add('is-in')
        return
      }
      io.observe(el)
    }

    const scan = () => document.querySelectorAll('.photo').forEach(watch)
    scan()
    const root = document.getElementById('main') || document.body
    const mo = new MutationObserver(scan)
    mo.observe(root, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  return null
}
