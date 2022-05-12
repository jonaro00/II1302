import { useEffect, useRef } from 'react'

/**
 * Wraps `setInterval` to call a function repeatedly.
 * TypeScript-adapted implementation from https://overreacted.io/making-setinterval-declarative-with-react-hooks/ (recommended read).
 * @param callback The function to call.
 * @param ms Number of milliseconds between each call. `undefined` calls as often as possible. `null` stops the interval.
 * @param callImmediately Whether the function should be called immediately when this hook is refreshed.
 */
export default function useInterval(
  callback: () => void,
  ms?: number | null,
  callImmediately: boolean = true,
) {
  // Use a ref for callback so that it can be changed in-place, without resetting the timer
  const savedCallback = useRef<() => void>()
  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback
    if (callImmediately) callback()
  }, [callback, callImmediately])
  useEffect(() => {
    // Pause the interval if ms === null
    if (ms !== null) {
      // pass the reference to the callback and call it
      const tick = () => (savedCallback.current ? savedCallback.current() : null)
      const timer = setInterval(tick, ms)
      // stop the interval
      return () => clearInterval(timer)
    }
  }, [callImmediately, ms])
}
