import { FC } from 'react'
import { Container, Spacer } from "@nextui-org/react"
import { MainLayout } from "../../../components/layout"
import { CardBudget, CardExpenses } from "../../../components/finance"
import { useI18N } from "../../../context"

import 'react-circular-progressbar/dist/styles.css'

interface Props {
}

const FinancePage: FC<Props> = () => {
  const { t } = useI18N()

  return (
    <MainLayout title={ t('finance_title') } description={ t('finance_description') }>
      <Container className="max-w-2xl p-0">
        <CardBudget />
      </Container>

      <Spacer y={ 3 }/>

      <Container className="max-w-5xl p-0">
        <CardExpenses />
      </Container>
    </MainLayout>
  )
}

export default FinancePage