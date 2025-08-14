// https://replicate.com/docs/reference/http
// https://github.com/replicate/replicate-javascript
import Replicate from "replicate"


const trainFirstModel = async () => {
    // brainstorm
    // need to prepare user images..... 
    // ^ invovles zip file & storing externally (put zip file on cloudinary?)
    // need to update the MlModel with a replicate link, for when done / or to track progress? 
    // need a webhook to get some alert when training is done.... ? 
    // ^ put webhook url in options 
    // this may be different if user making additional models vs first
    
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    }) 
    // from github doc: const response = await replicate.trainings.create(model_owner, model_name, version_id, options);
    const response = await replicate.trainings.create(
        'ostris', 'flux-dev-lora-trainer', '26dce37a',  // 8 other models to try
        {
            "destination": "my-organization/my-model",
            "input": {
                "input_images": "https://example.com/my-input-images.zip",
                "trigger_word": "SOMETHING123",
                "lora_type": "subject", // vs style, vs...
                "training_steps": 1000
            },
            "webhook": "https://example.com/my-webhook",
            "webhook_events_filter": ["completed"]
        }
    )

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

}

export {
    trainFirstModel
}
