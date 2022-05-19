import {
  Button,
  Confirm,
  Form,
  Grid,
  Header,
  Icon,
  Label,
  Message,
  Segment,
  Statistic,
} from 'semantic-ui-react'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { sv } from 'date-fns/locale'
import 'chartjs-adapter-date-fns'
import faker from 'faker'
import { IncomingTelemetry, TelemetrySeries } from '../model/Telemetry'
import styles from '../styles/device.module.css'
import { useState } from 'react'
import { SensorType, SensorUserData } from '../model/Sensor'
import { ViewMode } from '../views/DeviceView'

ChartJS.register(LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend)

function TempHumidityGraph(times: string[], temps: number[], humidities: number[]) {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        type: 'time' as any /* prevent typescript from crying */,
        time: { unit: 'minute', stepSize: 10 },
        adapters: { date: { locale: sv } },
        suggestedMin: Date.now() - 3600000, // 1h
        suggestedMax: Date.now(),
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        suggestedMin: 17,
        suggestedMax: 25,
      },
      y2: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        min: 0,
        max: 100,
      },
    },
  }
  const datasets = [
    {
      label: 'Temperature (°C)',
      data: temps,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y1',
    },
    {
      label: 'Humidity (%)',
      data: humidities,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y2',
    },
  ]
  return <Line options={options} data={{ labels: times, datasets }} />
}
function GasGraph(times: string[], lpgs: number[], cos: number[], smokes: number[]) {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        type: 'time' as any /* prevent typescript from crying */,
        time: { unit: 'minute', stepSize: 10 },
        adapters: { date: { locale: sv } },
        suggestedMin: Date.now() - 3600000, // 1h
        suggestedMax: Date.now(),
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        // suggestedMin: 0,
        // suggestedMax: 10,
      },
    },
  }
  const datasets = [
    {
      label: 'LPG (PPM)',
      data: lpgs,
      borderColor: 'rgb(236, 108, 22)',
      backgroundColor: 'rgba(236, 108, 22, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Carbon Monoxide (PPM)',
      data: cos,
      borderColor: 'rgb(156, 1, 1)',
      backgroundColor: 'rgba(156, 1, 1, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Smoke (PPM)',
      data: smokes,
      borderColor: 'rgb(92, 92, 92)',
      backgroundColor: 'rgba(92, 92, 92, 0.5)',
      yAxisID: 'y',
    },
  ]
  return <Line options={options} data={{ labels: times, datasets }} />
}

function randTemp() {
  return faker.datatype.float({ min: 20, max: 22, precision: 0.1 })
}
function randHumidity() {
  return faker.datatype.number({ min: 30, max: 60 })
}

const datasetTypes = {
  temp: { title: 'Live Temperature', unit: '°C', precision: 1 },
  humidity: { title: 'Live Humidity', unit: '%', precision: 0 },
  lpg: { title: 'Live LPG concentration', unit: 'ppm', precision: 0 },
  co: { title: 'Live Carbon Monoxide concentration', unit: 'ppm', precision: 0 },
  smoke: { title: 'Live Smoke concentration', unit: 'ppm', precision: 0 },
}

function LiveDataBox(type: keyof IncomingTelemetry, value?: number, recent?: boolean) {
  const { title, unit, precision }: { title: string; unit: string; precision: number } =
    datasetTypes[type]

  return (
    <Grid className={[styles.nopad, styles[type], recent ? '' : styles.outdated].join(' ')}>
      <Grid.Row centered>
        <Header>{title}</Header>
      </Grid.Row>
      <Grid.Row centered>
        <Statistic horizontal>
          <Statistic.Value>
            {value === undefined || value === null ? '--' : value.toFixed(precision)}
          </Statistic.Value>
          <Statistic.Label>{unit}</Statistic.Label>
        </Statistic>
      </Grid.Row>
    </Grid>
  )
}

