import { createContext } from 'react'
import { IExpense, IExpenseData } from '../../interfaces'

interface ContextProps {
  expenses: IExpense[]

  // Methods
  addExpense: (expense: IExpenseData) => void
  getExpenses: () => void
  deleteExpense: (_id: string) => void
  updateExpense: (expense: IExpenseData, _id: string) => void
}

export const ExpenseContext = createContext( {} as ContextProps )