import MainLayout from '../../components/MainLayout'
import AboutPresenter from '../../presenters/aboutPresenter'
import { Model } from '../../model/Model'

export default function AboutPage({ model }: { model: Model }) {
  return (
    <MainLayout model={model}>
      <AboutPresenter />
    </MainLayout>
  )
}
