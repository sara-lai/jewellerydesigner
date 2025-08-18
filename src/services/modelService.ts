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

const getModelById = async(modelId: number) => {
    const model = await prisma.mLModel.findUnique({ where: { id: modelId } });
    return model
}

const getLatestTrainedModel = async (user_id: string) => {
    // user id is clerk id....
    const latestModel = await prisma.mLModel.findFirst({
        where: { user_id: user_id },
        orderBy: { createdAt: "desc" },
        include: { aiphotos: true }
    })
    return latestModel
}

const getModelsForCurrentUser = async (user_id: string) => {
    const allModels = await prisma.mLModel.findMany({ 
        where: { user_id: user_id }, 
        include: { aiphotos: true }
    })
    return allModels    
}

export {
    createModel,
    updateModel,
    getModelById,
    getLatestTrainedModel,
    getModelsForCurrentUser,
}