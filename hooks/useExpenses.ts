import useSWR, { SWRConfiguration } from 'swr'
import { IExpenseResponse } from '../interfaces'

export const useExpenses = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IExpenseResponse>(`/api${ url }`, config)

  return {
    expenses: data?.expenses || [],
    expense: data?.expense,
    isLoading: !error && !data,
    isError: error,
    ok: data?.ok || error
  }
}