import { Heading, Flex, Box } from '@chakra-ui/react'
import NewModelForm from "@/components/Models/NewModelForm"
import '@/app/dashboard/dashboard.css'

const NewModel = () => {
    return (
        <Flex flex='1' justify='center' align='center' direction='column' mt={8} h='100%'>
            <Box className='content-scroll' mb={8}>
                <Heading size='xl' fontSize='40px' mb={4}>
                    Create New Model                        
                </Heading>
                <NewModelForm />
            </Box>
        </Flex>
    )
}

export default NewModel