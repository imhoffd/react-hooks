import { useEffect, useState } from 'react'

import useMutexTimeout from './useMutexTimeout'

export type TransitionState =
  | 'enter'
  | 'entering'
  | 'entered'
  | 'exit'
  | 'exiting'
  | 'exited'

export const defaultFallbackDelay = 0
export const defaultDelay = 250
export const defaultDuration = 200

export interface UseStatefulTransitionOptions {
  enterDelay?: boolean | number
  enterDuration?: number
  exitDelay?: boolean | number
  exitDuration?: number
  initialState?: TransitionState
}

export default function useStatefulTransition(
  enter: boolean,
  options: UseStatefulTransitionOptions,
  deps: any[] = [],
): TransitionState {
  const [state, setState] = useState<TransitionState>(
    options.initialState ?? 'exited',
  )

  const {
    enterDelay: _enterDelay = false,
    enterDuration = defaultDuration,
    exitDelay: _exitDelay = false,
    exitDuration = defaultDuration,
  } = options

  const enterDelay =
    typeof _enterDelay === 'number'
      ? _enterDelay
      : _enterDelay
      ? defaultDelay
      : defaultFallbackDelay

  const exitDelay =
    typeof _exitDelay === 'number'
      ? _exitDelay
      : _exitDelay
      ? defaultDelay
      : defaultFallbackDelay

  const startEnter = () => {
    setState('enter')
    startEnteringDelay()
  }

  const startExit = () => {
    setState('exit')
    startExitingDelay()
  }

  const startEntering = () => {
    setState('entering')
    startEnteredDuration()
  }

  const startExiting = () => {
    setState('exiting')
    startExitedDuration()
  }

  const startEntered = () => setState('entered')
  const startExited = () => setState('exited')

  const [startEnteringDelay, startExitingDelay, cancelDelay] = useMutexTimeout(
    [enterDelay, exitDelay],
    [startEntering, startExiting],
    deps,
  )

  const [startEnteredDuration, startExitedDuration, cancelDuration] =
    useMutexTimeout(
      [enterDuration, exitDuration],
      [startEntered, startExited],
      deps,
    )

  const cancel = () => {
    cancelDelay()
    cancelDuration()
  }

  useEffect(() => {
    cancel()

    if (enter) {
      if (state === 'exit' || state === 'exiting') {
        startEntering()
      } else if (state !== 'entered') {
        startEnter()
      }
    } else {
      if (state === 'enter' || state === 'entering') {
        startExiting()
      } else if (state !== 'exited') {
        startExit()
      }
    }

    return cancel
  }, [enter])

  return state
}
