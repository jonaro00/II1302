import DeviceView from '../views/DeviceView'
import { useSession } from 'next-auth/react'

const DevicePresenter = () => {
  const { status } = useSession({ required: true })
  if (status !== 'authenticated') return <p>Loading...</p>

  return <DeviceView temp={45} gasses={886} />
}

export default DevicePresenter
