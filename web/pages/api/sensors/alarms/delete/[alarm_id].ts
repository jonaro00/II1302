import type { NextApiRequest, NextApiResponse } from 'next'
import { DAO } from '../../../../../integration/DAO'
import { check_auth } from '../../../../../lib/api'
import { APIErrorResponse } from '../../../../../model/APIErrorResponse'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void | APIErrorResponse>,
) {
  const [signed_in, user_id] = await check_auth(req, res)
  if (!signed_in) return

  const dao = await DAO.getInstance()

  try {
    // const alarm_id = req.query.alarm_id
    // dao.deleteAlarm(user_id, alarm_id)

    res.status(200).end()
  } catch (error) {
    res.status(500).json({ error: 'Internal error' })
  }
}
