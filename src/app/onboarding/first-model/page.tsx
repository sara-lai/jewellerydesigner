// brainstorm
// this is basically a form for MLModel schema 
// ideal: next.js's server actions to handle, connect with <form action={handleSubmit}...>
// no react style controller forms necessary

import '../onboarding.css'

import { Box} from '@chakra-ui/react'

import NewModelForm from '@/components/Models/NewModelForm'


const FirstModel = async () => {

    return (
        <Box>
            <NewModelForm />
        </Box>
    )
}

export default FirstModel