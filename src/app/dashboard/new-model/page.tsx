import { Heading, Flex } from '@chakra-ui/react'
import NewModelForm from "@/components/Models/NewModelForm"

const NewModel = () => {
    return (
        <Flex justify='center' align='center' direction='column' mt={8}>
            <Heading size='xl' fontSize='40px' mb={4}>
                Create New Model                        
            </Heading>
            <NewModelForm />
        </Flex>
    )
}

export default NewModel