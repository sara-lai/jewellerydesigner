'use server' // mark as server-action

import * as userService from '@/services/userService'
import * as modelService from '@/services/modelService'

export async function createModel(formData: FormData) { // next will pass in FormData automatically
    const user = await userService.currentUser()
    console.log('currentUser', user)
    if (user && !user.hasPlan){
        console.log('problem! currentUser on first model page without a plan')
        return
    }        

    const data = {}
    const model = await modelService.createModel(data)
    console.log('Created model:', model)     
    await userService.updateFirstModel(user.clerk_id)   

    // redirect to dashboard
    // or redirect to a "check email" page
    // or redirect is put on client component??
}
