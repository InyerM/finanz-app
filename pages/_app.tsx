import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { I18NProvider, AuthProvider, ExpenseProvider } from '../context'
import { ToastContainer } from 'react-toastify'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <I18NProvider>
        <AuthProvider>
          <ExpenseProvider>
            <NextUIProvider>
              <Component {...pageProps} />
              <ToastContainer />
            </NextUIProvider>
          </ExpenseProvider>
        </AuthProvider>
      </I18NProvider>
    </SessionProvider>
  )
}
