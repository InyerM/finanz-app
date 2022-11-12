import { useState, useContext } from 'react';
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react'
import { Text, Card, Input, Button, Grid, Divider } from '@nextui-org/react'
import { useForm } from 'react-hook-form'

import { MainLayout } from "../../components/layout"
import { AuthContext, useI18N } from "../../context"
import { capitalizeFirstLetter, validations } from '../../utils'

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type Options = "email" | "name" | "password" | "confirmPassword"
const options: Options[] = [
  'email',
  'name',
]


const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { registerUser } = useContext(AuthContext)
  const { t } = useI18N()

  const onSubmit = async ({ email, name, password, confirmPassword }: FormData) => {

    if (password !== confirmPassword) {
      setErrorMessage(t('passwords_do_not_match'))
      setShowError(true)

      return
    }

    const isValidRegister = await registerUser(name, email, password)
    const { hasError, message } = isValidRegister!

    if (hasError) {
      setShowError(true)
      setErrorMessage(message!)

      return
    }

    setShowError(false)

    await signIn('credentials', {
      email,
      password,
    })
  }
  return (
    <MainLayout description={ t('register_description') } title={ t('register_title') }>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <Card className='justify-center w-full max-w-lg p-4 mx-auto' css={{
          mh: '800px'
        }}>
          <Card.Header className='flex gap-8'>
            <Text
              h2
              size={ 35 }
              weight='bold'
              className='text-font-primary'
            >{ t('register') }</Text>
            {
              showError && (
                <div className='px-3 py-2 fadeIn bg-error rounded-3xl'>
                  <Text
                    size={ 14 }
                    weight='bold'
                    className='text-white'
                  >{ errorMessage }</Text>
                </div>
              )
            }
          </Card.Header>
          <Card.Divider />
          <Card.Body className='h-auto space-y-5 overflow-y-hidden'>
            <Grid.Container gap={ 2 }>
              {
                options.map((option, index) => (
                  <Grid xs={ 12 } sm={ 6 } key={ index }>
                    <Input
                      key={ index }
                      clearable
                      underlined
                      placeholder={ t(option) }
                      size='md'
                      fullWidth
                      { ...register(option, {
                        required: t('required_field', capitalizeFirstLetter(option)),
                        validate: option === 'email' ? validations.isEmail : undefined
                      }) }
                      helperColor='error'
                      helperText={ errors[option]?.message }
                      status={ !!errors[option] ? 'error' : 'default' }
                    />
                  </Grid>
                ))
              }
              <Grid xs={ 12 } sm={ 6 }>  
                <Input.Password
                  clearable
                  underlined
                  placeholder={ t('password') }
                  size='md'
                  fullWidth
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
              </Grid>
              <Grid xs={ 12 } sm={ 6 }>
                <Input.Password
                  clearable
                  underlined
                  placeholder={ t('confirm_password') }
                  size='md'
                  fullWidth
                  {
                    ...register('confirmPassword', {
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
              </Grid>
            </Grid.Container>
          </Card.Body>
          <Card.Footer className='flex flex-col items-start gap-2'>
            <Link href='/auth/login'>
              <Text
                h4
                size={ 15 }
                weight='medium'
              >{ t('already_registered') }</Text>
            </Link>
            <Button
              auto
              className='w-full bg-gradient-to-r from-primary to-secondary'
              type='submit'
            >{ t('register') }
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

export default RegisterPage