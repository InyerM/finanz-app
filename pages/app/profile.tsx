import { MainLayout } from "../../components/layout"
import { useI18N } from "../../context"

const ProfilePage = () => {
  const { t } = useI18N()
  return (
    <MainLayout title={ t('profile_title') } description={ t('profile_description') }>

    </MainLayout>
  )
}

export default ProfilePage