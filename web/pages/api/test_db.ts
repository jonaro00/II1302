import { randomInt } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { DAO } from '../../integration/DAO'

DAO.createDAO(false).then(d => {
  d.register('a2', 'b').then(console.log)
})

export default function handler(req: NextApiRequest, res: NextApiResponse<Object>) {
  res.status(200).json({})
}
