import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { Button, Card, Col, Loading, Row, Table, Text, Tooltip } from '@nextui-org/react'
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlinePlusSm } from 'react-icons/hi'

import { useI18N } from '../../context'
import { IExpenseData } from '../../interfaces'
import { IconButton } from '../ui'
import { currency, dateFunctions } from '../../utils'
import { ExpenseContext } from '../../context/expense/ExpenseContext';

interface Props {
  expenses: IExpenseData[]
  isLoading: boolean
  isError: boolean
}

const tableOptions = [
  {
    name: 'name',
  },
  {
    name: 'description',
  },
  {
    name: 'category',
  },
  {
    name: 'amount',
  },
  {
    name: 'date',
  },
  {
    name: 'actions',
  },
]

const actions = [
  {
    tooltip: 'edit',
    Icon: HiOutlinePencilAlt,
    className: 'text-blue-500',
    href: '/app/finance/edit-expense',
  },
  {
    tooltip: 'delete',
    Icon: HiOutlineTrash,
    className: 'text-error',
  }
]

export const CardExpenses: FC<Props> = ({ expenses: cardExpenses, isLoading, isError }) => {
  const { t } = useI18N()
  const { locale, push } = useRouter()
  const { deleteExpense } = useContext(ExpenseContext)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const [expenses, setExpenses] = useState(cardExpenses)

  const onDelete = async (_id: string) => {
    let result = false

    setIsDeleteLoading(true)
    _id.length > 0 
    ? result = await deleteExpense(_id)
    : null

    if (result) {
      setIsDeleteLoading(false)
    }

    setExpenses(expenses.filter(expense => expense._id !== _id))
  }

  return (
    <Card className="px-5 py-3">
      <Card.Header className="flex justify-between">
        <Text h2 size={ 60 } weight='extrabold' className="drop-shadow-md leading-15">{ t('your_expenses') }</Text>
        <Button
          auto
          size="sm"
          className='bg-blue-500 hover:bg-blue-600'
          onClick={ () => push('/app/finance/add-expense') }
          iconRight={ <HiOutlinePlusSm size={ 20 } /> }
        >
          { t('add_expense') }
        </Button>
      </Card.Header>
      <Card.Body>
        <Table
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
              {
                !isLoading ? ( tableOptions.map((option, index) => (
                  <Table.Column key={ index }>{ t(option.name) }</Table.Column>
                )) ) : !isError ? <Table.Column>{ t('loading') }</Table.Column> : <Table.Column>{ t('error') }</Table.Column>
              }
          </Table.Header>
          <Table.Body>
            {
              !isLoading ? expenses.map(({ name, category, description, amount, date, _id }, index) => (
                <Table.Row key={ index }>
                  <Table.Cell>{ name }</Table.Cell>
                  <Table.Cell>{ description }</Table.Cell>
                  <Table.Cell>{ t(category) }</Table.Cell>
                  <Table.Cell>{ currency.format(amount) }</Table.Cell>
                  <Table.Cell>{ dateFunctions.formatDate(date, 'LL', locale || 'es') }</Table.Cell>
                  <Table.Cell>
                    <Row justify="center" align="center">
                      {
                        actions.map(({ tooltip, Icon, className, href }, index) => (
                          <Col key={ index }>
                            <Tooltip content={ t(tooltip) }>
                              <IconButton onClick={ () => href ? push(`${ href }/${ _id || ''}`) : onDelete(_id || '') }>
                                {
                                  isDeleteLoading ? <Loading type='points-opacity' size='md'/> : <Icon size={ 20 } className={ className } />
                                }
                              </IconButton>
                            </Tooltip>
                          </Col>
                        ))
                      }
                    </Row>
                  </Table.Cell>
                </Table.Row>
              )) : !isError ? (
                <Table.Row>
                  <Table.Cell>
                    <Loading type='points'/>
                  </Table.Cell>
                </Table.Row>
              ) : (
                <Table.Row>
                  <Table.Cell>
                    <Text>{ t('error') }</Text>
                  </Table.Cell>
                </Table.Row>
              )
            }
          </Table.Body>
        </Table>
      </Card.Body>
    </Card>
  )
}