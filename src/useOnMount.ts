import { type EffectCallback, useEffect } from 'react'

export default function useOnMount(
  fn: (() => Promise<void>) | EffectCallback,
): void {
  useEffect(() => {
    const r = fn()

    if (typeof r === 'function') {
      return r
    }
  }, [])
}
