import { GetStaticProps, NextPage } from 'next'
import { Grid } from '@nextui-org/react'
import { CardHome } from '../components/home'
import { MainLayout } from "../components/layout"
import { useI18N } from '../context'
import { newsService } from '../data'
import { INewData } from '../interfaces'

interface Props {
  news: INewData[]
}

const HomePage: NextPage<Props> = ({ news }) => {
  const { t } = useI18N()


  const newsToShow = news.map((newData, index) => (
    <Grid xs={12} sm={ 4 } key={index}>
      <CardHome {...newData} />
    </Grid>
  ))

  return (
    <MainLayout description={ t('home_description') } title={ t('home_title') }>
      <Grid.Container gap={2} justify="center">
        {
          newsToShow
        }
      </Grid.Container>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { news } = await newsService.getAllNews()

  return {
    props: {
      news: JSON.parse(JSON.stringify(news))
    }
  }
}

export default HomePage
