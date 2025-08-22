import prisma from '@/lib/prisma'

const createAIPhoto = async (modelId: number, userId: string, imgUrl: string) => {
    const newPhoto = await prisma.aIPhoto.create({
        data: {
            modelId: modelId,
            user_id: userId, // clerk user id
            url: imgUrl,
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