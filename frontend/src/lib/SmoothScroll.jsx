import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

const SmoothContext = createContext(null)

export function SmoothScroll({ children }) {
  const { pathname } = useLocation()
  const [lenis, setLenis] = useState(null)
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useEffect(() => {
    if (reduced) return undefined
    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
    })
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  useEffect(() => {
    if (reduced) {
      window.scrollTo(0, 0)
      return
    }
    lenis?.scrollTo(0, { immediate: true })
  }, [pathname, lenis, reduced])

  return <SmoothContext.Provider value={lenis}>{children}</SmoothContext.Provider>
}

export function useLenis() {
  return useContext(SmoothContext)
}
