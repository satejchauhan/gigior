import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '../lib/SmoothScroll'

let played = false

function shouldPlay(pathname) {
  if (played || pathname !== '/') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return true
}

function markReady() {
  document.documentElement.classList.add('is-ready')
  window.dispatchEvent(new Event('gigior:ready'))
}

export function Loader() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  const [phase, setPhase] = useState(() => (shouldPlay(pathname) ? 'play' : 'done'))

  useEffect(() => {
    if (phase === 'play') lenis?.stop()
    else lenis?.start()
  }, [phase, lenis])

  useEffect(() => {
    if (phase !== 'play') {
      played = true
      markReady()
      return undefined
    }
    document.documentElement.classList.remove('is-ready')
    const leave = window.setTimeout(() => {
      markReady()
      setPhase('leave')
    }, 1700)
    const done = window.setTimeout(() => {
      played = true
      setPhase('done')
    }, 2200)
    return () => {
      window.clearTimeout(leave)
      window.clearTimeout(done)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`loader ${phase === 'leave' ? 'is-leave' : ''}`} aria-hidden="true">
      <div className="loader__lock">
        <span className="loader__mark">
          <span className="loader__fill" />
        </span>
      </div>
    </div>
  )
}
