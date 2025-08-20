import '../onboarding.css'
import { Box, Skeleton, Flex, Heading } from '@chakra-ui/react'
import NewModelForm from '@/components/Models/NewModelForm'

// todo - failed attempt w/ suspense
// import { Suspense } from 'react'
// const FormSkeleton = () => (
//   <Box p={4}>
//     <Skeleton height="40px" mb={4} />
//     <Skeleton height="40px" mb={4} />
//     <Skeleton height="40px" width="100px" />
//   </Box>
// )

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