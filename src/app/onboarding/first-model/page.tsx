import '../onboarding.css'
import { Box, Flex, Heading } from '@chakra-ui/react'
import NewModelForm from '@/components/Models/NewModelForm'

const FirstModel = async () => {

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