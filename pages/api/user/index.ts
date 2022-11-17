import type { NextApiRequest, NextApiResponse } from 'next'
import { db, User } from '../../../data'
import { IUser } from '../../../interfaces'


type Data = 
| { message: string }
| IUser

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getUser(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }    
}

const getUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { userId } = req.cookies

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    await db.connect()

    const user = await User.findById(userId)

    await db.disconnect()

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const { role, _id, name, email, preferredLocale, budget } = user

    return res.status(200).json({
      role,
      email: email.toLowerCase(),
      name,
      _id,
      preferredLocale,
      budget
  })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}