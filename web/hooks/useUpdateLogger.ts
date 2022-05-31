import { useEffect } from 'react'
import { dev_log } from '../lib/logging'

/**
 * Console logs a value every time it changes. (only in development)
 * @param value The value to log.
 * @param name An optional prefix to log before the value.
 */
export default function useUpdateLogger(value: any, name?: string): void {
  useEffect(() => {
    if (name) dev_log(name + '=', value)
    else dev_log(value)
  }, [name, value])
}
