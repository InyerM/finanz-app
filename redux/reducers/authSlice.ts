import { createSlice } from '@reduxjs/toolkit'
import { IAuthUser } from '../../interfaces'

interface AuthState {
  isAuthenticated: boolean
  user?: IAuthUser
}

interface IAuthAction {
  payload: IAuthUser
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: IAuthAction) {
      state.isAuthenticated = true
      state.user = action.payload
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = undefined
    },
  }
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer