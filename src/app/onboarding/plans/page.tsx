// brainstorm
// test user creation here (after Clerk signup/confirmation)..... later move to a Clerk webhook?
// this is a server-side component so it should be secure

import '../onboarding.css'

import PricingPlans from '@/components/Landing/PricingPlans'

import { auth } from '@clerk/nextjs/server' // Different clerk package for server-side componetn vs client

import * as userService from '@/services/userService'

const SelectPlan = async () => {
    const { userId } = await auth()

    if (userId) {  // dont create a new user if no Clerk signup yet!        
        // check existing user & create
        const existingUser = await userService.currentUser()
        console.log('existing user', existingUser)
        if (!existingUser){
            const newUser = await userService.createUser(userId)
            console.log('Created new user!!!', newUser);        
        }
    }

    return (       
        <PricingPlans />
    )
}

export default SelectPlan