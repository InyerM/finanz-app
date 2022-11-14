import { FC, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Divider, Grid, Input, Row, Spacer, Text, Textarea } from '@nextui-org/react'
import { HiOutlineDocumentText, HiOutlineCurrencyDollar } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import { Select } from '@chakra-ui/select'
import { IExpense, IExpenseData } from '../../interfaces'
import { useI18N, ExpenseContext } from '../../context'

interface Props {
  expense?: IExpense
  type: 'edit' | 'add'
}

interface FormData extends IExpenseData {
}

const selectOptions = [
  "food",
  "transport",
  "entertainment",
  "health",
  "education",
  "other",
]

export const AddOrEditExpeneseForm: FC<Props> = ({ expense, type }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: expense?.name,
      description: expense?.description,
      category: expense?.category,
      amount: expense?.amount,
    }
  })
  const { t } = useI18N()
  const { addExpense, updateExpense } = useContext(ExpenseContext)

  const onSubmit = (data: FormData) => {
    type === 'add' ? addExpense(data) : updateExpense(data, expense?._id || '')
  }

  const router = useRouter()
  return (
    <form className='max-w-4xl mx-auto'  onSubmit={ handleSubmit(onSubmit) } noValidate>
      <Text h4 size={ 25 } weight='semibold' className='my-2 ml-10'>
        { type === 'add' ? t('add_expense') : t('edit_expense') }
      </Text>
      <Divider height={2}/>
      <Spacer y={ 3 }/>
      <Grid.Container className='max-w-2xl mx-auto'>
        <Grid className='flex flex-col px-4 py-1' xs={ 12 } md={ 6 }>
          <Input
            bordered
            size="lg"
            fullWidth
            placeholder={ t('expense_name') }
            contentLeft={<HiOutlineDocumentText color="#222" size={35} />}
            { ...register('name', { required: t('required_field', t('name')) }) }
            helperColor='error'
            helperText={ errors.name?.message }
            status={ !!errors.name ? 'error' : 'default' }
          />
          <Spacer y={ 2 }/>
          <Textarea
            placeholder={ t('expense_description') }
            bordered
            fullWidth
            size="lg"
            rows={ 3 }
            { ...register('description', { required: false }) }
          />
        </Grid>
        <Spacer y={ 2 } className='xl:hidden'/>
        <Grid className='flex flex-col px-4 py-1' xs={ 12 } md={ 6 }>
          <Select 
            className={`border-2 p-3 rounded-2xl hover:ring-2 w-full focus:ring-2 border-gray-300
            focus:ring-black focus:transform focus:-translate-y-1 transition-all ease-in-out hover:ring-black
            duration-200 cursor-pointer mt-[0.5px] ${!!errors.category ? 'focus:ring-error hover:ring-error hover:border-transparent focus:border-transparent' : ''}` }
            icon={ <></> }
            { ...register('category', { required: t('required_field', 'Category') }) }
            defaultValue=''
          >
            <option value="" disabled>{ t('expense_category') }</option>
            {
              selectOptions.map((option, index) => (
                <option key={ index } value={ option }>{ t(option) }</option>
              ))
            }
          </Select>
          <Spacer y={ 2 }/>
          <Input
            bordered
            size="lg"
            fullWidth
            type='number'
            placeholder={ t('expense_amount') }
            contentLeft={<HiOutlineCurrencyDollar color="#222" size={35} />}
            { ...register('amount', { required: t('required_field', t('amount')) }) }
            helperColor='error'
            helperText={ errors.amount?.message }
            status={ !!errors.amount ? 'error' : 'default' }
          />
        </Grid>
      </Grid.Container>
      <Spacer y={ 1 } />
      <Row className='max-w-2xl gap-5 px-4 mx-auto'>
        <Col>
          <Button
            auto
            size='lg'
            className='w-full bg-gradient-to-r from-tertiary to-quaternary hover:opacity-90'
            css={{
              fontWeight: '$bold'
            }}
            onClick={ router.back }
          >
            { t('go_back') }
          </Button>
        </Col>
        <Col>
          <Button
            auto
            size='lg'
            className='w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90'
            css={{
              fontWeight: '$bold'
            }}
            type='submit'
          >
            { type === 'add' ? t('add_expense') : t('edit_expense') }
          </Button>
        </Col>
      </Row>
    </form>
  )
}