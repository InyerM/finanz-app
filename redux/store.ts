import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './reducers'

const store = configureStore({
  reducer: combineReducers({
    // auth: authReducer
  }),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>

export default store