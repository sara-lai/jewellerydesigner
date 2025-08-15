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

export {
    createModel,
    updateModel,
    getModelById
}