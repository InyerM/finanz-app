import { FC } from 'react'
import { Divider, Grid, Input, Modal, Text, Textarea } from '@nextui-org/react'
import { HiOutlineClipboardCopy } from 'react-icons/hi'

import { useI18N } from '../../context'
import { Select } from './'


interface Props {
  isOpen: boolean
  type: 'edit' | 'add'
  onClose: () => void
}

export const AddOrEditExpenseModal: FC<Props> = ({ isOpen, onClose, type }) => {
  const { t } = useI18N()
  return (
    <Modal
      closeButton
      open={ isOpen }
      onClose={ onClose }
      width='800px'
      scroll
    >
      <Modal.Header>
        <Text h4 size={ 20 } weight='semibold'>
          { type === 'add' ? t('add_expense') : t('edit_expense') }
        </Text>
      </Modal.Header>
      <Divider height={2}/>

      <Modal.Body>
        <Grid.Container>
          <Grid xs={ 12 } md={ 6 }>
            <Input
              type=''
              clearable
              bordered
              size="lg"
              placeholder={ t('expense_name') }
              contentLeft={<HiOutlineClipboardCopy fill="#222" />}
            />
          </Grid>
          <Grid xs={ 12 } md={ 6 }>    
            <Textarea 
              placeholder={ t('expense_description') }
              bordered
              size="lg"
              rows={ 3 }
              className="mt-3"
            />
          </Grid>
          <Grid xs={ 12 } md={ 6 }>
            <Select selected='food' setSelected={() => {}}/>
          </Grid>
        </Grid.Container>
        

      </Modal.Body>
    </Modal>
  )
}