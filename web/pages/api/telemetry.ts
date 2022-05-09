/**
 * Useful stuff:
 * https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-event-grid
 * https://docs.microsoft.com/en-us/javascript/api/@azure/eventgrid/?view=azure-node-latest
 */

import { EventGridDeserializer, isSystemEvent } from '@azure/eventgrid'
import { AzureLogger } from '@azure/logger'
import type { NextApiRequest, NextApiResponse } from 'next'
import { DAO } from '../../integration/DAO'
import { APIErrorResponse } from '../../model/APIErrorResponse'
import { IncomingTelemetry } from '../../model/Telemetry'

type AzureValidationResponse = {
  validationResponse: string
}

const egd = new EventGridDeserializer()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AzureValidationResponse | APIErrorResponse>,
) {
  if (req.method !== 'POST') {
    // Method not allowed
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  const dao = await DAO.getInstance()

  // TODO: Verify that the message is coming from Azure???
  let events = await egd.deserializeEventGridEvents(req.body)
  events.forEach((event: any): void => {
    AzureLogger.log(`Received Event grid event:\n${JSON.stringify(event)}`)
    if (isSystemEvent('Microsoft.EventGrid.SubscriptionValidationEvent', event)) {
      // Azure Webhook validation https://docs.microsoft.com/en-us/azure/event-grid/webhook-event-delivery#validation-details
      res.status(200).json({ validationResponse: event.data.validationCode })
      return
    }
    try {
      if (isSystemEvent('Microsoft.Devices.DeviceCreated', event)) {
        //
      } else if (isSystemEvent('Microsoft.Devices.DeviceDeleted', event)) {
        //
      } else if (isSystemEvent('Microsoft.Devices.DeviceConnected', event)) {
        AzureLogger.log('Device connected:', event.data.deviceId, 'at', event.eventTime as Date)
      } else if (isSystemEvent('Microsoft.Devices.DeviceDisconnected', event)) {
        AzureLogger.log('Device disconnected:', event.data.deviceId, 'at', event.eventTime as Date)
      } else if (isSystemEvent('Microsoft.Devices.DeviceTelemetry', event)) {
        AzureLogger.log(
          'Received telemetry from',
          event.subject,
          (event.data as any)?.deviceId,
          event.data.systemProperties['iothub-connection-device-id'],
          ':',
          event.data.body as IncomingTelemetry,
          'at',
          event.eventTime as Date,
        )
      } else {
        AzureLogger.log('Event went unhandled...')
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal error' })
    }
  })

  res.status(200).end()
}
