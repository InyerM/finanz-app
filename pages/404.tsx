import { Text, Divider } from '@nextui-org/react';
import { MainLayout } from "../components/layout"
import { useI18N } from '../context'

const Page404 = () => {
  const { t } = useI18N()
  return (
    <MainLayout title={ t('not_found_title') } description={ 'not_found_description' }>
      <div className="flex items-center gap-5 px-5 mt-52">
        <Text h1 size={ 60 }>404</Text>
        <Divider className='rotate-90'/>
        <Text h3 size={ 20 } className='block'>{ t('not_found_title') }</Text>
      </div>
    </MainLayout>
  )
}

export default Page404