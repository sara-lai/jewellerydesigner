import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

// note: some confusion on whether to use clerk auth stuff here, or pass in clerk_ids (from server components)

const currentUser = async () => {
    const { userId } = await auth()
    if (!userId) {
        console.log('No Clerk session found uhoh')
        return null
    }
    const user = await prisma.user.findUnique({ where: { clerk_id: userId } });
    return user
}

const createUser = async (clerk_id: string) => {
    const newUser = await prisma.user.create({
        data: { clerk_id: clerk_id, hasPlan: false, hasFirstModel: false },
    })    
    return newUser
}

const updatePlan = async (clerk_id: string, plan?: string) => { // until have multiple plans
    const updatedUser = await prisma.user.update({
        where: { clerk_id: clerk_id,},
        data: { hasPlan: true, plan: plan}, 
    })
    return updatedUser 
} 

export {
    currentUser,
    createUser,
    updatePlan
}