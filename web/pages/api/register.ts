import type { NextApiRequest, NextApiResponse } from 'next'
import type { UserCredentials, UserType } from '../../model/User'
import { DAO } from '../../integration/DAO'
import { APIErrorResponse } from '../../model/APIErrorResponse'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserType | APIErrorResponse>,
) {
  if (req.method !== 'POST') {
    // Method not allowed
    res.status(405).end()
    return
  }

  try {
    const { username, password } = req.body as UserCredentials
    if (username === undefined || password === undefined) throw new Error() // refactor
    const dao = await DAO.getInstance()
    try {
      const { id, username: name, createdAt, updatedAt } = await dao.register(username, password)
      // OK
      res.status(200).json({ id, username: name, createdAt, updatedAt })
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  } catch (error) {
    // Bad Request
    res.status(400).json({ error: 'Incorrect Request format.' })
  }
}
