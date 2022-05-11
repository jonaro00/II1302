import type { NextApiRequest, NextApiResponse } from 'next'
import { DAO } from '../../../integration/DAO'
import { check_auth } from '../../../lib/api'
import { APIErrorResponse } from '../../../model/APIErrorResponse'
import { SensorType } from '../../../model/Sensor'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<SensorType> | APIErrorResponse>,
) {
  const [signed_in, user_id] = await check_auth(req, res)
  if (!signed_in) return

  const dao = await DAO.getInstance()

  try {
    const sensors = await dao.getSensors(user_id)
    res.status(200).json(sensors)
  } catch (error) {
    res.status(500).json({ error: 'Internal error' })
  }
}
