import { FC, useReducer } from 'react'
import { ExpenseContext, expenseReducer } from './'
import { IExpense, IExpenseData, IExpenseResponse } from '../../interfaces'
import { finanzApi } from '../../api'
import { toast } from 'react-toastify'
import { toastConfig } from '../../constants'
import { useI18N } from '../i18n/i18n';

export interface ExpenseState {
  expenses: IExpense[]
}

interface Props {
  children: React.ReactNode
}

const EXPENSE_INITIAL_STATE: ExpenseState = {
  expenses: [],
}

export const ExpenseProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( expenseReducer, EXPENSE_INITIAL_STATE )
  const { t } = useI18N()

  const addExpense = async (expense: IExpenseData): Promise<boolean> => {
    try {
      const { data: { ok, expense: newExpense } } = await finanzApi.post<IExpenseResponse>('/expense', { expense })
      if (ok) {
        toast.success(t('expense_added'), toastConfig)
        dispatch({ type: 'ADD_EXPENSE', payload: newExpense as IExpense })
        return true
      }

      toast.error(t('error_adding_expense'), toastConfig)
      return false
    } catch (error) {
      toast.error(t('error_adding_expense'), toastConfig)
      return false
    }
  }

  const getExpenses = async (): Promise<boolean> => {
    try {
      const { data: { ok, expenses } } = await finanzApi.get<IExpenseResponse>('/expense')
      if (ok) {
        dispatch({ type: 'SET_EXPENSES', payload: expenses as IExpense[] })
        return true
      }

      toast.error(t('error_getting_expenses'), toastConfig)
      return false
    } catch (error) {
      toast.error(t('error_getting_expenses'), toastConfig)
      return false
    }
  }

  const deleteExpense = async (_id: string): Promise<boolean> => {
    try {
      const { data: { ok } } = await finanzApi.delete<IExpenseResponse>(`/expense/${_id}`)
      if (ok) {
        toast.success(t('expense_deleted'), toastConfig)
        dispatch({ type: 'DELETE_EXPENSE', payload: _id })
        return true
      } 

      toast.error(t('error_deleting_expense'), toastConfig)
      return false
    } catch (error) {
      toast.error(t('error_deleting_expense'), toastConfig)
      return false
    }
  }

  const updateExpense = async (expense: IExpenseData, _id: string): Promise<boolean> => {
    try {
      const { data: { ok, expense: updatedExpense } } = await finanzApi.put<IExpenseResponse>(`/expense/${_id}`, { expense })
      if (ok) {
        toast.success(t('expense_updated'), toastConfig)
        dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense as IExpense })
        return true
      }

      toast.error(t('error_updating_expense'), toastConfig)
      return false
    } catch (error) {
      toast.error(t('error_updating_expense'), toastConfig) 
      return false
    }
  }

  return (
    <ExpenseContext.Provider value={{ 
      ...state,

      // Methods
      addExpense,
      getExpenses,
      deleteExpense,
      updateExpense,
    }}>
      { children }
    </ExpenseContext.Provider>
  )
}
