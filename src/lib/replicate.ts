// https://replicate.com/docs/reference/http
// https://github.com/replicate/replicate-javascript
// https://replicate.com/docs/topics/webhooks/testing-webhook-code -> ngrok testing
import Replicate from "replicate"
import * as modelService from '@/services/modelService'
import zipAndUpload from '@/utils/zipAndUpload'

const webhookBase = process.env.REPLICATE_WEBHOOK_BASE

const trainFirstModel = async (model) => {
    // probably different logic for new training vs additional trainings
    // does it matter if pass in model vs model.id??
    
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    })

    const zipUrl = await zipAndUpload(model.id, model.imageUrls)
    const destination = process.env.MODEL_DESTINATION
    const tword = process.env.TWORD_TEST
    const steps = 1200 // ideally from form?
    const lora_rank = 32
    const response = await replicate.trainings.create(
        process.env.MODEL_INFO1, process.env.MODEL_INFO2, process.env.MODEL_INFO3,
        {
            "destination": destination,
            "input": {
                "input_images": zipUrl,
                "trigger_word": tword,
                "lora_type": "subject",
                "training_steps": steps,
                "lora_rank": lora_rank,
                "autocaption_prefix": process.env.CPREFIX,
            },
            "webhook": `${webhookBase}/api/replicate_new_model?modelId=${model.id}`, // model id as custom param so can retreive
            "webhook_events_filter": ["completed"]
        }
    )
    console.log('response from replicate!!!', response)

    // need definite error checking here if problem on replicate .... check response.status?

    const updatedModel = await modelService.updateModel(model.id, {
        modelStatus: "TRAINING",
        trainId: response.id,
        destination: destination,
        tword: tword,
        baseModel: response.model,
    })
    console.log('updated model', updatedModel)   
    
    return updatedModel
}

const newModelSamples = async (modelId: number) => {
    console.log('running NewModelSamples!!')
    // brainstorm
    // this could take more than a few minutes..... prob need to send off request and do webhook
    // seems replicate returns imageUrls, download them or not?

    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    })

    const model = await modelService.getModelById(modelId)
    
    // kick off more replicate tasks, get alerted with webhooks
    // not sure all test models support num_outputs
    // multiple options? predictions.create ("background") vs. replicate.run (must wait for result)
    for (let i = 0; i < 8; i++) {
        await replicate.predictions.create({
            "version": model.modelHostId,
            "input": { 
                "prompt": process.env.PROMPT_TEST,
                "num_outputs": 2,
            },
            "webhook": `${webhookBase}/api/new_model_first_samples?modelId=${modelId}`,
            "webhook_events_filter": ["completed"]
        })
    }
    // // some models suppport num_outputs, but various maxes.... oh dear
    // await replicate.predictions.create({
    //     "num_outputs": 10,
    //     "version": model.modelHostId,
    //     "input": { prompt: `Jewelry in style ${model.tword}` },
    //     "webhook": `${webhookBase}/api/new_model_first_samples?modelId=${modelId}`,
    //     "webhook_events_filter": ["completed"]
    // })
}

const takePhotoWithModel = async (modelId: number, numPhotos: number, prompt: string) => {
    console.log('calling takePhotoWithModel')

    // braintstorm
    // possibly enchance prompt?

    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    })

    const model = await modelService.getModelById(modelId)

    for (let i = 0; i < numPhotos; i++) {
        await replicate.predictions.create({
            "version": model.modelHostId,
            "input": { 
                "prompt": prompt,//process.env.CPREFIX + ', ' + prompt,
                "num_outputs": 1,
            },
            "webhook": `${webhookBase}/api/new_images?modelId=${modelId}`,
            "webhook_events_filter": ["completed"]
        })
    }    
}

export {
    trainFirstModel,
    newModelSamples,
    takePhotoWithModel
}
