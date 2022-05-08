import MainLayout from '../components/MainLayout'
import DevicePresenter from '../presenters/DevicePresenter'
import { Model } from '../model/Model'

export default function DevicePage({ model }: { model: Model }) {
  return (
    <MainLayout model={model}>
      <DevicePresenter />
    </MainLayout>
  )
}
DevicePage.auth = true
