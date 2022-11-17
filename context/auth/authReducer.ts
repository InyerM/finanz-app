import { AuthState } from './AuthProvider'
import { IAuthUser } from '../../interfaces'

type AuthAction = 
| { type: 'AUTH_LOGIN', payload: IAuthUser }
| { type: 'AUTH_LOGOUT' }
| { type: 'AUTH_UPDATE_BUDGET', payload: IAuthUser }
| { type: 'AUTH_LOAD_USER_DATA', payload: IAuthUser }


export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_LOGIN':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true
      }

    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: undefined,
        isLoggedIn: false
      }

    case 'AUTH_UPDATE_BUDGET':
      return {
        ...state,
        user: action.payload
      }

    default:
      return state
  }
}