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

        // brainstorm
        // there should be a single imgUrl coming from replicate
        // need to collect them into model.sampleUrls

        // response.output expect an aray of multi images potentially?


        // maybe: get existing sampleUrls.... the combine with new ones from webhook.... then call updateModel
        const existingUrls = model.sampleUrls
        let newUrls;
        if (Array.isArray(body.output)){
            newUrls = body.output
        } else {
            console.log('unexpected, output is what kind of thing?', body.output)
            newUrls = [body.output]
        }
        const combinedUrls = existingUrls.concat(newUrls)      

        const updatedModel = await modelService.updateModel(model.id, {
            sampleUrls: combinedUrls
        })
        console.log('updated model after webhook!', updatedModel) 
    } else {
        console.log('model img sample generation unexpected status.... better do something')
    }
    

    return NextResponse.json({ detail: "all good" }, { status: 200 });
}