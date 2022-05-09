import HomePresenter from '../presenters/homePresenter'
import MainLayout from '../components/MainLayout'
import { Model } from '../model/Model'

export default function Home({ model }: { model: Model }) {
  return (
    <MainLayout model={model}>
      <HomePresenter />
    </MainLayout>
  )
}
