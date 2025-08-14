// https://github.com/replicate/replicate-javascript?tab=readme-ov-file#verifying-webhooks
import { NextResponse } from 'next/server';
import { validateWebhook } from 'replicate';

// brainstorm 
// this webhook means the model has completed..... 
// it needs to update the MLModel obj
// it needs to generate some sample images for the user when they visit dashboard
// it needs to send an email to the user / alert the user somehow / maybe even Pusher ??
// docs give warning about multiple webhook requests possible

export async function POST(request: Request) {
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

    // need to make sure model ID is passed into webhook!

    // update the MLModel & then run inference for user freebies ??

    // process validated webhook here...
    console.log("Webhook is valid!");
    const body = await request.json();
    console.log(body);

    return NextResponse.json({ detail: "Webhook is valid" }, { status: 200 });
}