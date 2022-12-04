import type React from 'react'
import { useEffect, useRef } from 'react'

export interface Size {
  width: number
  height: number
}

export default function useSize(
  ref: React.RefObject<HTMLElement>,
  deps: any[] = [],
): Size | null {
  const sizeRef: React.MutableRefObject<Size | null> = useRef(null)

  useEffect(() => {
    if (ref.current) {
      sizeRef.current = {
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      }
    }
  }, deps)

  return sizeRef.current
}
