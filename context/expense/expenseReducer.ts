import { IExpense } from '../../interfaces'
import { ExpenseState } from './ExpenseProvider'

type ExpenseAction = 
| { type: 'ADD_EXPENSE', payload: IExpense }
| { type: 'DELETE_EXPENSE', payload: string }
| { type: 'UPDATE_EXPENSE', payload: IExpense }
| { type: 'SET_EXPENSES', payload: IExpense[] }

export const expenseReducer = (state: ExpenseState, action: ExpenseAction): ExpenseState => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload]
      }

    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense._id !== action.payload)
      }

    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense => expense._id === action.payload._id ? action.payload : expense)
      }

    case 'SET_EXPENSES':
      return {
        ...state,
        expenses: action.payload
      }

    default:
      return state
  }
}