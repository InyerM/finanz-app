import type { NextApiRequest, NextApiResponse } from 'next'
import { expenseService } from '../../../data'
import { IExpense } from '../../../interfaces'

type Data = 
| { message: string, ok: boolean }
| { expenses: IExpense[], ok: boolean }


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { userId } = req.cookies

  switch (req.method) {
    case 'GET':
      return getExpenses(req, res, userId || '')
    case 'POST':
      return createExpense(req, res, userId || '')
    default:
      return res.status(405).json({ message: 'Method Not Allowed', ok: false })
  }
}

const getExpenses = async (req: NextApiRequest, res: NextApiResponse<Data>, userId: string) => {
  try {
    const { ok, error, expenses } = await expenseService.getExpenses(userId)

    if (!ok) return res.status(400).json({ message: error || 'There was a problem', ok })

    if (!expenses) return res.status(404).json({ message: 'Expenses not found', ok })

    return res.status(200).json({ message: 'Expenses retrieved', ok, expenses })
  } catch (error: any) {
    return res.status(500).json({ message: error.message, ok: false })
  }
}

const createExpense = async (req: NextApiRequest, res: NextApiResponse<Data>, userId: string) => {
  const { expense } = req.body

  if (!expense) return res.status(400).json({ message: 'Expense is required', ok: false })

  try {
    const { ok, error } = await expenseService.createExpense(userId, expense)

    if (!ok) return res.status(400).json({ message: error || 'There was a problem', ok })

    return res.status(201).json({ message: 'Expense created', ok: true })
  } catch (error: any) {
    return res.status(500).json({ message: error.message, ok: false })
  }
}


