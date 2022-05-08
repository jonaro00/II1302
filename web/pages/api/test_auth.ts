import type { NextApiRequest, NextApiResponse } from 'next'
import { check_auth } from '../../lib/api'
import { APIErrorResponse } from '../../model/APIErrorResponse'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | APIErrorResponse>,
) {
  const [signed_in, user_id, username] = await check_auth(req, res)
  if (!signed_in) return

  res.status(200).json(`You are user ${username} with user id ${user_id}`)
}
