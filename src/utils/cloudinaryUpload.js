// note: this module was made with GPT guidance 
// this was also copied over from project 3

/*
example usage (for single image only):

import { uploadWidget } from '...' 

const handleImageUpload = () => { // a click handler, eg. onClick={handleImageUpload}
    uploadWidget((secureUrl) => {
        console.log(secureUrl) // returns secureUrl when upload is good; then do whatever you need with it (display the image, add to form data, send to BE, etc)
    })
}

for multi image, the result is an array, so use something like secureUrlsList instead of secureUrl

*/
export const uploadWidget = (onSuccess, multiple=false) => {
    const urls = []
    const widget = window.cloudinary.createUploadWidget(
        {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
            sources: ['local', 'dropbox', 'google_drive'],
            multiple: multiple,
            resourceType: 'image',
            clientAllowedFormats: ['jpg', 'png', 'jpeg'],
            maxFiles: 40,
            showPoweredBy: false,
            text: {
                "en": {
                    "local":{
                        "dd_title_multi": "Drag and Drop your images here"
                    }
                }
            },
            styles: {
                palette: {
                    link: "#232f46",
                    tabIcon: "#232f46",
                    sourceBg: "#ffffff"
                },
                fonts: {
                },
                frame: {
                    background: 'rgba(0, 0, 0, 0.3)',
                    opacity: .1
                }                
            }
        },
        (error, result) => {
            if (error) {
                 console.error("Upload failed:", error);
                return;
            }
            if (result.event === "success") {
                if (!multiple) {
                    onSuccess(result.info.secure_url) // Single upload: return URL directly
                    return
                }
                urls.push(result.info.secure_url) // Multiple uploads: collect URLs
            }
            if (result.event === "close" && multiple && urls.length > 0) {
                onSuccess(urls) // Multiple uploads: return array on close
            }
        }
    )
    widget.open()
}

