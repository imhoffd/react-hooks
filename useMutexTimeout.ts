import useTimeout from './useTimeout'

export default function useMutexTimeout(
  durations: number | [number, number],
  handlers: [() => void, () => void],
  deps: any[] = [],
): [start1: () => void, start2: () => void, cancel: () => void] {
  const [duration1, duration2] =
    typeof durations === 'number' ? [durations, durations] : durations
  const [handler1, handler2] = handlers
  const [start1, cancel1] = useTimeout(duration1, handler1, deps)
  const [start2, cancel2] = useTimeout(duration2, handler2, deps)

  return [
    () => {
      start1()
      cancel2()
    },
    () => {
      start2()
      cancel1()
    },
    () => {
      cancel1()
      cancel2()
    },
  ]
}
