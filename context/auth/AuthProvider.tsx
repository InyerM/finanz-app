import { FC, useReducer, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import axios from 'axios'
import { finanzApi } from '../../api'
import { IAuthUser, IAuthResponse } from '../../interfaces'
import { AuthContext, authReducer } from './'

export interface AuthState {
  isLoggedIn: boolean
  user?: IAuthUser
  locale: string
}

interface Props {
  children: React.ReactNode
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
  locale: 'es'
}

export const AuthProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE )
  const router = useRouter()
  const { data, status } = useSession()
  console.log("🚀 ~ file: AuthProvider.tsx ~ line 31 ~ status", status)
  console.log("🚀 ~ file: AuthProvider.tsx ~ line 31 ~ data", data)

  useEffect(() => {
    if ( status === 'authenticated' ) {
      dispatch({ type: 'AUTH_LOGIN', payload: data?.user as IAuthUser })
    }

  }, [data, status])

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

  return (
    <AuthContext.Provider value={{ 
      ...state,

      //methods
      logginUser,
      registerUser,
      logout
    }}>
      { children }
    </AuthContext.Provider>
  )
}
