import { useEffect, useRef } from 'react'

export default function useTimeout(
  duration: number,
  handler: () => void,
  deps: any[] = [],
): [start: () => void, cancel: () => void] {
  const timeoutRef = useRef<number | null>(null)

  const cancel = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }
  }

  const start = () => {
    cancel()
    timeoutRef.current = window.setTimeout(handler, duration)
  }

  useEffect(() => cancel, deps)

  return [start, cancel]
}
