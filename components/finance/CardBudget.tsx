import { FC } from 'react'
import { Card, Grid, Button, Text } from '@nextui-org/react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { useI18N } from '../../context'

interface Props {
}

export const CardBudget: FC<Props> = () => {
  const { t } = useI18N()
  return (
    <Card className="px-5 py-3 bg-gradient-to-tr from-primary to-secondary" isPressable>
      <Card.Header className="w-3/4">
        <Text h2 size={ 60 } weight='extrabold' className="text-white drop-shadow-md leading-15">{ t('your_budget') }</Text>
      </Card.Header>

      <Card.Body className="flex flex-col items-center justify-center overflow-hidden">
        <Grid.Container gap={5}>
          <Grid xs={ 12 } sm={ 4 }>
            <CircularProgressbar
              value={ 50 }
              text={ '50%' }
              strokeWidth={8}
              styles={{
                path: {
                  stroke: '#fff',
                },
                text: {
                  fill: '#fff',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                },
              }}
            />
          </Grid>
          <Grid xs={ 12 } sm={ 8 } className='flex flex-col gap-3 justify-center'>
            <div className="flex justify-between">
              <Text h5 className="text-white drop-shadow-md" weight='semibold' size={ 20 }>{ t('budget_left') }:</Text>
              <Text h5 className="text-white drop-shadow-md" weight='bold' size={ 20 }>$1000</Text>
            </div>
            <div className="flex justify-between">
            <Text h5 className="text-white drop-shadow-md" weight='semibold' size={ 20 }>{ t('budget_spent') }:</Text>
              <Text h5 className="text-white drop-shadow-md" weight='bold' size={ 20 }>$1000</Text>
            </div>
            <div className="flex justify-between">
              <Text h5 className="text-white drop-shadow-md" weight='semibold' size={ 20 }>{ t('total_budget') }:</Text>
              <Text h5 className="text-white drop-shadow-md" weight='bold' size={ 20 }>$1000</Text>
            </div>
          </Grid>
        </Grid.Container>
      </Card.Body>

      <Card.Footer className="flex justify-center gap-5 px-10">
        <Button auto size='lg' className="w-3/4 bg-white text-primary font-bold">
          { t('edit_budget') }
        </Button>
        <Button auto size='lg' className="w-3/4 bg-white text-primary font-bold">
          { t('add_budget') }
        </Button>
      </Card.Footer>
    </Card>
  )
}