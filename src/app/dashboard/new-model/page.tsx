import { Heading, Flex, Box, Button } from '@chakra-ui/react'
import NewModelForm from "@/components/Models/NewModelForm"
import '@/app/dashboard/dashboard.css'
import { FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

const NewModel = () => {
    return (
        <>
        <Box position='relative'>
            <Link href='/dashboard'>
                <Button className='btn-colors' h='32px !important' position='absolute' right='0' top='0' m={4}>
                    <FiArrowLeft className='fi-icon-thicken' color="gray.700" size="2rem" />
                    Dashboard
                </Button>            
            </Link>
        </Box>
        <Flex flex='1' justify='center' align='center' direction='column' mt={8} h='100%'>            
            <Box className='content-scroll' mb={8}>
                <Heading size='xl' fontSize='40px' mb={4}>
                    Create New Model                        
                </Heading>
                <NewModelForm />
            </Box>
        </Flex>
        </>
    )
}

export default NewModel