import DeviceView from '../views/DeviceView'
import { useSession } from 'next-auth/react'

const DevicePresenter = () => {
  const { status } = useSession({ required: true })
  return status === 'authenticated' ? <DeviceView temp={45} gasses={886} /> : <p>Loading...</p>
}

export default DevicePresenter
