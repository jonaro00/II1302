import type { NextApiRequest, NextApiResponse } from 'next'
import { DAO } from '../../../../integration/DAO'
import { check_auth } from '../../../../lib/api'
import { APIErrorResponse } from '../../../../model/APIErrorResponse'
import { SensorUserData } from '../../../../model/Sensor'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void | APIErrorResponse>,
) {
  const [signed_in, user_id] = await check_auth(req, res)
  if (!signed_in) return

  const dao = await DAO.getInstance()

  try {
    const sensor_id = parseInt(req.query.sensor_id as string)
    const sensor = JSON.parse(req.body) as SensorUserData
    await dao.updateSensor(user_id, sensor_id, sensor)
    res.status(200).end()
  } catch (error) {
    res.status(500).json({ error: 'Internal error' })
  }
}
