import { FC } from 'react'
import { useRouter } from 'next/router'
import { Button, Card, Col, Row, Table, Text, Tooltip } from '@nextui-org/react'
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlinePlusSm } from 'react-icons/hi'

import { useI18N } from '../../context'
import { IExpenseData } from '../../interfaces'
import { IconButton } from '../ui'
import { currency, dateFunctions } from '../../utils'
import { AddOrEditExpenseModal } from './'

interface Props {
  expenses: IExpenseData[]
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
  // {
  //   tooltip: 'details',
  //   Icon: HiOutlineEye,
  //   className: 'text-neutral',
  // },
  {
    tooltip: 'edit',
    Icon: HiOutlinePencilAlt,
    className: 'text-blue-500',
    href: '/app/finance/edit-expense/1',
  },
  {
    tooltip: 'delete',
    Icon: HiOutlineTrash,
    className: 'text-error',
  }
]

export const CardExpenses: FC<Props> = ({ expenses }) => {
  const { t } = useI18N()
  const { locale, push } = useRouter()

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
                tableOptions.map((option, index) => (
                  <Table.Column key={ index }>{ t(option.name) }</Table.Column>
                ))
              }
          </Table.Header>
          <Table.Body>
            {
              expenses.map(({ name, category, description, amount, date }, index) => (
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
                              <IconButton onClick={ () => href ? push(href) : null }>
                                <Icon className={ className } size={ 20 }/>
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
      {/* <AddOrEditExpenseModal isOpen onClose={ () => {} } type='edit'/> */}
    </Card>
  )
}