import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { APIErrorResponse } from '../../model/APIErrorResponse'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | APIErrorResponse>,
) {
  const token = await getToken({ req })
  if (!token) {
    // Not signed in
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  const { sub: id_s, name: username } = token
  const id = parseInt(id_s ?? '0')
  if (!id || !username) {
    // Something is wrong
    res.status(500).end()
    return
  }

  res.status(200).json(`You are user ${username} with user id ${id}`)
}
