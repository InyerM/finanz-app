import bcrypt from 'bcrypt'
import { db } from "../database"
import { User } from "../models"

export const checkUserEmailPassword = async(email: string, password: string) => {
  await db.connect()

  const user = await User.findOne({ email }).lean()

  await db.disconnect()

  if (!user) {
    return null
  }

  const passwordMatch = bcrypt.compareSync(password, user.password!)

  if (!passwordMatch) {
    return null
  }

  const { role, _id, name, preferredLocale, budget } = user

  return { 
    role,
    email: email.toLowerCase(),
    name,
    _id,
    preferredLocale,
    budget
  }
}

export const OAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect()

  const user = await User.findOne({ email: oAuthEmail }).lean()

  if (user) {
    await db.disconnect()

    const { role, _id, name, email, preferredLocale, budget } = user
    return {
      role,
      email: email.toLowerCase(),
      name,
      _id,
      preferredLocale,
      budget
    }
  }

  const newUser = await User.create({
    email: oAuthEmail,
    name: oAuthName,
    role: 'user',
    password: '@',
  })

  await db.disconnect()

  const { role, _id, name, email,preferredLocale, budget } = newUser
  return {
    role,
    email: email.toLowerCase(),
    name,
    _id,
    preferredLocale,
    budget
  }
}