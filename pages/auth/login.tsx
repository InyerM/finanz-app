import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getProviders, getSession, signIn } from 'next-auth/react'
import { Text, Card, Input, Button, Divider } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { MainLayout } from "../../components/layout"
import { useI18N } from "../../context"
import { validations } from '../../utils'

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const router = useRouter()
  const [showError, setShowError] = useState(false)

  const onSubmit = async ({ email, password }: FormData) => {
    const isValidLogin = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    const { error } = isValidLogin!

    if (error) {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 5000)

      return
    }

    router.replace(router.query.p?.toString() || '/')
  }
  const { t } = useI18N()
  return (
    <MainLayout description={ t('login_description') } title={ t('login_title') }>
      <form onSubmit={ handleSubmit(onSubmit) } noValidate>
        <Card className='justify-center w-full max-w-md p-8' >
          <Card.Header className='flex gap-4'>
            <Text
              h2
              size={ 35 }
              weight='bold'
              className='text-font-primary'
            >{ t('login') }</Text>
            {
              showError && (
                <div className='px-3 py-2 fadeIn bg-error rounded-3xl'>
                  <Text
                    size={ 14 }
                    weight='bold'
                    className='text-white'
                  >{ t('invalid_email_or_password') }</Text>
                </div>
              )
            }
          </Card.Header>
          <Card.Divider />
          <Card.Body className='space-y-5 overflow-y-hidden'>
            <Input 
              clearable
              underlined
              placeholder={ t('email') }
              size='lg'
              {
                ...register('email', {
                  required: t('email_required'),
                  validate: validations.isEmail
                })
              }
              helperColor='error'
              helperText={ errors.email?.message }
              status={ !!errors.email ? 'error' : 'default' }
            />
            <Input.Password
              clearable
              underlined
              placeholder={ t('password') }
              size='lg'
              {
                ...register('password', {
                  required: t('password_required'),
                  minLength: {
                    value: 6,
                    message: t('password_min_length')
                  }
                })
              }
              helperColor='error'
              helperText={ errors.password?.message }
              status={ !!errors.password ? 'error' : 'default' }
            />
          </Card.Body>
          <Card.Footer className='flex flex-col items-start gap-2'>
            <Link href='/auth/register'>
              <Text
                h4
                size={ 15 }
                weight='medium'
              >{ t('not_registered') }</Text>
            </Link>
            <Button
              auto
              className='w-full bg-gradient-to-r from-primary to-secondary'
              type='submit'
              css={{
                fontWeight: '$bold'
              }}
            >{ t('login') }
            </Button>

            <Divider style={{
              width: '100%',
              height: '1px'
            }}/>

            <Button
              auto
              className='w-full bg-gradient-to-r from-github-primary to-github-secondary'
              type='submit'
              css={{
                fontWeight: '$bold'
              }}
              iconRight={ <i className='text-xl bx bxl-github'></i> }
              onClick={ async () => signIn('github') }
            >
              Github
            </Button>

          </Card.Footer>
        </Card>
      </form>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  
  const session = await getSession({ req })

  const { p = '/' } = query

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }

  return {
    props: {
    }
  }
}

export default LoginPage