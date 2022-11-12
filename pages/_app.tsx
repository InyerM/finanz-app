import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { I18NProvider, AuthProvider } from '../context'
import { store } from '../redux'
import { ToastContainer } from 'react-toastify'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={ store }>
        <AuthProvider>
          <NextUIProvider>
            <I18NProvider>
              <Component {...pageProps} />
              <ToastContainer />
            </I18NProvider>
          </NextUIProvider>
        </AuthProvider>
      </Provider>
    </SessionProvider>
  )
}
