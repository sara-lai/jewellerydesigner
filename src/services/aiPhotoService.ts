import prisma from '@/lib/prisma'
import { uploadImgToS3 } from '@/lib/s3'

const createAIPhoto = async (modelId: number, userId: string, imgUrl: string) => {
    // add s3 upload 
    // get url back from s3
    const s3Url = await uploadImgToS3(imgUrl)

    const newPhoto = await prisma.aIPhoto.create({
        data: {
            modelId: modelId,
            user_id: userId, // clerk user id
            url: s3Url,
        }
    })    
    return newPhoto
}

const getPhotosForCurrentUser = async (user_id: string) => {
    const allPhotos = await prisma.aIPhoto.findMany({ 
        where: { user_id: user_id }
    })
    return allPhotos  
}
// 

// getFavouritesForUser

export {
    createAIPhoto,
    getPhotosForCurrentUser
}