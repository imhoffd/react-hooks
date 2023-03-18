import { useState } from 'react'

import useOnMount from './useOnMount'

export default function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)

  useOnMount(() => {
    setMounted(true)
  })

  return mounted
}
