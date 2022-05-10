import { signIn, signOut } from 'next-auth/react'
import { Observable } from './Observable'
import { SensorType } from './Sensor'
import { TelemetryType } from './Telemetry'
import { EventType } from './Event'
import { AlarmType } from './Alarm'

/**
 * The FRONT-END model. Stores all data fetched from API and notifies observers of changes.
 */
export class Model extends Observable {
  /**
   * The name of the currently signed in user.
   */
  public username: string | null = null

  /**
   * Sensors.
   */
  public sensors: SensorType[] = []

  /**
   * Events. Is set by fetcher periodically.
   */
  public events: Record<number, EventType[]> = {}

  /**
   * Telemetry. Is set by fetcher periodically.
   */
  public telemetry: Record<number, TelemetryType[]> = {}
  // public telemetry: { [sensor_id: number]: TelemetryType[] } = {}

  /**
   * Alarms.
   */
  public alarms: Record<number, AlarmType[]> = {}

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
    this.username = null
    this.sensors = []
    this.events = {}
    this.telemetry = {}
    this.alarms = {}
    this.notifyObservers()
  }

  public setUsername(username: string | null) {
    if (this.username === username) return
    this.username = username
    this.notifyObservers()
  }

  public async _auth(
    register: boolean,
    username: string,
    password: string,
  ): Promise<{ error?: string; ok: number; url: string | null }> {
    return (await signIn('credentials', {
      callbackUrl: new URL(window.location.href).searchParams.get('callbackUrl') ?? '/',
      redirect: false,
      register,
      username,
      password,
    })) as any
  }

  public async signOut(): Promise<string> {
    const { url } = await signOut({ redirect: false, callbackUrl: '/' })
    this.clear()
    return url as string
  }

  public setSensors(sensors: SensorType[]) {
    this.sensors = sensors
    this.notifyObservers()
  }

  public setDeviceEvents(sensor_id: number, events: EventType[]) {
    this.events = { ...this.events, [sensor_id]: events }
    this.notifyObservers()
  }

  public setDeviceTelemetry(sensor_id: number, telemetry: TelemetryType[]) {
    this.telemetry = { ...this.telemetry, [sensor_id]: telemetry }
    this.notifyObservers()
  }

  public setDeviceAlarms(sensor_id: number, alarms: AlarmType[]) {
    this.alarms = { ...this.alarms, [sensor_id]: alarms }
    this.notifyObservers()
  }
}
