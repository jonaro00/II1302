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

  // Call to fetch sensors
  const getSensorsFetcher = useCallback(
    () =>
      fetch('/api/sensors')
        .then(res => res.json())
        .then(s => model.setSensors(s)),
    [model],
  )
  // Start a fetch for sensors on mount
  const [sensorsPromise, setSensorsPromise] = useState<Promise<void> | null>(null)
  useEffect(() => {
    setSensorsPromise(getSensorsFetcher())
  }, [getSensorsFetcher])
  const [_, fetchedSensorsError] = usePromise<void>(sensorsPromise)

  // Add device form
  const [addDevicePromise, setAddDevicePromise] = useState<Promise<boolean> | null>(null)
  const [addDeviceSuccess, addDeviceError] = usePromise<boolean>(addDevicePromise)
  const addDeviceLoading = useMemo(
    () => addDevicePromise !== null && addDeviceSuccess === null && addDeviceError === null,
    [addDevicePromise, addDeviceSuccess, addDeviceError],
  )
  const addSensorFetcher = useCallback(
    (n: string, l: string) =>
      setAddDevicePromise(
        fetch('/api/sensors/add', {
          method: 'POST',
          body: JSON.stringify({
            device_azure_name: n,
            location: l,
          } as SensorUserData),
        }).then(async res => {
          if (!res.ok) throw new Error((await res.json())?.error)
          setSensorsPromise(getSensorsFetcher())
          return true
        }),
      ),
    [getSensorsFetcher],
  )

  // Device Promise handling
  const [devicePromise, setDevicePromise] = useState<Promise<boolean> | null>(null)
  const [devicePromiseSuccess, devicePromiseError] = usePromise<boolean>(devicePromise)
  const devicePromiseLoading = useMemo(
    () => devicePromise !== null && devicePromiseSuccess === null && devicePromiseError === null,
    [devicePromise, devicePromiseSuccess, devicePromiseError],
  )
  // Delete device
  const deleteSensorFetcher = useCallback(
    (i: number) =>
      setDevicePromise(
        fetch(`/api/sensors/delete/${i}`).then(async res => {
          if (!res.ok) throw new Error((await res.json())?.error)
          setSensorsPromise(getSensorsFetcher())
          return true
        }),
      ),
    [getSensorsFetcher],
  )
  // Update device
  const updateSensorFetcher = useCallback(
    (i: number, d: SensorUserData) =>
      setDevicePromise(
        fetch(`/api/sensors/update/${i}`, {
          method: 'POST',
          body: JSON.stringify(d),
        }).then(async res => {
          if (!res.ok) throw new Error((await res.json())?.error)
          setSensorsPromise(getSensorsFetcher())
          return true
        }),
      ),
    [getSensorsFetcher],
  )

  // Prevent success/error boxes to remain after a re-fetch of sensors
  useEffect(() => {
    setDevicePromise(null) // FIXME: Correct for deletes, but weird for edits...
  }, [sensors])

  // Wait until sensors are fetched
  if (fetchedSensorsError) return <p>Failed to fetch sensors. Please try again later.</p>
  if (sensorsPromise && !sensors) return <p>Loading sensors...</p>

  return (
    <DeviceView
      sensors={sensors}
      addDeviceErrorText={addDeviceError?.message ?? ''}
      addDeviceLoading={addDeviceLoading}
      addDeviceSuccess={!!addDeviceSuccess}
      addDevice={addSensorFetcher}
      addDeviceClearPromise={() => setAddDevicePromise(null)}
      deleteDevice={deleteSensorFetcher}
      updateDevice={updateSensorFetcher}
      devicePromiseErrorText={devicePromiseError?.message ?? ''}
      devicePromiseLoading={devicePromiseLoading}
      devicePromiseSuccess={!!devicePromiseSuccess}
      devicePromiseClear={() => setDevicePromise(null)}
    />
  )
}
