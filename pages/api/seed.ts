import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../data/database'
import { Expense, User } from '../../data/models'

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if(process.env.NODE_ENV === 'production') return res.status(401).json({ message: 'Not allowed' })
  if(req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })
  try {
    await db.connect()

    await User.deleteMany()
    await Expense.deleteMany()

    const users = await User.insertMany(seedData.users)

    let { expenses } = seedData

    expenses = expenses.map(expense => {
      expense.userId = users[0]._id
      return expense
    })

    await Expense.insertMany(expenses)

    await db.disconnect()
    res.status(200).json({ message: 'Successfully' })
  } catch (error: any) {
    res.status(500).json({ message: error.message as string })
  }
}