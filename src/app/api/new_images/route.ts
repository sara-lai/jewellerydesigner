// https://github.com/replicate/replicate-javascript?tab=readme-ov-file#verifying-webhooks
// this is mostly copied from other new_model_first_samples webhook ... todo - maybe combine
import { NextResponse } from 'next/server';
import { validateWebhook } from 'replicate';
import * as modelService from '@/services/modelService'
import * as aiPhotoService from '@/services/aiPhotoService'

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
    console.log('body of webhook for sample generation', body);
    if (body.status === 'failed'){
        console.log('problem from replicate!!!', body.error)
    }

    // everything above is same for other webhooks.... whats good way to

    if (body.status ==='succeeded'){

        
        let newUrls: string[];
        // note: this logic here because seems can give 1 url as strubg, or give array of multi urls (depends on how initiated)
        if (Array.isArray(body.output)){
            newUrls = body.output
        } else {
            console.log('unexpected, output is what kind of thing?', body.output)
            newUrls = [body.output]
        }

        for (let newUrl of newUrls) {
            const aiphoto = await aiPhotoService.createAIPhoto(model.id, model.user_id, newUrl)
            console.log('create photo', aiphoto)
        }

        // more integration points.... possibly 
        // e.g. credits.... 
    } else {
        console.log('model img sample generation unexpected status.... better do something')
    }
    

    return NextResponse.json({ detail: "all good" }, { status: 200 });
}