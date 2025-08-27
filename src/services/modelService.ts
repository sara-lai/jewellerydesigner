import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

const createModel = async (data: Prisma.MLModelCreateInput) => {
    const newModel = await prisma.mLModel.create({
        data: data
    })    
    return newModel
}

const updateModel = async (modelId: number, data: Prisma.MLModelUpdateInput) => { 
    // prisma only changes fields specified
    const updatedModel = await prisma.mLModel.update({
        where: { id: modelId },
        data: data,        
    })    
    return updatedModel    
}

// this version is for webhooks (no current user)
const getModelById = async(modelId: number) => {
    const model = await prisma.mLModel.findUnique({ where: { id: modelId } });
    return model
}

const getModelByIdSecure = async(modelId: number, userId: string) => {
    const model = await prisma.mLModel.findUnique({ 
        where: { id: modelId },
        include: { aiphotos: { orderBy: { createdAt: "desc" } }}
    })

    if (model.user_id !== userId) {
        throw new Error("Unauthorized model access!")
    }
    return model
}

const getLatestTrainedModel = async (user_id: string) => {
    // user id is clerk id....
    const latestModel = await prisma.mLModel.findFirst({
        where: { user_id: user_id },
        orderBy: { createdAt: "desc" },
        include: { aiphotos: { orderBy: { createdAt: "desc" } }} // order aiphotos too, most recent first
    })
    return latestModel
}

const getModelsForCurrentUser = async (user_id: string) => {
    const allModels = await prisma.mLModel.findMany({ 
        where: { user_id: user_id }, 
        include: { aiphotos: { orderBy: { createdAt: "desc" } }}
    })
    return allModels    
}

export {
    createModel,
    updateModel,
    getModelById,
    getModelByIdSecure,
    getLatestTrainedModel,
    getModelsForCurrentUser,
}