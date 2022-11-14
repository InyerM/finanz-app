import { FC } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const BudgetModal: FC<Props> = () => {
  return (
    <div>BudgetModal</div>
  )
}