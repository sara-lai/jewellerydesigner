import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

// note: some confusion on whether to use clerk auth stuff here, or pass in clerk_ids (from server components)

const currentUser = async () => {
    const { userId } = await auth()
    if (!userId) {
        console.log('No Clerk session found')
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

const updateCredits = async (clerk_id: string, numCredits: number) => { 
    // must get user firs to get existing credits (without clerk JWT stuff, is from webhook)
    const user = await prisma.user.findUnique({
        where: { clerk_id: clerk_id },
    })

    const newCredits = user.credits + numCredits

    const updatedUser = await prisma.user.update({
        where: { clerk_id: clerk_id,},
        data: { credits: newCredits }, 
    })
    return updatedUser
}

// shoudl this be updated after replicate complete?
const updateFirstModel = async (clerk_id: string) => { // until have multiple plans
    const updatedUser = await prisma.user.update({
        where: { clerk_id: clerk_id,},
        data: { hasFirstModel: true}, 
    })
    return updatedUser 
} 

export {
    currentUser,
    createUser,
    updatePlan,
    updateFirstModel,
    updateCredits
}