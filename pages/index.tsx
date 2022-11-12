import { Grid } from '@nextui-org/react'
import { CardHome } from '../components/home'
import { MainLayout } from "../components/layout"
import { useI18N } from '../context'

const HomePage = () => {
  const { t } = useI18N()
  return (
    <MainLayout description={ t('home_description') } title={ t('home_title') }>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={4}>
          <CardHome />
        </Grid>
        <Grid xs={12} sm={4}>
          <CardHome />
        </Grid>
        <Grid xs={12} sm={4}>
          <CardHome />
        </Grid>
        <Grid xs={12} sm={4}>
          <CardHome />
        </Grid>
        <Grid xs={12} sm={4}>
          <CardHome />
        </Grid>
        <Grid xs={12} sm={4}>
          <CardHome />
        </Grid>
      </Grid.Container>

    </MainLayout>
  )
}

export default HomePage
