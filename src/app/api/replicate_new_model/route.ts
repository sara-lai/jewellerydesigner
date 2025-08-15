// https://github.com/replicate/replicate-javascript?tab=readme-ov-file#verifying-webhooks
import { NextResponse } from 'next/server';
import { validateWebhook } from 'replicate';
import * as modelService from '@/services/modelService'

// note
// docs give warning about multiple webhook requests possible

export async function POST(request: Request) {
    // retreive the right model 
    const url = new URL(request.url) // the next way, nice
    const modelId = url.searchParams.get('modelId')
    console.log('we have retreived the modelId', modelId)
    if (!modelId) {
        return NextResponse.json({ detail: "Missing modelId" }, { status: 400 });
    }   
    const model = await modelService.getModelById(modelId) 

    // verify webhook
    const secret = process.env.REPLICATE_WEBHOOK_SIGNING_SECRET!
    const webhookIsValid = await validateWebhook(request.clone(), secret);
    if (!webhookIsValid) {
        return NextResponse.json({ detail: "Webhook is invalid" }, { status: 401 });
    }

    // example response
    // {
    // "id": "ufwxyz12345abcde",
    // "version": "26dce37a...",
    // "status": "succeeded",
    // "created_at": "2025-08-14T12:34:56.789Z",
    // "completed_at": "2025-08-14T12:55:12.123Z",
    // "destination": "my-organization/my-model",
    // "output": "abcdef12-3456-7890-abcd-ef1234567890",
    // OR --> "output": {"version": "...."}
    // "error": null,
    // "logs": "Training logs here...\n",
    // ....

    const body = await request.json();
    console.log(body);

    // update the MLModel & then run inference for user freebies ?? (probably another module)

    // send an email to user that model is ready (or update FE via pusher??)

    return NextResponse.json({ detail: "Webhook is valid" }, { status: 200 });
}