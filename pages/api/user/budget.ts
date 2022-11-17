import type { NextApiRequest, NextApiResponse } from 'next'
import { db, User } from '../../../data'
import { IBudgetResponse } from '../../../interfaces'

type Data = IBudgetResponse

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return addBudget(req, res)
    case 'PUT':
      return updateBudget(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }    
}

const addBudget = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { budget } = req.body
  const { userId } = req.cookies

  db.connect()

  const user = await User.findById(userId).lean()

  if (!user) {
    db.disconnect()
    return res.status(404).json({ message: 'User not found' })
  }

  const budgetToAdd: number = parseInt(budget) + user.budget

  const updatedUser = await User.findByIdAndUpdate(userId, {
    budget: budgetToAdd
  })
  db.disconnect()

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.status(200).json({ user: {
    ...updatedUser,
    budget: budgetToAdd
  }, message: 'Budget added' })
}

const updateBudget = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { budget } = req.body
  const { userId } = req.cookies

  db.connect()

  const updatedUser = await User.findByIdAndUpdate(userId, {
    budget
  })

  db.disconnect()

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.status(200).json({ user: {
    ...updatedUser,
    budget
  }, message: 'Budget updated' })
}