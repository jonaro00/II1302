import type { NextApiRequest, NextApiResponse } from 'next'

type AzureValidationResponse = {
    validationResponse: string,
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<AzureValidationResponse|undefined>
) {
    if (req.method !== 'POST') {
        // Method not allowed
        res.status(405)
        return
    }
    // Azure validation https://docs.microsoft.com/en-us/azure/event-grid/webhook-event-delivery#validation-details
    if (req.headers['aeg-event-type'] === 'SubscriptionValidation') {
        console.log(JSON.parse(req.body))
        let validationCode: string = JSON.parse(req.body)[0].data.validationCode
        res.status(200).json({validationResponse: validationCode})
        return
    }
    // Telemetry
    //...
}
