import {
  Button,
  Confirm,
  Dropdown,
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
import { IncomingTelemetry } from '../model/Telemetry'
import styles from '../styles/device.module.css'
import { useState } from 'react'
import { SensorType } from '../model/Sensor'

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
        time: { unit: 'minute' },
        adapters: { date: { locale: sv } },
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

function LiveDataBox(type: keyof IncomingTelemetry, value: number, recent: boolean) {
  const { title, unit }: { title: string; unit: string } = {
    temp: { title: 'Live Temperature', unit: '°C' },
    humidity: { title: 'Live Humidity', unit: '%' },
    lpg: { title: 'Live LPG concentration', unit: 'ppm' },
    co: { title: 'Live Carbon Monoxide concentration', unit: 'ppm' },
    smoke: { title: 'Live Smoke concentration', unit: 'ppm' },
  }[type]

  return (
    <Grid className={styles.nopad}>
      <Grid.Row centered>
        <Header>
          {title} <Icon name="circle" color={recent ? 'green' : 'red'} />
        </Header>
      </Grid.Row>
      <Grid.Row centered>
        <Statistic horizontal>
          <Statistic.Value>{value}</Statistic.Value>
          <Statistic.Label>{unit}</Statistic.Label>
        </Statistic>
      </Grid.Row>
    </Grid>
  )
}

export default function DeviceBox({
  sensor: s,
  deleteDevice,
  deleteDeviceLoading,
  deleteDeviceErrorText,
  deleteDeviceSuccess,
  deleteDeviceClearPromise,
}: {
  sensor: SensorType
  deleteDevice(i: number): void
  deleteDeviceLoading: boolean
  deleteDeviceErrorText: string
  deleteDeviceSuccess: boolean
  deleteDeviceClearPromise(): void
}) {
  // MOCK DATA
  const times = Array(50)
    .fill(0)
    .map((_, i) => new Date(Date.now() - i * 10000).toISOString())
    .reverse()
  const [temps, setTemps] = useState(
    Array(50)
      .fill(0)
      .map(() => randTemp()),
  )
  const [humitdities, setHumidities] = useState(
    Array(50)
      .fill(0)
      .map(() => randHumidity()),
  )

  const [confirmDeviceDeleteOpen, setConfirmDeviceDeleteOpen] = useState(false)

  return (
    <Grid columns="equal" padded className={styles.grid} key={s.id}>
      <Grid.Row className={styles.nopad} color="black">
        <Grid.Column>
          <Segment.Group horizontal>
            <Segment padded color="black" inverted>
              <Header>
                <Icon name="rss" />
                {s.device_azure_name}
              </Header>
              <Label>
                <Icon name="point" />
                Location: {s.location}
              </Label>
            </Segment>
            <Segment color="black" inverted>
              <Button
                onClick={() => {
                  setTemps([...temps.slice(1), randTemp()])
                  setHumidities([...humitdities.slice(1), randHumidity()])
                }}>
                <Icon name="refresh" />
                New mock data
              </Button>
            </Segment>
            <Segment color="black" inverted>
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
              <Button icon="trash" onClick={() => setConfirmDeviceDeleteOpen(true)} />
              <Confirm
                open={confirmDeviceDeleteOpen}
                header="Delete Device"
                content={
                  <Segment>
                    Are you sure you want to delete <b>{s.device_azure_name}</b>?
                    <Message error color="red" hidden={!deleteDeviceErrorText}>
                      Error: {deleteDeviceErrorText}
                    </Message>
                    <Message success color="green" hidden={!deleteDeviceSuccess}>
                      Deleted <b>{s.device_azure_name}</b>.
                    </Message>
                  </Segment>
                }
                cancelButton={
                  deleteDeviceErrorText || deleteDeviceSuccess ? <Button>Close</Button> : undefined
                }
                onCancel={() => {
                  setConfirmDeviceDeleteOpen(false)
                  deleteDeviceClearPromise()
                }}
                confirmButton={
                  deleteDeviceErrorText || deleteDeviceSuccess ? (
                    false
                  ) : (
                    <Button loading={deleteDeviceLoading}>OK</Button>
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
          {LiveDataBox('temp', temps[temps.length - 1], true)}
        </Grid.Column>
        <Grid.Column className={styles.box}>
          {LiveDataBox('humidity', humitdities[humitdities.length - 1], true)}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={styles.nopad}>
        <Grid.Column className={styles.graphbox}>
          {TempHumidityGraph(times, temps, humitdities)}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
