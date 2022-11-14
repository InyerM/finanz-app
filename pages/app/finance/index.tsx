import { Container, Grid, Spacer } from "@nextui-org/react"
import { MainLayout } from "../../../components/layout"
import { CardBudget, CardExpenses } from "../../../components/finance"
import { useI18N } from "../../../context"
import { IExpenseData } from "../../../interfaces"

import 'react-circular-progressbar/dist/styles.css'

const expenses: IExpenseData[] = [
  {
    name: 'Café',
    description: 'Café en la oficina',
    category: 'food',
    amount: 2.5,
    date: '2021-01-01',
  },
  {
    name: 'Gym',
    description: 'Suscripción al gimnasio',
    category: 'health',
    amount: 50,
    date: '2021-01-01',
  },
  {
    name: 'Café',
    description: 'Café en la oficina',
    category: 'food',
    amount: 2.5,
    date: '2021-01-01',
  },
  {
    name: 'Gym',
    description: 'Suscripción al gimnasio',
    category: 'health',
    amount: 50,
    date: '2021-01-01',
  },
  {
    name: 'Café',
    description: 'Café en la oficina',
    category: 'food',
    amount: 2.5,
    date: '2021-01-01',
  },
  {
    name: 'Gym',
    description: 'Suscripción al gimnasio',
    category: 'health',
    amount: 50,
    date: '2021-01-01',
  },
]


const FinancePage = () => {
  const { t } = useI18N()
  return (
    <MainLayout title={ t('finance_title') } description={ t('finance_description') }>
      <Container className="max-w-2xl">
        <CardBudget />
      </Container>

      <Spacer y={ 3 }/>

      <Container className="max-w-5xl">
        <CardExpenses expenses={ expenses }/>
      </Container>
    </MainLayout>
  )
}

export default FinancePage