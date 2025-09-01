'use server' // mark as server-action

import * as userService from '@/services/userService'
import * as modelService from '@/services/modelService'
import * as replicate from '@/lib/replicate'
import { redirect } from 'next/navigation'

export async function createModel(formData: FormData, imageUrls: string[]) {
    const user = await userService.currentUser()
    console.log('currentUser', user)

    if (!user){
        console.log("no user.... ") // extra security? (middleware covers this?)
        return
    }
    if (user && !user.hasPlan){
        console.log('problem! currentUser on first model page without a plan')
        return
    }        

    const data = {
        user_id: user.clerk_id,
        name: formData.get('name') as string,
        stylePrompt: formData.get('stylePrompt') as string,
        agreedToTerms: formData.get('agreedToTerms') !== null, // null means not checked
        imageUrls: imageUrls,
    }
    const model = await modelService.createModel(data)
    console.log('Created model:', model)   
      
    await userService.updateFirstModel(user.clerk_id)  

    // train!!
    console.log('kicking off training! about to call....')
    
    // hmmm should await before direct to dashboard??? probably not
    // ^ lack of await maybe vercel problem?

    await replicate.trainFirstModel(model)
    console.log('replicate training has kicked off! new model updates')
    
    redirect('/dashboard')
}
