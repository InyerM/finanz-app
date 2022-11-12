import { FC } from 'react'
import { Text } from '@nextui-org/react'
import { useI18N } from '../../context'

interface Props {
  name: string
  path: string
  onClick: (path: string, name: string) => void
}

export const NavItem: FC<Props> = ({ name, path, onClick }) => {
  const { t } = useI18N()

  const navigate = () => {
    onClick(path, name)
  }

  return (
    <div key={ name } onClick={ () => navigate() } className='transition-all transform cursor-pointer hover:opacity-80 hover:translate-x-1 hover:-translate-y-1'>
      <Text 
        h1 
        size={ 20 }
        css={{
          textGradient: "180deg, $yellow600 -20%, $red600 100%",
        }}
        weight="bold"
        className='text-center'
      >{ t( name ) }</Text>
    </div>
  )
}