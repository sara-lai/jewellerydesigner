import '../onboarding.css'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import NewModelForm from '@/components/Models/NewModelForm'
import * as userService from '@/services/userService'

const FirstModel = async () => {

    const existingUser = await userService.currentUser()
    if (existingUser?.hasFirstModel){
        redirect('/dashboard')
    }

    return (
        <Flex justify='center' align='center' direction='column' mt={10}>
            <Heading size='xl' fontSize='40px' mb={4}>
                Your First Model                        
            </Heading>        
            <Box position='relative' z-index='1'>
                <NewModelForm />
            </Box>
        </Flex>
    )
}

export default FirstModel