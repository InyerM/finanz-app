import { createContext } from 'react'
import { IExpense, IExpenseData } from '../../interfaces'

interface ContextProps {
  expenses: IExpense[]
  isLoading: boolean

  // Methods
  addExpense: (expense: IExpenseData) => Promise<boolean>
  setExpenses: () => Promise<boolean>
  deleteExpense: (_id: string) => Promise<boolean>
  updateExpense: (expense: IExpenseData, _id: string) => Promise<boolean>
}

export const ExpenseContext = createContext( {} as ContextProps )