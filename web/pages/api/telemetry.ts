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
  const events = await egd.deserializeEventGridEvents(req.body)
  AzureLogger.log('Received', events.length, 'events...')
  await Promise.all(
    events.map(async (event: any) => {
      AzureLogger.log('Received Event grid event:', JSON.stringify(event))
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
          const device_azure_name = event.data.deviceId
          AzureLogger.log('Device connected:', device_azure_name, 'at', event.eventTime as Date)
          await dao.addEvent(device_azure_name, 'DeviceConnected', event.eventTime as Date)
        } else if (isSystemEvent('Microsoft.Devices.DeviceDisconnected', event)) {
          const device_azure_name = event.data.deviceId
          AzureLogger.log('Device disconnected:', device_azure_name, 'at', event.eventTime as Date)
          await dao.addEvent(device_azure_name, 'DeviceDisconnected', event.eventTime as Date)
        } else if (isSystemEvent('Microsoft.Devices.DeviceTelemetry', event)) {
          const device_azure_name = event.data.systemProperties['iothub-connection-device-id']
          const telemetry: IncomingTelemetry = JSON.parse(
            ((event.data.body as any).data as string).replace(/ #\d+$/, ''),
          )
          AzureLogger.log(
            'Received telemetry from',
            device_azure_name,
            ':',
            telemetry,
            'at',
            event.eventTime as Date,
          )
          await dao.addTelemetry(device_azure_name, telemetry, event.eventTime as Date)
        } else {
          AzureLogger.log('Event went unhandled:', JSON.stringify(event))
        }
      } catch (error) {
        AzureLogger.log('Event caused error:', error)
      }
    }),
  )

  res.status(200).end()
}
