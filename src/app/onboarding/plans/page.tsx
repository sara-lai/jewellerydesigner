import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import PricingPlans from '@/components/Landing/PricingPlans'
import * as userService from '@/services/userService'
import '../onboarding.css'

const SelectPlan = async () => {
    const { userId } = await auth()

    // summary
    // using this page for user creation (first page after Clerk signup; in future can move to Clerk webhook!)
    // dont create another user if a currentUser
    // redirect appropriately if already has plans/models

    if (userId) { 
        // check existing user & create
        const existingUser = await userService.currentUser()
        console.log('existing user', existingUser)
        if (!existingUser){
            const newUser = await userService.createUser(userId)
            console.log('Created new user!!!', newUser);        
        } else {
            if (existingUser.hasPlan && existingUser.hasFirstModel){
                redirect('/dashboard')
            } else if (existingUser.hasPlan){
                redirect('/onboarding/first-model')
            }
        }
    }

    return (       
        <PricingPlans />
    )
}

export default SelectPlan