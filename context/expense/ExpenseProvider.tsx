import { FC, useReducer, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { ExpenseContext, expenseReducer } from './'
import { IExpense, IExpenseData, IExpenseResponse } from '../../interfaces'
import { finanzApi } from '../../api'
import { toastConfig } from '../../constants'
import { AuthContext, useI18N } from '../'

export interface ExpenseState {
  expenses: IExpense[]
  isLoading: boolean
}

interface Props {
  children: React.ReactNode
}

const EXPENSE_INITIAL_STATE: ExpenseState = {
  expenses: [],
  isLoading: false
}

export const ExpenseProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( expenseReducer, EXPENSE_INITIAL_STATE )
  const { isLoggedIn } = useContext(AuthContext)
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setExpenses = async (): Promise<boolean> => {
    try {
      const { data: { ok, expenses } } = await finanzApi.get<IExpenseResponse>('/expense')
      if (ok) {
        dispatch({ type: 'SET_EXPENSES', payload: expenses as IExpense[] || [] })
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

  useEffect(() => {
    if(isLoggedIn) setExpenses()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return (
    <ExpenseContext.Provider value={{ 
      ...state,

      // Methods
      addExpense,
      setExpenses,
      deleteExpense,
      updateExpense,
    }}>
      { children }
    </ExpenseContext.Provider>
  )
}
