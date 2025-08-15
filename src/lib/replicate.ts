// https://replicate.com/docs/reference/http
// https://github.com/replicate/replicate-javascript
// https://replicate.com/docs/topics/webhooks/testing-webhook-code -> ngrok testing
import Replicate from "replicate"
import * as modelService from '@/services/modelService'
import zipAndUpload from '@/utils/zipAndUpload'

const trainFirstModel = async (model) => {
    // brainstorm
    // need to prepare user images..... 
    // ^ invovles zip file & storing externally (put zip file on cloudinary?)
    // need to update the MlModel with a replicate link, for when done / or to track progress? 
    // need a webhook to get some alert when training is done.... ? pass the model to webhook so we know which model
    // ^ put webhook url in options 
    // this may be different if user making additional models vs first
    
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    }) 

    const zipUrl = await zipAndUpload(model.id, model.imageUrls)

    const response = await replicate.trainings.create(
        'ostris', 'flux-dev-lora-trainer', '26dce37a',  // 8 other models to try
        {
            "destination": "sara-lai/test.02",
            "input": {
                "input_images": zipUrl,
                "trigger_word": "GUSJWLRY",
                "lora_type": "subject", // vs style, vs...
                "training_steps": 1000
            },
            "webhook": `https://ngrok--todo---todok/api/replicate_new_model?modelId=${model.id}`, // put ngrok here.... put model id as custom param so can retreive
            "webhook_events_filter": ["completed"]
        }
    )
    console.log(response)

    //example response of training object
    // {
    //     "id": "zz4ibbonubfz7carwiefibzgga",
    //     "model": "stability-ai/sdxl",
    //     "version": "da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
    //     "input": {
    //         "input_images": "https://example.com/my-input-images.zip"
    //     },
    //     "logs": "",
    //     "error": null,
    //     "status": "starting",
    //     "created_at": "2023-09-08T16:32:56.990893084Z",
    //     "urls": {
    //         "web": "https://replicate.com/p/zz4ibbonubfz7carwiefibzgga",
    //         "get": "https://api.replicate.com/v1/predictions/zz4ibbonubfz7carwiefibzgga",
    //         "cancel": "https://api.replicate.com/v1/predictions/zz4ibbonubfz7carwiefibzgga/cancel"
    //     }
    // }

    // need definite error checking here if problem on replicate .... check response.status?

    const updatedModel = modelService.updateModel(model.id, {
        modelStatus: "TRAINING",
        trainId: 'todo',
        destination: 'todo',
        tword: 'todo',
        baseModel: 'todo',
    })   
    
    return updatedModel

}

export {
    trainFirstModel
}
