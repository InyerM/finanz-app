import { Container, Loading, Text } from "@nextui-org/react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { AddOrEditExpeneseForm } from "../../../../components/finance"
import { MainLayout } from "../../../../components/layout"
import { toastConfig } from "../../../../constants"
import { useI18N } from "../../../../context"
import { useExpenses } from "../../../../hooks"
import { IExpense } from "../../../../interfaces"

const expense: IExpense = {
  _id: '1',
  name: 'Café',
  description: 'Café en la oficina',
  category: 'food',
  amount: 2.5,
  date: '2021-01-01',
  userId: '1',
}

const EditExpensePage = () => {
  const { query, replace } = useRouter()
  const { expense, isLoading, ok } = useExpenses(`/expense/${ query?.id }`)
  const { t } = useI18N()

  // if(!expense && !isLoading && !ok) {
  //   toast(t('expense_not_found'), toastConfig)
  //   replace('/app/finance')
  // }
  
  return (
    <MainLayout title="Edit Expense" description="Edit Expense">
      <Container>
        {
          expense && !isLoading && (
            <AddOrEditExpeneseForm
              expense={ expense }
              type='edit'
            />
          )
        }
        {
          isLoading && (
            <Loading type="points-opacity" size='xl'/>
          )
        }
        {
          !expense && !isLoading && !ok && (
            <Text size={ 25 }>Expense not found</Text>
          )
        }
      </Container>
    </MainLayout>
  )
}

export default EditExpensePage