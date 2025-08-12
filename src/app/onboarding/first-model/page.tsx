// brainstorm
// this is basically a form for MLModel schema 
// ideal: next.js's server actions to handle, connect with <form action={handleSubmit}...>
// no react style controller forms necessary

import '../onboarding.css'

import { Box, Button } from '@chakra-ui/react'


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