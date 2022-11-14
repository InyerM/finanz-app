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

  const addExpense = async (expense: IExpenseData) => {
    try {
      const { data: { ok, expense: newExpense } } = await finanzApi.post<IExpenseResponse>('/expense', { expense })
      if (ok) {
        toast.success(t('expense_added'), toastConfig)
        return dispatch({ type: 'ADD_EXPENSE', payload: newExpense as IExpense })
      }

      toast.error(t('expense_not_added'), toastConfig)
    } catch (error) {
      toast.error(t('error_adding_expense'), toastConfig)
    }
  }

  const getExpenses = async () => {
    try {
      const { data: { ok, expenses } } = await finanzApi.get<IExpenseResponse>('/expense')
      if (ok) {
        return dispatch({ type: 'SET_EXPENSES', payload: expenses as IExpense[] })
      }

      toast.error(t('error_getting_expenses'), toastConfig)
    } catch (error) {
      toast.error(t('error_getting_expenses'), toastConfig)
    }
  }

  const deleteExpense = async (_id: string) => {
    try {
      const { data: { ok } } = await finanzApi.delete<IExpenseResponse>(`/expense/${_id}`)
      if (ok) {
        toast.success(t('expense_deleted'), toastConfig)
        return dispatch({ type: 'DELETE_EXPENSE', payload: _id })
      } 

      toast.error(t('error_deleting_expense'), toastConfig)
    } catch (error) {
      toast.error(t('error_deleting_expense'), toastConfig)
    }
  }

  const updateExpense = async (expense: IExpenseData, _id: string) => {
    try {
      const { data: { ok, expense: updatedExpense } } = await finanzApi.put<IExpenseResponse>(`/expense/${_id}`, { expense })
      if (ok) {
        toast.success(t('expense_updated'), toastConfig)
        return dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense as IExpense })
      }

      toast.error(t('error_updating_expense'), toastConfig)
    } catch (error) {
      toast.error(t('error_updating_expense'), toastConfig) 
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
