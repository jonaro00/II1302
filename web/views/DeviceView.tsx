import {
  Grid,
  Segment,
  Button,
  Icon,
  Container,
  Menu,
  Modal,
  Form,
  Message,
} from 'semantic-ui-react'
import styles from '../styles/device.module.css'
import { useState } from 'react'
import { SensorTelemetries, SensorType, SensorUserData } from '../model/Sensor'
import DeviceBox from '../components/DeviceBox'

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
      <Form.Field required>
        <label>Azure Device Name</label>
        <Form.Input
          fluid
          required
          icon="rss"
          iconPosition="left"
          placeholder="sensorN"
          onChange={event => onName(event.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Location</label>
        <Form.Input
          fluid
          icon="point"
          iconPosition="left"
          placeholder="Living room"
          onChange={event => onLocation(event.target.value)}
        />
      </Form.Field>
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
  telemetry,
  addDevice,
  addDeviceLoading,
  addDeviceErrorText,
  addDeviceSuccess,
  addDeviceClearPromise,
  deleteDevice,
  updateDevice,
  devicePromiseLoading,
  devicePromiseErrorText,
  devicePromiseSuccess,
  devicePromiseClear,
}: {
  sensors: SensorType[]
  telemetry: SensorTelemetries
  addDevice(n: string, l: string): void
  addDeviceLoading: boolean
  addDeviceErrorText: string
  addDeviceSuccess: boolean
  addDeviceClearPromise(): void
  deleteDevice(i: number): void
  updateDevice(i: number, d: SensorUserData): void
  devicePromiseLoading: boolean
  devicePromiseErrorText: string
  devicePromiseSuccess: boolean
  devicePromiseClear(): void
}) {
  const mockSensor: SensorType & { fake?: boolean } = {
    id: 0,
    device_azure_name: 'Fake Sensor',
    user_id: 0,
    location: 'nowhere',
    createdAt: new Date(),
    updatedAt: new Date(),
    fake: true,
  }

  const [gridView, setGridView] = useState(true)
  const [addDeviceModalOpen, setAddDeviceModalOpen] = useState(false)
  const [addDeviceName, setAddDeviceName] = useState('')
  const [addDeviceLocation, setAddDeviceLocation] = useState('')

  return (
    <>
      <Menu secondary>
        <Container>
          <Segment.Group horizontal>
            <Segment>
              <Modal
                onClose={() => {
                  setAddDeviceModalOpen(false)
                  addDeviceClearPromise()
                }}
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
                    addDeviceLoading,
                    addDeviceErrorText,
                    addDeviceSuccess,
                    () => addDevice(addDeviceName, addDeviceLocation),
                    setAddDeviceName,
                    setAddDeviceLocation,
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
          {[...sensors, mockSensor].map((s: SensorType) => {
            return (
              <DeviceBox
                key={s.id}
                sensor={s}
                telemetry={telemetry[s.id]}
                deleteDevice={deleteDevice}
                updateDevice={updateDevice}
                devicePromiseLoading={devicePromiseLoading}
                devicePromiseErrorText={devicePromiseErrorText}
                devicePromiseSuccess={devicePromiseSuccess}
                devicePromiseClear={devicePromiseClear}
              />
            )
          })}
        </Grid>
      ) : (
        <p>Not implemented</p>
      )}
    </>
  )
}
