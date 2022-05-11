import {
  Grid,
  Header,
  Segment,
  Dropdown,
  Label,
  Statistic,
  Button,
  Icon,
  Container,
  Menu,
  Modal,
  Form,
  Message,
} from 'semantic-ui-react'
import styles from '../styles/device.module.css'
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

function randTemp() {
  return faker.datatype.float({ min: 20, max: 22, precision: 0.1 })
}
function randHumidity() {
  return faker.datatype.number({ min: 30, max: 60 })
}

function AddDeviceForm(
  loading: boolean,
  errorText: string,
  success: boolean,
  submitHandler: () => void,
  onName: (n: string) => void,
  onLocation: (l: string) => void,
) {
  return (
    <Form
      loading={loading}
      error={!!errorText}
      success={success}
      onSubmit={event => {
        event.preventDefault()
        submitHandler()
        ;(event.target as HTMLFormElement).reset()
      }}>
      <Form.Input
        fluid
        icon="rss"
        iconPosition="left"
        placeholder="Azure Device Name"
        onChange={event => onName(event.target.value)}
      />
      <Form.Input
        fluid
        icon="point"
        iconPosition="left"
        placeholder="Location"
        onChange={event => onLocation(event.target.value)}
      />
      <Button fluid size="large" color={loading ? 'grey' : 'teal'}>
        Add
      </Button>
      <Message error color="red">
        Error: {errorText}
      </Message>
      <Message success color="green">
        Device added ✅
      </Message>
    </Form>
  )
}

export default function DeviceView({
  sensors,
  deviceFormLoading,
  deviceFormErrorText,
  deviceFormSuccess,
  deviceFormSubmitHandler,
  onDeviceName,
  onDeviceLocation,
}: {
  sensors: SensorType[]
  deviceFormLoading: boolean
  deviceFormErrorText: string
  deviceFormSuccess: boolean
  deviceFormSubmitHandler(): void
  onDeviceName(n: string): void
  onDeviceLocation(l: string): void
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
  const mockSensor: SensorType = {
    id: 0,
    device_azure_name: 'Fake Sensor',
    user_id: 0,
    location: 'nowhere',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const [gridView, setGridView] = useState(true)
  const [addDeviceModalOpen, setAddDeviceModalOpen] = useState(false)

  return (
    <>
      <Menu secondary>
        <Container>
          <Segment.Group horizontal>
            <Segment>
              <Modal
                onClose={() => setAddDeviceModalOpen(false)}
                onOpen={() => setAddDeviceModalOpen(true)}
                open={addDeviceModalOpen}
                trigger={
                  <Button>
                    <Icon name="plus circle" />
                    Add Device
                  </Button>
                }>
                <Modal.Header>Add Device</Modal.Header>
                <Modal.Content>
                  {AddDeviceForm(
                    deviceFormLoading,
                    deviceFormErrorText,
                    deviceFormSuccess,
                    deviceFormSubmitHandler,
                    onDeviceName,
                    onDeviceLocation,
                  )}
                </Modal.Content>
              </Modal>
            </Segment>
            <Segment>
              <Button icon="grid layout" active={gridView} onClick={() => setGridView(true)} />
              <Button icon="list" active={!gridView} onClick={() => setGridView(false)} />
            </Segment>
          </Segment.Group>
        </Container>
      </Menu>
      {gridView ? (
        <Grid className={styles.main}>
          {[...sensors, mockSensor, mockSensor].map((s: SensorType) => {
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
          })}
        </Grid>
      ) : (
        <p>Not implemented</p>
      )}
    </>
  )
}
