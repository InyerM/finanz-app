import type { NextApiRequest, NextApiResponse } from 'next'
import { expenseService } from '../../../data'
import { IExpense } from '../../../interfaces'

type Data = 
| { message: string, ok: boolean }
| { expense: IExpense, ok: boolean }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { userId } = req.cookies

  switch (req.method) {
    case 'GET':
      return getExpense(req, res, userId || '')
    case 'PUT':
      return updateExpense(req, res)
    case 'DELETE':
      return deleteExpense(req, res)

    default:
      return res.status(405).json({ message: 'Method Not Allowed', ok: false })
  }
}

const getExpense = async (req: NextApiRequest, res: NextApiResponse<Data>, userId: string) => {
  try {
    const { id } = req.query
    const { ok, expense, error } = await expenseService.getExpenseById(id?.toString() || '', userId || '')
    if (ok && expense) {
      return res.status(200).json({ expense: expense, ok: true })
    }

    return res.status(400).json({ message: error || 'There was a problem', ok: false })
  } catch (error: any) {
    return res.status(500).json({ message: error.message, ok: false })
  }
}

const updateExpense = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { expense } = req.body
  const { id } = req.query

  if (!expense || !id) return res.status(400).json({ message: 'Expense is required', ok: false })

  try {
    const { ok, error } = await expenseService.updateExpense(expense, id.toString())

    if (!ok) return res.status(400).json({ message: error || 'There was a problem', ok })

    return res.status(200).json({ message: 'Expense updated', ok: true })
  } catch (error: any) {
    return res.status(500).json({ message: error.message, ok: false })
  }
}

const deleteExpense = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query

  if (!id) return res.status(400).json({ message: 'Expense ID is required', ok: false })

  try {
    const { ok, error } = await expenseService.deleteExpense(id.toString())

    if (!ok) return res.status(400).json({ message: error || 'There was a problem', ok })

    return res.status(200).json({ message: 'Expense deleted', ok: true })
  } catch (error: any) {
    return res.status(500).json({ message: error.message, ok: false })
  }
}