export default function DeviceBox({
  sensor: s,
  telemetry: t,
  viewMode,
  setFocusedSensor,
  deleteDevice,
  updateDevice,
  devicePromiseLoading,
  devicePromiseErrorText,
  devicePromiseSuccess,
  devicePromiseClear,
}: {
  sensor: SensorType & { fake?: boolean }
  telemetry: TelemetrySeries
  viewMode: ViewMode
  setFocusedSensor(): void
  deleteDevice(i: number): void
  updateDevice(i: number, d: SensorUserData): void
  devicePromiseLoading: boolean
  devicePromiseErrorText: string
  devicePromiseSuccess: boolean
  devicePromiseClear(): void
}) {
  // MOCK DATA
  const [times, setTimes] = useState(
    s?.fake
      ? Array(50)
          .fill(0)
          .map((_, i) => new Date(Date.now() - i * 70000).toISOString())
          .reverse()
      : [],
  )
  const [temps, setTemps] = useState(
    s?.fake
      ? Array(50)
          .fill(0)
          .map(() => randTemp())
      : [],
  )
  const [humidities, setHumidities] = useState(
    s?.fake
      ? Array(50)
          .fill(0)
          .map(() => randHumidity())
      : [],
  )

  const [confirmDeviceDeleteOpen, setConfirmDeviceDeleteOpen] = useState(false)
  const [confirmDeviceEditOpen, setConfirmDeviceEditOpen] = useState(false)
  const [locationText, setLocationText] = useState('')
  const [viewingGases, setViewingGases] = useState(false)

  return (
    <Grid
      columns="equal"
      padded
      className={[styles.grid, viewMode === ViewMode.Focus ? styles.focus : ''].join(' ')}
      key={s.id}>
      <Grid.Row className={styles.nopad} color="black">
        <Grid.Column>
          <Segment.Group horizontal>
            <Segment color="black" inverted>
              <Header>
                <i>
                  <Icon name="rss" />
                </i>
                {s.device_azure_name}
                <i>
                  <Icon
                    name="circle"
                    color={t.recent ? 'green' : 'red'}
                    title={t.recent ? 'Online' : 'Offline'}
                    style={{ margin: '0 0 0 .75rem' }}
                  />
                </i>
              </Header>
              <Button
                as={Label}
                onClick={() => setConfirmDeviceEditOpen(true)}
                data-testid="location">
                <Icon name="point" />
                Location: {s.location} <Icon fitted name="pencil" />
              </Button>
              <Confirm
                open={confirmDeviceEditOpen}
                header="Edit Device Location"
                content={
                  <Segment>
                    <Form>
                      <Form.Field required>
                        <label>New location</label>
                        <Form.Input
                          fluid
                          required
                          icon="point"
                          iconPosition="left"
                          placeholder="Living room"
                          onChange={e => setLocationText(e.target.value)}
                        />
                      </Form.Field>
                    </Form>
                    <Message error color="red" hidden={!devicePromiseErrorText}>
                      Error: {devicePromiseErrorText}
                    </Message>
                    <Message success color="green" hidden={!devicePromiseSuccess}>
                      Updated <b>{s.device_azure_name}</b>.
                    </Message>
                  </Segment>
                }
                cancelButton={
                  devicePromiseErrorText || devicePromiseSuccess ? (
                    <Button>Close</Button>
                  ) : undefined
                }
                onCancel={() => {
                  setConfirmDeviceEditOpen(false)
                  devicePromiseClear()
                }}
                confirmButton={
                  devicePromiseErrorText || devicePromiseSuccess ? (
                    false
                  ) : (
                    <Button loading={devicePromiseLoading}>OK</Button>
                  )
                }
                onConfirm={() =>
                  updateDevice(s.id, {
                    device_azure_name: s.device_azure_name,
                    location: locationText,
                  })
                }
              />
            </Segment>
            <Segment color="black" inverted style={{ flexGrow: 0 }}>
              <div>
                <Button icon="bell" />
                <Button data-testid="focus" icon="expand" onClick={setFocusedSensor} />
                <Button
                  icon="trash alternate"
                  negative
                  onClick={() => setConfirmDeviceDeleteOpen(true)}
                />
                <Confirm
                  open={confirmDeviceDeleteOpen}
                  header="Delete Device"
                  content={
                    <Segment>
                      Are you sure you want to delete <b>{s.device_azure_name}</b>?
                      <Message error color="red" hidden={!devicePromiseErrorText}>
                        Error: {devicePromiseErrorText}
                      </Message>
                      <Message success color="green" hidden={!devicePromiseSuccess}>
                        Deleted <b>{s.device_azure_name}</b>.
                      </Message>
                    </Segment>
                  }
                  cancelButton={
                    devicePromiseErrorText || devicePromiseSuccess ? (
                      <Button>Close</Button>
                    ) : undefined
                  }
                  onCancel={() => {
                    setConfirmDeviceDeleteOpen(false)
                    devicePromiseClear()
                  }}
                  confirmButton={
                    devicePromiseErrorText || devicePromiseSuccess ? (
                      false
                    ) : (
                      <Button loading={devicePromiseLoading}>OK</Button>
                    )
                  }
                  onConfirm={() => deleteDevice(s.id)}
                />
              </div>
              <div>
                <Button onClick={() => setViewingGases(!viewingGases)} data-testid="switch">
                  <Icon name="refresh" />
                  Switch graphs
                </Button>
              </div>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={styles.nopad}>
        {(viewMode === ViewMode.Focus || !viewingGases) && (
          <>
            <Grid.Column className={styles.box}>
              {LiveDataBox(
                'temp',
                s?.fake ? temps[temps.length - 1] : t.temps[t.temps.length - 1],
                t.recent,
              )}
            </Grid.Column>
            <Grid.Column className={styles.box}>
              {LiveDataBox(
                'humidity',
                s?.fake ? humidities[humidities.length - 1] : t.humidities[t.humidities.length - 1],
                t.recent,
              )}
            </Grid.Column>
          </>
        )}
        {(viewMode === ViewMode.Focus || viewingGases) && (
          <>
            <Grid.Column className={styles.box}>
              {LiveDataBox('lpg', s?.fake ? undefined : t.lpgs[t.lpgs.length - 1], t.recent)}
            </Grid.Column>
            <Grid.Column className={styles.box}>
              {LiveDataBox('co', s?.fake ? undefined : t.cos[t.cos.length - 1], t.recent)}
            </Grid.Column>
            <Grid.Column className={styles.box}>
              {LiveDataBox('smoke', s?.fake ? undefined : t.smokes[t.smokes.length - 1], t.recent)}
            </Grid.Column>
          </>
        )}
      </Grid.Row>
      <Grid.Row className={styles.nopad}>
        {(viewMode === ViewMode.Focus || !viewingGases) && (
          <Grid.Column className={styles.graphbox}>
            {s?.fake ? (
              <>
                {TempHumidityGraph(times, temps, humidities)}
                <Button
                  as="div"
                  size="mini"
                  onClick={() => {
                    setTemps([...temps.slice(1), randTemp()])
                    setHumidities([...humidities.slice(1), randHumidity()])
                  }}>
                  <Icon name="refresh" />
                  New fake datapoint
                </Button>
              </>
            ) : (
              TempHumidityGraph(t.times, t.temps, t.humidities)
            )}
          </Grid.Column>
        )}
        {(viewMode === ViewMode.Focus || viewingGases) && (
          <Grid.Column className={styles.graphbox}>
            {GasGraph(t.times, t.lpgs, t.cos, t.smokes)}
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  )
}
