import MainLayout from '../../components/MainLayout'
import DevicePresenter from '../../presenters/DevicePresenter'
import { Model } from '../../model/Model'
import { useSession } from 'next-auth/react'

export default function DevicePage({ model }: { model: Model }) {
  const { data: session } = useSession()
  return (
    <MainLayout model={model}>
      <>
        <p>{session?.user?.name}</p>
        <DevicePresenter />
      </>
    </MainLayout>
  )
}
DevicePage.auth = true
