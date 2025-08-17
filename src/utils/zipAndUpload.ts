// GPT guidance for zipping & cloudinary vs s3 attempts
import fs from 'fs'
import path from 'path'
import archiver from 'archiver'
import fetch from 'node-fetch' // for streaming
//import { v2 as cloudinary } from 'cloudinary'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

export default async function zipAndUpload(modelId: number, imageUrls: string[]){
   
    const s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
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

    console.log('done preparing the zip file! time to upload')

    const bucketName =  process.env.AWS_BUCKET_NAME
    const fileName = path.basename(zipPath)
    const key = `training-zips/${fileName}`

    const fileStream = fs.createReadStream(zipPath)

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: fileStream,
        ContentType: "application/zip",
    })

    await s3.send(command)

    // the other stuff needs this url
    const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    console.log('got this far and no error?, uploading zip', url)
    return url
}


    // graveyard cloudinary
    // cloudinary.config({
    //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //     api_key: process.env.CLOUDINARY_API_KEY,
    //     api_secret: process.env.CLOUDINARY_API_SECRET,
    // })     
    // // secure_urls dont work?
    // // "Training failed. 401 Client Error: Unauthorized for url: https://res.cloudinary.com/dmv9qljos/raw/upload/v1755241886/training-zips/2-1755241882471.zip"
    // const { secure_url } = await cloudinary.uploader.upload(zipPath, {
    //     resource_type: 'raw',
    //     public_id: `training-zips/${modelId}-${Date.now()}.zip`,
    //     upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    // });
    // fs.unlinkSync(zipPath)