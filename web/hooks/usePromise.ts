import { useState, useEffect } from 'react'

/**
 * Takes a Promise or null, and returns the data or error as updated state when any of them arrive.
 * Changing promise resets data and error to null, and ignores results from any previous promises.
 * Setting promise to null makes the return values stay at null.
 * @param promise The promise to retreive results from.
 * @returns Array with `[data, error]`. Either, both are null, or one is not-null.
 */
export default function usePromise<T>(promise: Promise<T> | null): [T | null, Error | null] {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  useEffect(() => {
    // at promise change, reset data and error from previous promise results
    setData(null)
    setError(null)
    let cancelled = false
    promise
      ?.then((data: T) => cancelled || setData(data))
      .catch((error: Error) => cancelled || setError(error))
    return () => {
      cancelled = true
    }
  }, [promise])
  return [data, error]
}
