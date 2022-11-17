import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { Button, Card, Col, Loading, Row, Table, Text, Tooltip } from '@nextui-org/react'
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlinePlusSm } from 'react-icons/hi'

import { useI18N, ExpenseContext } from '../../context'
import { IExpenseData } from '../../interfaces'
import { IconButton } from '../ui'
import { currency, dateFunctions } from '../../utils'

interface Props {
  expenses?: IExpenseData[]
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

export const CardExpenses: FC<Props> = () => {
  const { t } = useI18N()
  const { locale, push } = useRouter()
  const { deleteExpense, expenses } = useContext(ExpenseContext)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const onDelete = async (_id: string) => {
    let result = false

    setIsDeleteLoading(true)
    _id.length > 0 
    ? result = await deleteExpense(_id)
    : null

    if (result) {
      setIsDeleteLoading(false)
    }
  }

  return (
    <Card className="px-5 py-3">
      <Card.Header className="flex justify-between md:flex-row flex-col gap-5">
        <Text h2 size={ 60 } weight='extrabold' className="drop-shadow-md md:leading-15 text-3xl sm:text-4xl md:text-6xl">{ t('your_expenses') }</Text>
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
      {
        !expenses || expenses.length === 0 ? (
          <Loading size='xl' color='primary' className='my-5' type='points'/>
        ) : (
          <>
            <Card.Body>
              <Table
                css={{
                  height: "auto",
                  minWidth: "100%",
                }}
              >
                <Table.Header>
                    {
                      tableOptions.map((option, index) => (
                        <Table.Column key={ index }>{ t(option.name) }</Table.Column>
                      ))
                    }
                </Table.Header>
                <Table.Body>
                  {
                    expenses.map(({ name, category, description, amount, date, _id }, index) => (
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
                    ))
                  }
                </Table.Body>
              </Table>
            </Card.Body>
          </>
        )
      }
    </Card>
  )
}