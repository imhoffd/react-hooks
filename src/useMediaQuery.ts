import { useEffect, useState } from 'react'

export default function useMediaQuery(query: string): boolean | null {
  const getMatches = (query: string): boolean | null => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }

    return null
  }

  const [matches, setMatches] = useState<boolean | null>(getMatches(query))

  useEffect(() => {
    const handleChange = () => setMatches(getMatches(query))
    const matchMedia = window.matchMedia(query)

    handleChange()

    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
