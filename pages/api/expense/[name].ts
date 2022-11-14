import type { NextApiRequest, NextApiResponse } from 'next'
import { expenseService } from '../../../data'
import { IExpense } from '../../../interfaces'

type Data = 
| { message: string, ok: boolean }
| { expense: IExpense, ok: boolean }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { userId } = req.cookies

  if (req.method === 'GET') {
    const { name } = req.query
    const { ok, expense, error } = await expenseService.getExpenseByName(name?.toString() || '', userId || '')
    if (ok && expense) {
      return res.status(200).json({ expense: expense, ok: true })
    }

    return res.status(500).json({ message: error || 'There was a problem', ok: false })
  }

  res.status(405).json({ message: 'Method not allowed', ok: false })
}