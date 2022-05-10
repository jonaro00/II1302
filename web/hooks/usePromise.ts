import { useState, useEffect } from 'react'

export default function usePromise<T>(promise: Promise<T> | null): [T | null, Error | null] {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  useEffect(() => {
    // at promise change, reset data and error from previous promise results
    setData(null)
    setError(null)
    let cancelled = false
    promise
      ?.then((data: T) => {
        if (!cancelled) setData(data)
      })
      .catch((error: Error) => {
        if (!cancelled) setError(error)
      })
    return () => {
      cancelled = true
    }
  }, [promise])
  return [data, error]
}
