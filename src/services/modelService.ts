import prisma from '@/lib/prisma'

const createModel = async (data) => {
    const newModel = await prisma.mlmodel.create({
        data: { }
    })    
    return newModel
}

export {
    createModel
}