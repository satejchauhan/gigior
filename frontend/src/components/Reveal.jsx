import { useEffect, useRef } from 'react'

export function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const show = () => el.classList.add('is-in')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      show()
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          io.unobserve(el)
        }
      },
      { threshold: 0.01, rootMargin: '120px 0px' },
    )
    io.observe(el)
    const failsafe = window.setTimeout(show, 900)
    return () => {
      io.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} {...props}>
      {children}
    </Tag>
  )
}
