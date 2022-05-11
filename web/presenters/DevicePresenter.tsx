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
  const [fetchedSensors, fetchedSensorsError] = usePromise<void>(sensorsPromise)

  // Add device form
  const [addDevicePromise, setAddDevicePromise] = useState<Promise<boolean> | null>(null)
  const [addDeviceName, setAddDeviceName] = useState('')
  const [addDeviceLocation, setAddDeviceLocation] = useState('')
  const [addDeviceSuccess, addDeviceError] = usePromise<boolean>(addDevicePromise)
  const addDeviceLoading = useMemo(
    () => addDevicePromise !== null && addDeviceSuccess === null && addDeviceError === null,
    [addDevicePromise, addDeviceSuccess, addDeviceError],
  )
  const addSensorFetcher = useCallback(
    () =>
      setAddDevicePromise(
        fetch('/api/sensors/add', {
          method: 'POST',
          body: JSON.stringify({
            device_azure_name: addDeviceName,
            location: addDeviceLocation,
          } as SensorUserData),
        }).then(async res => {
          if (!res.ok) throw new Error((await res.json())?.error)
          setSensorsPromise(getSensorsFetcher())
          return true
        }),
      ),
    [addDeviceName, addDeviceLocation, getSensorsFetcher],
  )

  // Delete device button
  const [deleteDevicePromise, setDeleteDevicePromise] = useState<Promise<boolean> | null>(null)
  const [deleteDeviceSuccess, deleteDeviceError] = usePromise<boolean>(deleteDevicePromise)
  const deleteDeviceLoading = useMemo(
    () =>
      deleteDevicePromise !== null && deleteDeviceSuccess === null && deleteDeviceError === null,
    [deleteDevicePromise, deleteDeviceSuccess, deleteDeviceError],
  )
  const deleteSensorFetcher = useCallback(
    (i: number) =>
      setDeleteDevicePromise(
        fetch(`/api/sensors/delete/${i}`).then(async res => {
          if (!res.ok) throw new Error((await res.json())?.error)
          setSensorsPromise(getSensorsFetcher())
          return true
        }),
      ),
    [getSensorsFetcher],
  )

  // Prevent success/error boxes to reamin after a re-fetch of sensors
  useEffect(() => {
    setDeleteDevicePromise(null)
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
      setAddDeviceName={setAddDeviceName}
      setAddDeviceLocation={setAddDeviceLocation}
      addDevice={addSensorFetcher}
      addDeviceClearPromise={() => setAddDevicePromise(null)}
      deleteDeviceErrorText={deleteDeviceError?.message ?? ''}
      deleteDeviceLoading={deleteDeviceLoading}
      deleteDeviceSuccess={!!deleteDeviceSuccess}
      deleteDevice={deleteSensorFetcher}
      deleteDeviceClearPromise={() => setDeleteDevicePromise(null)}
    />
  )
}
