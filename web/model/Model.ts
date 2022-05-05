import { APIErrorResponse } from './APIErrorResponse'
import { Observable } from './Observable'
import { SensorType } from './Sensor'
import { TelemetryType } from './Telemetry'
import { UserCredentials, UserType } from './User'

type EventType = undefined // import { EventType } from './Event'
type AlarmType = undefined // import { AlarmType } from './Alarm'

/**
 * The FRONT-END model. Stores all data fetched from API and notifies observers of changes.
 */
export class Model extends Observable {
  /**
   * The currently signed in user.
   */
  public user: UserType | null = null

  /**
   * Sensors.
   */
  public sensors: Array<SensorType> = []

  /**
   * Events. Is set by fetcher periodically.
   */
  public events: Record<number, Array<EventType>> = {}

  /**
   * Telemetry. Is set by fetcher periodically.
   */
  public telemetry: Record<number, Array<TelemetryType>> = {}
  // public telemetry: { [sensor_id: number]: Array<TelemetryType> } = {}

  /**
   * Alarms.
   */
  public alarms: Record<number, Array<AlarmType>> = {}

  /**
   * Creates a new, empty model instance.
   */
  public constructor() {
    super()
  }

  /**
   * Remove all user data.
   */
  public clear() {
    this.user = null
    this.sensors = []
    this.events = {}
    this.telemetry = {}
    this.alarms = {}
    this.notifyObservers()
  }

  public setUser(user: UserType | null) {
    this.user = user
    this.notifyObservers()
  }

  public async register({ username, password }: UserCredentials): Promise<boolean> {
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    const j = await res.json()
    if (!res.ok) {
      throw new Error((j as APIErrorResponse).error)
    }
    this.setUser(j as UserType)
    return true
  }

  public async signIn({ username, password }: UserCredentials): Promise<boolean> {
    const res = await fetch('/api/signin', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    const j = await res.json()
    if (!res.ok) {
      throw new Error((j as APIErrorResponse).error)
    }
    this.setUser(j as UserType)
    return true
  }

  public async signOut(): Promise<boolean> {
    const res = await fetch('/api/signout')
    if (!res.ok) {
      throw new Error('Unknown error while signing out.')
    }
    this.clear()
    return true
  }

  public setSensors(sensors: Array<SensorType>) {
    this.sensors = sensors
    this.notifyObservers()
  }

  // public addSensor(sensor: SensorType) {}

  public setDeviceEvents(sensor_id: number, events: Array<EventType>) {
    this.events = { ...this.events, [sensor_id]: events }
    this.notifyObservers()
  }

  public setDeviceTelemetry(sensor_id: number, telemetry: Array<TelemetryType>) {
    this.telemetry = { ...this.telemetry, [sensor_id]: telemetry }
    this.notifyObservers()
  }

  public setDeviceAlarms(sensor_id: number, alarms: Array<AlarmType>) {
    this.alarms = { ...this.alarms, [sensor_id]: alarms }
    this.notifyObservers()
  }
}
