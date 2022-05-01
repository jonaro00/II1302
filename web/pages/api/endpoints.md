# Spafe Monitor API

## Authentication

### `/api/signin` - POST - Sign in with credentials

Request body: `UserCredentials` object.

Response: `UserType` object.

### `/api/signout` - GET - Sign out the current user

## Sensors

### `/api/sensors` - GET - Get list of the current users sensors

<!-- Add parameters for sorting, limit, and offset ?? -->

Response type: `Array<SensorType>`

### `/api/sensors/add` - POST - Add a sensor

Request body: `SensorUserData`

### `/api/sensors/update/[sensor_id]` - POST - Update a sensor

Request body: `SensorUserData`

### `/api/sensors/delete/[sensor_id]` - GET - Delete a sensor

## Sensor data

### `/api/sensors/data/[sensor_id]` - GET - Get data from a sensor

Parameters:

- `start`: Timestamp when data interval starts. Default: 4h ago.
- `end`: Timestamp when data interval ends. Default: now.
- `interval`: Minimum number of seconds between each data point. Default: 1.
- `max_count`: Max number of data points. Default: none.

Response type: `Array<TelemetryType>`
