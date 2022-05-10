import MainLayout from '../components/MainLayout'
import DevicePresenter from '../presenters/DevicePresenter'
import { Model } from '../model/Model'
import { useSession } from 'next-auth/react'

export default function DevicePage({ model }: { model: Model }) {
  // Wait until authenticated
  const { status } = useSession({ required: true })
  return (
    <MainLayout model={model} title="Devices" description="Manage your devices">
      {status !== 'authenticated' ? <p>Loading...</p> : <DevicePresenter model={model} />}
    </MainLayout>
  )
}
DevicePage.auth = true
