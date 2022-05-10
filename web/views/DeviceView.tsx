import { Grid, Header, Segment, Dropdown, Label, Statistic } from 'semantic-ui-react'
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
        display: true,
        text: 'Temperature and Humidity',
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

const DeviceView = ({ temp, gasses }: { temp: number; gasses: number }) => {
  const dataBox = (type: string) => {
    var title: string, annotation: string, num: number

    if (type == 'temp') {
      title = 'Live Temperature'
      annotation = '°C'
      num = temp
    } else if (type == 'gas') {
      title = 'Live "gasses" Level'
      annotation = 'ppm'
      num = gasses
    } else if (type == 'moist') {
      title = 'Live "moist" Level'
      annotation = 'some val'
      num = 0
    } else {
      title = 'Not found'
      annotation = ''
      num = 404
    }

    return (
      <Grid>
        <Grid.Row centered>
          <Header size="large">{title}</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Statistic horizontal>
            <Statistic.Value>{num}</Statistic.Value>
            <Statistic.Label>{annotation}</Statistic.Label>
          </Statistic>
        </Grid.Row>
      </Grid>
    )
  }

  return (
    <div className={styles.main}>
      <Grid columns={2} padded inverted className={styles.grid}>
        <Grid.Row color="black">
          <Segment color="black" inverted className={styles.header}>
            <Header as="h3" className={styles.title}>
              Device 1<Label>Location: {'something'}</Label>
            </Header>
            <Dropdown icon="setting" pointing="left">
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
          </Segment>
        </Grid.Row>
        <Grid.Row className={styles.row}>
          <Grid.Column className={styles.box}>{dataBox('temp')}</Grid.Column>
          <Grid.Column className={styles.box}>{dataBox('gas')}</Grid.Column>
        </Grid.Row>
        <Grid.Row className={styles.row}>
          <Grid.Column className={styles.box}>
            {TempHumidityGraph(
              Array(200)
                .fill(0)
                .map((_, i) => new Date(Date.now() - i * 10000).toISOString())
                .reverse(),
              Array(200)
                .fill(0)
                .map(() => faker.datatype.number({ min: 20, max: 22 })),
              Array(200)
                .fill(0)
                .map(() => faker.datatype.number({ min: 30, max: 60 })),
            )}
          </Grid.Column>
          <Grid.Column className={styles.box}>
            <></>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default DeviceView
