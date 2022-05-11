import DeviceView from '../views/DeviceView'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Model } from '../model/Model'
import { SensorType, SensorUserData } from '../model/Sensor'
import useModelProperty from '../hooks/useModelProperty'
import usePromise from '../hooks/usePromise'
import useUpdateLogger from '../hooks/useUpdateLogger'

export default function DevicePresenter({ model }: { model: Model }) {
  // Observe
  const sensors = useModelProperty<SensorType[]>(model, 'sensors')
  useUpdateLogger(sensors, 'sensors')

  // Start a fetch for sensors on mount
  const [sensorsPromise, setSensorsPromise] = useState<Promise<SensorType[]> | null>(null)
  useEffect(() => {
    setSensorsPromise(fetch('/api/sensors').then(res => res.json()))
  }, [])
  const [fetchedSensors, fetchedSensorsError] = usePromise<SensorType[]>(sensorsPromise)

  // Add device form
  const [addDevicePromise, setAddDevicePromise] = useState<Promise<boolean> | null>(null)
  const [deviceName, setDeviceName] = useState('')
  const [deviceLocation, setDeviceLocation] = useState('')
  const [deviceSuccess, deviceUserError] = usePromise<boolean>(addDevicePromise)
  const deviceLoading = useMemo(
    () => addDevicePromise !== null && deviceSuccess === null && deviceUserError === null,
    [addDevicePromise, deviceSuccess, deviceUserError],
  )
  const submit = useCallback(() => {
    setAddDevicePromise(
      fetch('/api/sensors/add', {
        method: 'POST',
        body: JSON.stringify({
          device_azure_name: deviceName,
          location: deviceLocation,
        } as SensorUserData),
      }).then(async res => {
        if (!res.ok) throw new Error((await res.json())?.error)
        return true
      }),
    )
  }, [deviceName, deviceLocation])
  useUpdateLogger(deviceUserError)

  // Wait until sensors are fetched
  if (fetchedSensorsError) return <p>Failed to fetch sensors. Please try again later.</p>
  if (fetchedSensors === null) return <p>Loading sensors...</p>

  return (
    <DeviceView
      sensors={fetchedSensors}
      deviceFormErrorText={deviceUserError?.message ?? ''}
      deviceFormLoading={deviceLoading}
      deviceFormSuccess={!!deviceSuccess}
      onDeviceName={setDeviceName}
      onDeviceLocation={setDeviceLocation}
      deviceFormSubmitHandler={submit}
    />
  )
}
