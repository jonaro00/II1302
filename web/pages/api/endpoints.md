# Spafe Monitor API

## Authentication

Handled by NextAuth.js with endpoints rooted in `/api/auth/`.

All endpoints below requires a valid session cookie obtained from sign in.

## Sensors

### `/api/sensors` - GET - Get list of the current users sensors

Response type: `SensorType[]`

### `/api/sensors/add` - POST - Add a sensor

Request body: `SensorUserData`

### `/api/sensors/update/[sensor_id]` - POST - Update a sensor

Request body: `SensorUserData`

### `/api/sensors/delete/[sensor_id]` - GET - Delete a sensor

## Sensor data

### `/api/sensors/telemetry/[sensor_id]` - GET - Get telemetry from a sensor

Parameters:

- `start`: Timestamp when data interval starts. Default: 1h ago.
- `end`: Timestamp when data interval ends. Default: now.
- `interval`: Minimum number of seconds between each data point. Default: 1.
- `max_count`: Max number of data points. Default: none.

Response type: `TelemetryType[]`

### `/api/sensors/events/[sensor_id]` - GET - Get events from a sensor

Parameters:

- `start`: Timestamp when event interval starts. Default: 1h ago.
- `end`: Timestamp when event interval ends. Default: now.
- `max_count`: Max number of events. Default: none.

Response type: `EventType[]`

### `/api/sensors/alarms/[sensor_id]` - GET - Get alarms for a sensor

Response type: `AlarmType[]`

### `/api/sensors/alarms/add` - POST - Add an alarm to a sensor

Request body: `AlarmUserData`

### `/api/sensors/alarms/update/[alarm_id]` - POST - Update an alarm for a sensor

Request body: `AlarmUserData`

### `/api/sensors/alarms/delete/[alarm_id]` - GET - Delete an alarm for a sensor
