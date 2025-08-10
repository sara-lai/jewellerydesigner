// brainstorm
// test user creation here (after Clerk signup/confirmation)..... later move to a Clerk webhook?
// only create user if a) have Clerk session b) user not already created
// this is a server-side component so it should be secure

import '../onboarding.css'

import PricingPlans from '@/components/Landing/PricingPlans'

// clerk & prisma
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server' // Different clerk package for server-side componetn vs client

const SelectPlan = async () => {
    const { userId } = await auth()

    if (userId) {  // dont create a new user if no Clerk signup yet!        
        console.log('got user from clerk', userId)

        // check existing user
        const existingUser = await prisma.user.findUnique({
            where: { clerk_id: userId },
        })
        console.log('existing user', existingUser)        

        // create the user
        if (!existingUser){
            const newUser = await prisma.user.create({
                data: { clerk_id: userId, hasPlan: false, hasFirstModel: false },
            })
            console.log('Created new user!!!', newUser);        
        }

    }

    // test
    const users = await prisma.user.findMany()
    console.log('all users from db', users)

    return (       
        <PricingPlans />
    )
}

export default SelectPlan