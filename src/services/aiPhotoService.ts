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

const deleteAIPhoto = async (photoId, userId) => {
    const photo = await prisma.aIPhoto.findUnique({
        where: { id: photoId },
    })

    // security
    if (photo.user_id !== userId) {
        throw new Error("Unauthorized hard deletion!")
    }

    const deletedPhoto = await prisma.aIPhoto.delete({where: { id: photoId }})
    console.log('deleted', deletedPhoto)
}

const softDeleteAIPhoto = async (photoId, userId) => {
    // repeat logic deleteAIPhoto, but update boolean at end
    const photo = await prisma.aIPhoto.findUnique({
        where: { id: photoId },
    })

    // security
    if (photo.user_id !== userId) {
        throw new Error("Unauthorized soft deletion!")
    }

    const softDeletedPhoto = await prisma.aIPhoto.update({
        where: { id: photoId }, 
        data: { deleted: true }
    })
    console.log('soft delete', softDeletedPhoto)
}

export {
    createAIPhoto,
    getPhotosForCurrentUser,
    deleteAIPhoto,
    softDeleteAIPhoto,
}