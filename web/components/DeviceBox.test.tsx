import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DeviceBox from './DeviceBox'
import { SensorType, SensorUserData } from '../model/Sensor'
import { TelemetrySeries } from '../model/Telemetry'
import { ViewMode } from '../views/DeviceView'

const sensor: SensorType = {
  id: 1,
  device_azure_name: "string",
  user_id: 30,
  location: "string",
  createdAt: new Date(),
  updatedAt: new Date(),
}

const telemetry: TelemetrySeries = {
  times: ["10"],
  temps: [30],
  humidities: [60],
  lpgs: [40],
  cos: [40],
  smokes: [40],
  recent: true,
}

function Component({}) {
  return (
    <>
      <DeviceBox 
        sensor={sensor} 
        telemetry={telemetry} 
        viewMode={ViewMode.Focus} 
        setFocusedSensor={() => {}} 
        deleteDevice={(i: number) => {}}
        updateDevice={(i: number, d: SensorUserData) => {}}
        devicePromiseLoading={true}
        devicePromiseErrorText={"Error was thrown"}
        devicePromiseSuccess={true}
        devicePromiseClear={() => {}}
        />
    </>
  )
}

describe('A component using DeviceBox', () => {

  it('should render constants correctly', async () => {
    render(<Component />)
    await expect(screen.findByText(/Location:/)).resolves.toBeInTheDocument()
    expect(screen.getByTestId(/location/)).toBeInTheDocument()
    expect(screen.getByTestId(/switch/)).toBeInTheDocument()
    expect(screen.getByTestId(/focus/)).toBeInTheDocument()
  })

  
  it('should render the temp & humidity values correctly', async () => {
    render(<Component />)
    await expect(screen.findByText(/Live Temperature/)).resolves.toBeInTheDocument()
    await expect(screen.findByText(/Live Humidity/)).resolves.toBeInTheDocument()
  })


  it('should be able to render focus mode', async () => {
    render(<Component />)
    fireEvent.click(screen.getByTestId(/focus/))
    await expect(screen.findByText(/Live Temperature/)).resolves.toBeInTheDocument()
    await expect(screen.findByText(/Live Humidity/)).resolves.toBeInTheDocument()
    await expect(screen.findByText(/Live LPG concentration/)).resolves.toBeInTheDocument()
    await expect(screen.findByText(/Live Carbon Monoxide concentration/)).resolves.toBeInTheDocument()
    await expect(screen.findByText(/Live Smoke concentration/)).resolves.toBeInTheDocument()
  })
  
  /*
  it('should be able to render switch graphs correctly', async () => {
    render(<Component />)
    fireEvent.click(await screen.findByTestId(/switch/))
    await expect(screen.findByText(/Live LPG concentration/)).resolves.toBeInTheDocument()
    await expect(screen.findByText(/Live Carbon Monoxide concentration/)).resolves.toBeInTheDocument()
    await expect(screen.findByText(/Live Smoke concentration/)).resolves.toBeInTheDocument()
  })
  

  it('should popup location', async () => {
    render(<Component />)
    fireEvent.click(screen.getByTestId(/location/))
    await expect(screen.findByText(/Edit Device Location/)).resolves.toBeInTheDocument()
  })
  */
})
