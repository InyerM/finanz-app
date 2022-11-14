import { Container } from "@nextui-org/react"
import { AddOrEditExpeneseForm } from "../../../components/finance"
import { MainLayout } from "../../../components/layout"

const AddExpensePage = () => {
  return (
    <MainLayout title="Add Expense" description="Edit Expense">
      <Container>
        <AddOrEditExpeneseForm type='add'/>
      </Container>
    </MainLayout>
  )
}

export default AddExpensePage