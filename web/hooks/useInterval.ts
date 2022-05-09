import { useEffect } from 'react'

/**
 * Wraps `setInterval` to call a function repeatedly.
 * @param callback The function to call.
 * @param ms Number of milliseconds between each call.
 * @param callImmediately Whether the function should be called immediately when this hook is refreshed.
 */
export default function useInterval(
  callback: () => void,
  ms?: number,
  callImmediately: boolean = true,
) {
  useEffect(() => {
    if (callImmediately) callback()
    const timer = setInterval(callback, ms)
    return () => clearInterval(timer)
  }, [callback, callImmediately, ms])
}
