import Head from 'next/head'
import { FC } from 'react'
import { Navbar } from '../ui'

interface Props {
  children: React.ReactNode
  description: string
  title: string
}

export const MainLayout: FC<Props> = ({ children, title, description }) => {
  return (
    <div className='h-screen'>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className='flex flex-col items-center justify-center max-w-6xl px-5 py-8 mx-auto lg:p-0'>
        { children }
      </main>
    </div>
  )
}