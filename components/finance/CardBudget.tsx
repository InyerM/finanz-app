import { FC, useState, useContext, useMemo } from 'react';
import { Card, Grid, Button, Text, Loading } from '@nextui-org/react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { HiOutlinePencilAlt, HiOutlinePlus } from 'react-icons/hi'

import { AuthContext, ExpenseContext, useI18N } from '../../context'
import { BudgetModal } from './'
import { currency } from '../../utils';

interface Props {
}

type Dialog = 'add' | 'edit'

export const CardBudget: FC<Props> = () => {
  const { t } = useI18N()
  const { user } = useContext(AuthContext)
  const { expenses } = useContext(ExpenseContext)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<Dialog>('edit')

  const budget = useMemo(() => user?.budget || 0, [user])
  const totalExpenses = useMemo(() => expenses.reduce((acc, curr) => acc + curr?.amount, 0), [expenses])
  const percentage = useMemo(() => budget > 0 ? parseFloat(((totalExpenses / budget) * 100).toFixed(2)) : 0, [budget, totalExpenses])
  const budgetLeft = useMemo(() => budget - totalExpenses, [budget, totalExpenses])

  const handleOpenDialog = (type: 'add' | 'edit') => {
    setDialogType(type)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <Card className="px-2 py-3 md:px-5 bg-gradient-to-tr from-primary to-secondary" isPressable>
      <Card.Header className="w-3/4">
        <Text h2 weight='extrabold' className="text-white drop-shadow-md md:leading-15 text-3xl sm:text-4xl md:text-6xl">{ t('your_budget') }</Text>
      </Card.Header>

      {
        !user || !expenses ? (
          <Loading size='xl' color='white' className='my-5' type='points'/>
        ) : (
          <>
            <Card.Body className="flex flex-col items-center justify-center overflow-hidden">
              <Grid.Container gap={5}>
                <Grid xs={ 12 } sm={ 4 }>
                  <CircularProgressbar
                    value={ percentage }
                    text={ `${ percentage }%` }
                    strokeWidth={8}
                    styles={{
                      path: {
                        stroke: '#fff',
                      },
                      text: {
                        fill: '#fff',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                      },
                    }}
                  />
                </Grid>
                <Grid xs={ 12 } sm={ 8 } className='flex flex-col gap-3 justify-center'>
                  <div className="flex justify-between">
                    <Text h5 className="text-white drop-shadow-md" weight='semibold' size={ 20 }>{ t('budget_left') }:</Text>
                    <Text h5 className="text-white drop-shadow-md" weight='bold' size={ 20 }>{ currency.format(budgetLeft) }</Text>
                  </div>
                  <div className="flex justify-between">
                  <Text h5 className="text-white drop-shadow-md" weight='semibold' size={ 20 }>{ t('budget_spent') }:</Text>
                    <Text h5 className="text-white drop-shadow-md" weight='bold' size={ 20 }>{ currency.format(totalExpenses) }</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text h5 className="text-white drop-shadow-md" weight='semibold' size={ 20 }>{ t('total_budget') }:</Text>
                    <Text h5 className="text-white drop-shadow-md" weight='bold' size={ 20 }>{ currency.format(budget) }</Text>
                  </div>
                </Grid>
              </Grid.Container>
            </Card.Body>

            <Card.Footer className="flex justify-center gap-5 px-10 flex-col md:flex-row">
              <Button 
                auto 
                size='lg' 
                className="w-3/4 bg-white text-primary font-bold" 
                onClick={ () => handleOpenDialog('edit') }
                iconRight={ <HiOutlinePencilAlt /> }
              >
                { t('edit_budget') }
              </Button>
              <Button 
                auto 
                size='lg' 
                className="w-3/4 bg-white text-primary font-bold" 
                onClick={ () => handleOpenDialog('add') }
                iconRight={ <HiOutlinePlus /> }
              >
                { t('add_budget') }
              </Button>
            </Card.Footer>
          </>
        )
      }
      <BudgetModal isOpen={ isDialogOpen } onClose={ handleCloseDialog } type={ dialogType }/>
    </Card>
  )
}