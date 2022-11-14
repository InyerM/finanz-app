interface INavbarData {
  name: string
  path: string
}

export const navbarHome: INavbarData[] = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'login',
    path: '/auth/login',
  },
  {
    name: 'register',
    path: '/auth/register',
  },
]

export const navbarClient: INavbarData[] = [
  {
    name: 'profile',
    path: '/app/profile',
  },
  {
    name: 'finance',
    path: '/app/finance',
  },
  {
    name: 'logout',
    path: '/auth/logout',
  },
]

export const navbarAdmin: INavbarData[] = [
  {
    name: 'admin',
    path: '/app/admin',
  },
]