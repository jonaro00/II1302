import { getToken } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next/types'

/**
 * Checks user authentication on an API request.
 * Returns `[false, 0, '']` if a response is sent, and nothing more should be processed.
 * Else, returns `[true, id, username]` for the user.
 */
export async function check_auth(
  req: NextApiRequest,
  res: NextApiResponse<any>,
): Promise<[boolean, number, string]> {
  const token = await getToken({ req })
  if (!token) {
    // Not signed in
    res.status(401).json({ error: 'Unauthorized' })
    return [false, 0, '']
  }
  const { sub: id_s, name: username } = token
  const user_id = parseInt(id_s ?? '0')
  if (!user_id || !username) {
    // Something is wrong
    res.status(500).end()
    return [false, user_id, username ?? '']
  }
  return [true, user_id, username]
}
