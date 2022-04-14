import { EventGridDeserializer, EventGridEvent, SubscriptionValidationEventData } from '@azure/eventgrid'
import { AzureLogger, setLogLevel } from '@azure/logger'
import type { NextApiRequest, NextApiResponse } from 'next'

type AzureValidationResponse = {
    validationResponse: string
}

setLogLevel('verbose')

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AzureValidationResponse|string>
) {
    AzureLogger.log(req.body)
    if (req.method !== 'POST') {
        // Method not allowed
        res.status(405).end()
        return
    }

    let egd = new EventGridDeserializer()
    let events = await egd.deserializeEventGridEvents(req.body)
    let event = events[0] as EventGridEvent<SubscriptionValidationEventData>
    if (event.eventType === 'Microsoft.EventGrid.SubscriptionValidationEvent') {
        res.status(200).json({validationResponse: event.data.validationCode})
        return
    }

    // Base case
    res.status(400).end()
}
