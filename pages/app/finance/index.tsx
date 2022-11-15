import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { Container, Grid, Spacer } from "@nextui-org/react"
import { MainLayout } from "../../../components/layout"
import { CardBudget, CardExpenses } from "../../../components/finance"
import { useI18N } from "../../../context"
import { IExpenseData, IExpenseResponse } from "../../../interfaces"

import 'react-circular-progressbar/dist/styles.css'
import { finanzApi } from '../../../api'
import { expenseService } from '../../../data'

interface Props {
  expenses: IExpenseData[]
  ok: boolean
}

const FinancePage: FC<Props> = ({ expenses, ok }) => {
  console.log("🚀 ~ file: index.tsx ~ line 18 ~ expenses", expenses)
  const { t } = useI18N()
  // const { expenses, isLoading, ok } = useExpenses('/expense')
  return (
    <MainLayout title={ t('finance_title') } description={ t('finance_description') }>
      <Container className="max-w-2xl">
        <CardBudget />
      </Container>

      <Spacer y={ 3 }/>

      <Container className="max-w-5xl">
        <CardExpenses expenses={ expenses } isLoading={ !expenses && !ok } isError={ ok }/>
      </Container>
    </MainLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const { userId } = req.cookies
    const { expenses, ok } = await expenseService.getExpenses(userId || '')
    return {
      props: {
        expenses: JSON.parse(JSON.stringify(expenses)) || [],
        ok: ok || false
      }
    }
  } catch (error) {
    return {
      props: {
        expenses: [],
        ok: false
      }
    }
  }

}

export default FinancePage