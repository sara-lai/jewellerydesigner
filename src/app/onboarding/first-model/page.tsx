import '../onboarding.css'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

const FirstModel = async () => {
    const { userId } = await auth()

    const currentUser = await prisma.user.findUnique({where: { clerk_id: userId } })    
    console.log('currentUser', currentUser)
    if (currentUser && !currentUser.hasPlan){
        console.log('problem! currentUser on first model page without a plan')
    }


    return (
        <>first model page</>
    )
}

export default FirstModel