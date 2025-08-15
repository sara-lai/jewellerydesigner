// https://replicate.com/docs/reference/http
// https://github.com/replicate/replicate-javascript
// https://replicate.com/docs/topics/webhooks/testing-webhook-code -> ngrok testing
import Replicate from "replicate"
import * as modelService from '@/services/modelService'
import zipAndUpload from '@/utils/zipAndUpload'

const trainFirstModel = async (model) => {
    // probably different logic for new training vs additional trainings
    // does it matter if pass in model vs model.id??
    
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    })

    const zipUrl = await zipAndUpload(model.id, model.imageUrls)

    const destination = "sara-lai/test.02"
    const tword = "GUSJWLRY"
    const response = await replicate.trainings.create(
        'ostris', 'flux-dev-lora-trainer', '26dce37af90b9d997eeb970d92e47de3064d46c300504ae376c75bef6a9022d2',  // 8 other models to try
        {
            "destination": destination,
            "input": {
                "input_images": zipUrl,
                "trigger_word": tword,
                "lora_type": "subject", // vs style, vs...
                "training_steps": 1000
            },
            "webhook": `https://0522b8d7524f.ngrok-free.app/api/replicate_new_model?modelId=${model.id}`, // put ngrok here.... put model id as custom param so can retreive
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

export {
    trainFirstModel
}
