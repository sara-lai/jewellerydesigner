// brainstorm
// this is basically a form for MLModel schema 
// ideal: next.js's server actions to handle, connect with <form action={handleSubmit}...>
// no react style controller forms necessary

import '../onboarding.css'

import * as userService from '@/services/userService'
import * as modelService from '@/services/modelService'

import { Box, Button } from '@chakra-ui/react'

async function createModel(formData: FormData) { // next will pass in FormData automatically
    'use server' // mark as server-action

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
}


const FirstModel = async () => {

    return (
        <Box>
            <form action={createModel}>
            
                <Button type='submit'>Submit</Button>
            </form>
        </Box>
    )
}

export default FirstModel