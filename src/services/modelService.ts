import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

const createModel = async (data: Prisma.MLModelCreateInput) => {
    const newModel = await prisma.mLModel.create({
        data: data
    })    
    return newModel
}

const updateModel = async (model_id: number, data: Prisma.MLModelUpdateInput) => { 
    // prisma only changes fields specified
    const updatedModel = await prisma.mLModel.update({
        where: { id: model_id },
        data: data,        
    })    
    return updatedModel    
}

export {
    createModel,
    updateModel
}