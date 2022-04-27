import { randomInt } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

type DataPoint = {
    timestamp: string,
    temp: number,
    humidity: number,
    co: number,
}

type Data = {
    deviceId: string,
    data: Array<DataPoint>,
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { deviceId } = req.query
    const url = new URL(req.url || '', `http://${req.headers.host}`)
    const params = url.searchParams
    const interval = Number.parseInt(params.get('interval') || '60')

    res.status(200).json({
        deviceId: deviceId.toString(),
        data: Array(100).fill(0).map((_, i): DataPoint => {
            return {
            timestamp: (i * interval).toString(),
            temp: randomInt(0, 40),
            humidity: randomInt(50, 100),
            co: randomInt(300, 400),
        }})
    })
}
