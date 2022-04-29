/**
 * Useful stuff:
 * https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-event-grid
 * https://docs.microsoft.com/en-us/javascript/api/@azure/eventgrid/?view=azure-node-latest
 */

import { EventGridDeserializer, isSystemEvent } from '@azure/eventgrid'
import { AzureLogger } from '@azure/logger'
import type { NextApiRequest, NextApiResponse } from 'next'

type AzureValidationResponse = {
  validationResponse: string
}

const egd = new EventGridDeserializer()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AzureValidationResponse | undefined>,
) {
  if (req.method !== 'POST') {
    // Method not allowed
    res.status(405).end()
    return
  }

  let events = await egd.deserializeEventGridEvents(req.body)
  events.forEach((event: any): void => {
    AzureLogger.log(`Received Event grid event:\n${JSON.stringify(event)}`)
    if (isSystemEvent('Microsoft.EventGrid.SubscriptionValidationEvent', event)) {
      // Azure Webhook validation https://docs.microsoft.com/en-us/azure/event-grid/webhook-event-delivery#validation-details
      res.status(200).json({ validationResponse: event.data.validationCode })
      return
    }
    if (isSystemEvent('Microsoft.Devices.DeviceCreated', event)) {
      // event.timestamp, event.data.deviceId
    } else if (isSystemEvent('Microsoft.Devices.DeviceDeleted', event)) {
      // event.timestamp, event.data.deviceId
    } else if (isSystemEvent('Microsoft.Devices.DeviceConnected', event)) {
      // event.timestamp, event.data.deviceId
    } else if (isSystemEvent('Microsoft.Devices.DeviceDisconnected', event)) {
      // event.timestamp, event.data.deviceId
    } else if (isSystemEvent('Microsoft.Devices.DeviceTelemetry', event)) {
      // event.timestamp, event.data.deviceId, event.data.body
    } else {
      AzureLogger.log('Event went unhandled...')
    }
  })

  res.status(200).end()
}
