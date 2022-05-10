import DeviceView from '../views/DeviceView'
import { useEffect, useState } from 'react'
import { Model } from '../model/Model'
import { SensorType } from '../model/Sensor'
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

  // Wait until sensors are fetched
  if (fetchedSensorsError) return <p>Failed to fetch sensors. Please refresh.</p>
  if (fetchedSensors === null) return <p>Loading sensors...</p>

  return <DeviceView temp={45} gasses={886} />
}
