// GPT guidance for zipping 
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import archiver from 'archiver'
import fetch from 'node-fetch' // for streaming

// todo - problem, cloudinary zip 10MB upload limit!.... need to find another solution

export default async function zipAndUpload(modelId: number, imageUrls: string[]){
    
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })    

    // seems archiver approach is better than JSZip, avoid possibly very large memory writes and stream instead
    const zipPath = `/tmp/${modelId}-${Date.now()}.zip`
    const output = fs.createWriteStream(zipPath)
    const archive = archiver('zip', { zlib: { level: 9 } })

    archive.pipe(output)

    for (const [i, url] of imageUrls.entries()) {
        const response = await fetch(url);
        const ext = url.split('.').pop()?.split('?')[0] || 'jpg'
        archive.append(response.body, { name: `image${i}.${ext}` })        
    }

    await archive.finalize()

    // double safe has finished writing
    await new Promise((resolve, reject) => {
        output.on('close', resolve)
        output.on('error', reject)
    })

    console.log('done preparing the zip file!')

    // secure_urls dont work?
    // "Training failed. 401 Client Error: Unauthorized for url: https://res.cloudinary.com/dmv9qljos/raw/upload/v1755241886/training-zips/2-1755241882471.zip"
    const { secure_url } = await cloudinary.uploader.upload(zipPath, {
        resource_type: 'raw',
        public_id: `training-zips/${modelId}-${Date.now()}.zip`,
        upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    });
    fs.unlinkSync(zipPath)

    console.log('zip uploaded to cloudinary', secure_url)

    return secure_url
}