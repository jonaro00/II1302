import type { NextApiRequest, NextApiResponse } from 'next'
import { DAO } from '../../../../integration/DAO'
import { check_auth } from '../../../../lib/api'
import { APIErrorResponse } from '../../../../model/APIErrorResponse'
import { TelemetryType } from '../../../../model/Telemetry'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<TelemetryType> | APIErrorResponse>,
) {
  const [signed_in, user_id] = await check_auth(req, res)
  if (!signed_in) return

  const dao = await DAO.getInstance()

  try {
    // const sensor_id = req.query.sensor_id
    // const {start, end, interval, max_count} = ... // parse URL params
    // dao.getTelemetry(user_id, sensor_id, start, end, interval, max_count)

    res.status(200).json([])
  } catch (error) {
    res.status(500).json({ error: 'Internal error' })
  }
}
