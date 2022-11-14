import bcrypt from 'bcrypt'

interface IUserData {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  budget: number
  preferredLocale: string
}

interface IExpenseData {
  name: string
  description?: string
  category: 'food' | 'transport' | 'entertainment' | 'health' | 'education' | 'other'
  amount: number
  userId?: string
  date: string
}

interface ISeedData {
  users: IUserData[]
  expenses: IExpenseData[]
}

export const seedData: ISeedData = {
  users: [
    {
      name: 'Admin',
      email: 'admin@finanzapp.com',
      password: bcrypt.hashSync('admin1', 10),
      role: 'admin',
      budget: 1000,
      preferredLocale: 'es',
    },
    {
      name: 'David',
      email: 'david@google.com',
      password: bcrypt.hashSync('123456', 10),
      role: 'user',
      budget: 1000,
      preferredLocale: 'es',
    }
  ],
  expenses: [
    {
      name: 'Café',
      description: 'Café en la oficina',
      category: 'food',
      amount: 2.5,
      date: '2021-01-01',
    },
    {
      name: 'Gym',
      description: 'Suscripción al gimnasio',
      category: 'health',
      amount: 50,
      date: '2021-01-01',
    },
  ],
}
