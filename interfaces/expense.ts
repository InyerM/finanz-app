export interface IExpense {
  _id: string
  name: string
  description?: string
  category: 'food' | 'transport' | 'entertainment' | 'health' | 'education' | 'other'
  amount: number
  userId: string
  date: string
  createdAt?: string
  updatedAt?: string
}

export interface IExpenseData {
  _id?: string
  name: string
  description?: string
  category: 'food' | 'transport' | 'entertainment' | 'health' | 'education' | 'other'
  amount: number
  userId?: string
  date: string
}

export interface IExpenseResponse {
  expense?: IExpense
  expenses?: IExpense[]
  ok: boolean
  message?: string
}