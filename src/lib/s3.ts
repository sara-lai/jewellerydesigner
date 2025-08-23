// GPT help with stream vs. buffer approach (like on zipAndUpload) and with Upload vs. PutObjectCommand

// brainstorm
// goal is copy images to s3 when replicate generates them (buggy expiration)
// ^ run this upload in the prisma /services?
// probably move zip uploads here from zipAndUpload.ts 
// diff s3 buckets for zips vs aiphotos?

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"
import fetch from 'node-fetch'

const uploadImgToS3 = async(url: string) => {
    const s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    })
    
    const response = await fetch(url) // returns a fileStream from replicate?
    if (!response.ok) {
        console.log('problem getting data stream from replicate!!')
        return
    } 

    // making the key.... (copying from zipAndUpload)
    const ext = url.split('.').pop()?.split('?')[0] || 'jpg'
    const key = `gen-images/photo-${Date.now()}-${Math.floor(Math.random() * 100000)}.${ext}`

    const upload = new Upload({
        client: s3,
        params: {
            Bucket: process.env.AWS_IMG_BUCKET,
            Key: key,
            Body: response.body,
            ContentType: response.headers.get('content-type') || 'application/octet-stream',
        }
    })
    await upload.done()

    // getting strange errors
    // const command = new PutObjectCommand({
    //     Bucket: process.env.AWS_IMG_BUCKET,
    //     Key: key,
    //     Body: response.body,
    //     ContentType: response.headers.get('content-type'), // pass on content type from replicate
    // })
    // await s3.send(command)

    const awsUrl = `https://${process.env.AWS_IMG_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    return awsUrl
}

const uploadZipToS3 = async (bucketName: string, key: string, fileStream) => {
    
    const s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
        
    })

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: fileStream,
        ContentType: "application/zip",
    })

    await s3.send(command)

    const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return url    
}

export {
    uploadImgToS3, 
    uploadZipToS3
}


