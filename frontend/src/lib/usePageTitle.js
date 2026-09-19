import { useEffect } from 'react'

export function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} — GIGIOR` : 'GIGIOR — Salon · Aesthetic'
    return () => {
      document.title = previous
    }
  }, [title])
}
