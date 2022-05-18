import DeviceView from '../views/DeviceView'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Model } from '../model/Model'
import { SensorType, SensorUserData, SensorTelemetries } from '../model/Sensor'
import { TelemetryType } from '../model/Telemetry'
import useInterval from '../hooks/useInterval'
import useModelProperty from '../hooks/useModelProperty'
import usePromise from '../hooks/usePromise'
import useUpdateLogger from '../hooks/useUpdateLogger'
import { parseISO } from 'date-fns'

export default function DevicePresenter({ model }: { model: Model }) {
  // Observe model
  const sensors = useModelProperty<SensorType[]>(model, 'sensors')
  const raw_telemetry = useModelProperty<
    Record<number, (Omit<TelemetryType, 'createdAt'> & { createdAt: string })[]>
  >(model, 'telemetry')
  // Restructure the telemetry in model
  const telemetry: SensorTelemetries = useMemo(() => {
    const o: SensorTelemetries = {}
    sensors.map(s => {
      const times: string[] = [],
        temps: number[] = [],
        humidities: number[] = [],
        lpgs: number[] = [],
        cos: number[] = [],
        smokes: number[] = []
      raw_telemetry[s.id]?.forEach(t => {
        times.push(t.createdAt)
        temps.push(t.temp)
        humidities.push(t.humidity)
        lpgs.push(t.lpg * 1000) // yikes
        cos.push(t.co * 1000) // yikes
        smokes.push(t.smoke * 1000) // yikes
      })
      o[s.id] = {
        times,
        temps,
        humidities,
        lpgs,
        cos,
        smokes,
        recent: Date.now() - parseISO(times[times.length - 1]).getTime() < 60000,
      }
    })
    return o
  }, [raw_telemetry, sensors])
  // Debug
  useUpdateLogger(sensors, 'sensors')
  useUpdateLogger(raw_telemetry, 'raw telemetry')
  useUpdateLogger(telemetry, 'telemetry')

  // Call to fetch sensors
  const getSensorsFetcher = useCallback(
    () =>
      fetch('/api/sensors')
        .then(res => res.json())
        .then((s: SensorType[]) => model.setSensors(s)),
    [model],
  )
  // Start a fetch for sensors on mount
  const [sensorsPromise, setSensorsPromise] = useState<Promise<void> | null>(null)
  useEffect(() => {
    setSensorsPromise(getSensorsFetcher())
  }, [getSensorsFetcher])
  const [_, fetchedSensorsError] = usePromise<void>(sensorsPromise)

  // Add Device Promise handling
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

  // Update/Delete Device Promise handling
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
    setDevicePromise(null) // FIXME: Works for deletes, but weird for edits...
  }, [sensors])

  // Call to fetch telemetry
  const getTelemetryFetcher = useCallback(() => {
    Promise.all(
      sensors.map(async s =>
        fetch(`/api/sensors/telemetry/${s.id}`)
          .then(async res => {
            if (!res.ok) throw new Error(await res.json())
            return res.json()
          })
          .then((t: TelemetryType[]) => model.setDeviceTelemetry(s.id, t))
          .catch(() => {}),
      ),
    )
  }, [model, sensors])
  // Fetch every 30 s.
  useInterval(getTelemetryFetcher, 30000)

  // Wait until sensors are fetched
  if (fetchedSensorsError) return <p>Failed to fetch sensors. Please try again later.</p>
  if (sensorsPromise && !sensors) return <p>Loading sensors...</p>

  return (
    <DeviceView
      sensors={sensors}
      telemetry={telemetry}
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
