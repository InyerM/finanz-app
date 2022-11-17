import { FC, useReducer, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'

import { finanzApi } from '../../api'
import { IAuthUser, IAuthResponse, IUser, IBudgetResponse } from '../../interfaces'
import { AuthContext, authReducer } from './'
import { useI18N } from '../'
import { toastConfig } from '../../constants'

export interface AuthState {
  isLoggedIn: boolean
  user?: IAuthUser
}

interface Props {
  children: React.ReactNode
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
}

export const AuthProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE )
  const { data, status } = useSession()
  const { asPath, replace, locale } = useRouter()
  const { t } = useI18N()

  useEffect(() => {
    if ( status === 'authenticated' ) {
      const user = data?.user as IAuthUser
      if (locale !== user.preferredLocale) {
        replace( asPath, asPath, { locale: user.preferredLocale } )
      }
    }
  }, [data, status, asPath, locale, replace])

  useEffect(() => {
    if ( status === 'authenticated' ) {
      const user = data?.user as IUser
      Cookies.set('userId', user?._id)
      
      getUserData()
    }
  }, [data, status])

  const getUserData = async () => {
    try {
      const { data } = await finanzApi.get<IUser>('/user')
  
      if (data) {
        dispatch({ type: 'AUTH_LOGIN', payload: data })
      }
    } catch (error) {
      toast.error( t('error_getting_info'), toastConfig )
    }
  }

  const logginUser = async( email: string, password: string ): Promise<boolean> => {
    try {
      const { data } = await finanzApi.post<IAuthResponse>('/user/login', { email, password })
      const { token, user } = data

      Cookies.set('token', token)

      dispatch({
        type: 'AUTH_LOGIN',
        payload: user
      })

      return true
    } catch (error) {
      return false
    }
  }

  const registerUser = async(name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await finanzApi.post<IAuthResponse>('/user/register', { name, email, password })
      const { token, user } = data

      Cookies.set('token', token)

      dispatch({
        type: 'AUTH_LOGIN',
        payload: user
      })

      return {
        hasError: false
      }
    } catch (error) {
      if( axios.isAxiosError(error) ) {
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }

      return {
        hasError: true,
        message: 'An error has ocurred, try again'
      }
    }
  }

  const logout = () => {
    signOut()
  }

  const addBudget = async(amount: number) => {
    try {
      const { data } = await finanzApi.post<IBudgetResponse>('/user/budget', { budget: amount })
      console.log("🚀 ~ file: AuthProvider.tsx ~ line 120 ~ addBudget ~ data", data)
      dispatch({
        type: 'AUTH_UPDATE_BUDGET',
        payload: data?.user as IAuthUser
      })

      toast.success(t('budget_added'), toastConfig)
    } catch (error) {
      toast.error(t('error_add_budget'), toastConfig)
    }
  }

  const updateBudget = async(amount: number) => {
    try {
      const { data } = await finanzApi.put<IAuthResponse>('/user/budget', { budget: amount })
      dispatch({
        type: 'AUTH_UPDATE_BUDGET',
        payload: data.user
      })

      toast.success(t('budget_updated'), toastConfig)
    } catch (error) {
      toast.error(t('error_update_budget'), toastConfig)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      ...state,

      //methods
      logginUser,
      registerUser,
      logout,

      // budget
      addBudget,
      updateBudget
    }}>
      { children }
    </AuthContext.Provider>
  )
}
