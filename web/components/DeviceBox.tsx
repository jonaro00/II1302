import {
  Button,
  Confirm,
  Dropdown,
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

ChartJS.register(LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend)

/*
Future constant using chart.js
https://www.chartjs.org/docs/latest/
https://www.chartjs.org/docs/latest/samples/line/interpolation.html
*/

function TempHumidityGraph(times: string[], temps: number[], humidities: number[]) {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: { position: 'top' as const },
      title: {
        // display: true,
        // text: 'Temperature and Humidity',
      },
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

function randTemp() {
  return faker.datatype.float({ min: 20, max: 22, precision: 0.1 })
}
function randHumidity() {
  return faker.datatype.number({ min: 30, max: 60 })
}

const datasetTypes = {
  temp: { title: 'Live Temperature', unit: '°C' },
  humidity: { title: 'Live Humidity', unit: '%' },
  lpg: { title: 'Live LPG concentration', unit: 'ppm' },
  co: { title: 'Live Carbon Monoxide concentration', unit: 'ppm' },
  smoke: { title: 'Live Smoke concentration', unit: 'ppm' },
}

function LiveDataBox(type: keyof IncomingTelemetry, value: number, recent: boolean) {
  const { title, unit }: { title: string; unit: string } = datasetTypes[type]

  return (
    <Grid className={[styles.nopad, styles[type], recent ? '' : styles.outdated].join(' ')}>
      <Grid.Row centered>
        <Header>{title}</Header>
      </Grid.Row>
      <Grid.Row centered>
        <Statistic horizontal>
          <Statistic.Value>{value.toFixed(1) ?? '--'}</Statistic.Value>
          <Statistic.Label>{unit}</Statistic.Label>
        </Statistic>
      </Grid.Row>
    </Grid>
  )
}

export default function DeviceBox({
  sensor: s,
  telemetry: t,
  deleteDevice,
  updateDevice,
  devicePromiseLoading,
  devicePromiseErrorText,
  devicePromiseSuccess,
  devicePromiseClear,
}: {
  sensor: SensorType & { fake?: boolean }
  telemetry: TelemetrySeries
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

  return (
    <Grid columns="equal" padded className={styles.grid} key={s.id}>
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
                    color={true ? 'green' : 'red'}
                    style={{ margin: '0 0 0 .75rem' }}
                  />
                </i>
              </Header>
              <Button as={Label} onClick={() => setConfirmDeviceEditOpen(true)}>
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
              <Dropdown icon="setting" pointing="left" as={Button}>
                <Dropdown.Menu>
                  <Dropdown.Item text="Focus mode" />
                  <Dropdown.Item>
                    <Dropdown text="Add" pointing="left">
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Dropdown text="Temperature">
                            <Dropdown.Menu>
                              <Dropdown.Item text="Live reading" />
                              <Dropdown.Item text="Live graphing" />
                              <Dropdown.Item text="Historical graphing" />
                            </Dropdown.Menu>
                          </Dropdown>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Dropdown text="gasses levels">
                            <Dropdown.Menu>
                              <Dropdown.Item text="Live reading" />
                              <Dropdown.Item text="Live graphing" />
                              <Dropdown.Item text="Historical graphing" />
                            </Dropdown.Menu>
                          </Dropdown>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Dropdown.Item>
                  <Dropdown.Item text="Remove device" />
                </Dropdown.Menu>
              </Dropdown>
              <Button icon="expand" /* click for focus mode ? */ />
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
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={styles.nopad}>
        <Grid.Column className={styles.box}>
          {LiveDataBox(
            'temp',
            s?.fake ? temps[temps.length - 1] : t.temps[t.temps.length - 1],
            true,
          )}
        </Grid.Column>
        <Grid.Column className={styles.box}>
          {LiveDataBox(
            'humidity',
            s?.fake ? humidities[humidities.length - 1] : t.humidities[t.humidities.length - 1],
            true,
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={styles.nopad}>
        <Grid.Column className={styles.graphbox}>
          {s?.fake
            ? TempHumidityGraph(times, temps, humidities)
            : TempHumidityGraph(t.times, t.temps, t.humidities)}
          {s?.fake ? (
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
          ) : (
            false
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
