import { useEffect } from 'react'

/**
 * Console logs a value every time it changes.
 * @param value The value to log.
 */
export default function useUpdateLogger(value: any) {
  useEffect(() => {
    console.log(value)
  }, [value])
}
