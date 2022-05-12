import type { NextApiRequest, NextApiResponse } from 'next'
import { DAO } from '../../../../integration/DAO'
import { check_auth } from '../../../../lib/api'
import { APIErrorResponse } from '../../../../model/APIErrorResponse'
import { TelemetryType } from '../../../../model/Telemetry'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TelemetryType[] | APIErrorResponse>,
) {
  const [signed_in, user_id] = await check_auth(req, res)
  if (!signed_in) return

  const dao = await DAO.getInstance()

  try {
    const sensor_id = parseInt(req.query.sensor_id as string)
    const params = new URL(req.url || '', `http://${req.headers.host}`).searchParams
    const start = new Date(params.get('start') ?? Date.now() - 3600000) // Default: 1h ago
    const end = new Date(params.get('end') ?? Date.now()) // Default: now
    if (start.getTime() > end.getTime()) throw new Error() // Start must be before end
    const interval = parseInt(params.get('interval') || '1') || 1 // Default: 1s between datapoints
    const max_count = parseInt(params.get('max_count') || '') || null // Default: none
    if (interval < 0 || (max_count ?? 0) < 0) throw new Error() // Positive integers, please

    const telemetry = await dao.getTelemetry(user_id, sensor_id, start, end, interval, max_count)
    res.status(200).json(telemetry)
  } catch (error) {
    res.status(500).json({ error: 'Internal error' })
  }
}
