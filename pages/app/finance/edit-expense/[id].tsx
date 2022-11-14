import { Container } from "@nextui-org/react"
import { AddOrEditExpeneseForm } from "../../../../components/finance"
import { MainLayout } from "../../../../components/layout"
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
  return (
    <MainLayout title="Edit Expense" description="Edit Expense">
      <Container>
        <AddOrEditExpeneseForm expense={ expense } type='edit'/>
      </Container>
    </MainLayout>
  )
}

export default EditExpensePage