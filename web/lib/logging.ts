const dev = process.env.NODE_ENV === 'development'

/**
 * console.log something if we are in development
 */
export function dev_log(message?: any, ...optionalParams: any[]) {
  if (dev) console.log(message, ...optionalParams)
}
