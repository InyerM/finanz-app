export interface IUser {
  _id: string
  name: string
  email: string
  password?: string
  role: 'admin' | 'user'
  budget: number
  preferredLocale: string
  createdAt?: string
  updatedAt?: string
}

export interface IAuthResponse {
  token: string
  user: IAuthUser
  message: string
}

export interface IBudgetResponse {
  user?: IAuthUser
  message: string
}

export type IAuthUser = Pick<IUser, 'name' | 'email' | 'role' | 'budget' | 'preferredLocale'>