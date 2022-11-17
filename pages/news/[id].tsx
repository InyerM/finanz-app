import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import { CardNew } from '../../components/home'
import { MainLayout } from "../../components/layout"
import { useI18N } from '../../context'
import { newsService } from '../../data'
import { INewData } from '../../interfaces'

interface Props {
  thisNew: INewData
}

const HomePage: NextPage<Props> = ({ thisNew }) => {
  const { t } = useI18N()

  return (
    <MainLayout description={ t('home_description') } title={ t('home_title') }>
      <CardNew { ...thisNew } />
    </MainLayout>
  )
}


export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const { ids } = await newsService.getAllIds()
  let paths: any[] = []

  locales?.forEach(locale => {
    paths = paths.concat(ids!.map(id => ({
      params: { id: id.toString(), locale }
    })))
  })

  return {
    paths,
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params!
  const { thisNew } = await newsService.getNewsById(id?.toString()!)

  if (!thisNew) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      thisNew: JSON.parse(JSON.stringify(thisNew))
    }
  }
}

export default HomePage
