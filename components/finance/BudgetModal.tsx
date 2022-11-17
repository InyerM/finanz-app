import { FC, useContext, useMemo, useEffect } from 'react';
import { Button, Divider, Input, Modal, Text } from '@nextui-org/react'
import { useForm } from 'react-hook-form'

import { AuthContext, useI18N } from '../../context'
import { HiOutlineCurrencyDollar } from 'react-icons/hi'

interface Props {
  isOpen: boolean
  type: 'add' | 'edit'
  onClose: () => void
}

interface FormData {
  budget: number
}

export const BudgetModal: FC<Props> = ({ isOpen, onClose, type }) => {
  const { t } = useI18N()
  const { user, addBudget, updateBudget } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const maxBudget = useMemo(() => user?.budget || 0, [user])

  useEffect(() => {
    reset({
      budget: type !== 'add' ? user?.budget : 0
    })
  }, [isOpen, user, reset, type])

  const onSubmit = ({ budget }: FormData) => {
    if (type === 'add') {
      addBudget(budget)
    } else {
      updateBudget(budget)
    }

    reset()
    onClose()
  }

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={isOpen}
      onClose={onClose}
    >
      <Modal.Header>
        <Text b size={ 25 }>{ type === 'add' ? t('add_budget') : t('edit_budget') }</Text>
      </Modal.Header>
      <form onSubmit={ handleSubmit(onSubmit) } noValidate>
        <Modal.Body className='my-5 overflow-y-hidden h-20'>
            <Input
              bordered
              size="lg"
              fullWidth
              type='number'
              placeholder={ t('budget_amount') }
              contentLeft={<HiOutlineCurrencyDollar color="#222" size={35} />}
              { ...register('budget', { 
                required: t('required_field', t('budget')),
                max: {
                  value: type === 'add' ? 10000 : user?.budget!,
                  message: t('max_budget', type === 'add' ? 10000 : maxBudget)
                },
                validate: {
                  positive: (value) => value > 0 || t('positive_budget')
                }
              }) }
              helperColor='error'
              helperText={ errors.budget?.message }
              status={ !!errors.budget ? 'error' : 'default' }
              max={ type === 'add' ? 10000 : user?.budget }
            />
        </Modal.Body>
        <Divider height={ 2 }/>
        <Modal.Footer>
          <Button auto flat color="error" onClick={onClose}>
            { t('close') }
          </Button>
          <Button auto type='submit' className='bg-tertiary'>
            { t('accept') }
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}