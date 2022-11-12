import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Text } from "@nextui-org/react"

import { AuthContext, useI18N } from '../../context'
import { NavItem } from './NavItem'
import { navbarHome, navbarClient, navbarAdmin } from './'

export const Navbar = () => {
  const { t } = useI18N()
  const { push, asPath } = useRouter()
  const { isLoggedIn, user, logout } = useContext(AuthContext)

  const navigateTo = (path: string, name: string) => {
    if (name === 'logout') {
      logout()
      return push('/')
    }

    if (name === 'login') {
      return push(`${path}?p=${asPath}`)
    }

    push(path)
  }

  return (
    <nav className='flex flex-col items-center justify-between max-w-6xl px-5 py-5 mx-auto md:flex-row xl:px-0 gap-7 md:gap-0'>
      <section>
        <Link href='/'>
          <Text 
            h1 
            size={ 35 }
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold"
            className='transition-all hover:opacity-90'
          >FinanzApp</Text>
        </Link>
      </section>
      <section className='flex flex-col gap-1 md:flex-row md:gap-8'>
        {
          isLoggedIn && navbarClient.map(({ path, name }) => {
            return <NavItem key={ name } name={ name } path={ path }  onClick={ navigateTo }/>
          })
        }
        {
          !isLoggedIn && navbarHome.map(({ path, name }) => {
            return <NavItem key={ name } name={ name } path={ path }  onClick={ navigateTo }/>
          })
        }
        {
          isLoggedIn && user?.role === 'admin' && navbarAdmin.map(({ path, name }) => {
            return <NavItem key={ name } name={ name } path={ path }  onClick={ navigateTo }/>
          })
        }
      </section>
    </nav>
  )
}