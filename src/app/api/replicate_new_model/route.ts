// https://github.com/replicate/replicate-javascript?tab=readme-ov-file#verifying-webhooks
import { NextResponse } from 'next/server';
import { validateWebhook } from 'replicate';
import * as modelService from '@/services/modelService'

import { newModelSamples } from '@/lib/replicate';

// note
// docs give warning about multiple webhook requests possible

export async function POST(request: Request) {
    // retreive the right model 
    const url = new URL(request.url) // the next way, nice
    const modelId = url.searchParams.get('modelId')
    console.log('replicate webhook - we have retreived the modelId', modelId)
    if (!modelId) {
        return NextResponse.json({ detail: "Missing modelId" }, { status: 400 });
    }   
    const model = await modelService.getModelById(Number(modelId)) 

    // verify webhook
    const secret = process.env.REPLICATE_WEBHOOK_SIGNING_SECRET!
    const webhookIsValid = await validateWebhook(request.clone(), secret);
    if (!webhookIsValid) {
        return NextResponse.json({ detail: "Webhook is invalid" }, { status: 401 });
    }
    console.log('webhook is verified!')

    // get info from response
    const body = await request.json();
    console.log('body of webhook', body);
    if (body.status === 'failed'){
        console.log('problem from replicate!!!', body.error)
    }
    if (body.status ==='succeeded'){
        const updatedModel = await modelService.updateModel(model.id, {
            modelStatus: "COMPLETED",
            completedTraining: true,
            modelHostId: body.version
        })
        console.log('updated model after webhook!', updatedModel) 

        // run inference for user freebies
        newModelSamples(model.id)        
    } else {
        console.log('model training unexpected status.... better do something')
    }

    // send an email to user that model is ready (or update FE via pusher??)

    return NextResponse.json({ detail: "all good!" }, { status: 200 });
}