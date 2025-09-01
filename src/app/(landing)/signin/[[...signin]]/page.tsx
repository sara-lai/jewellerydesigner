import "../../landing.css"
import SignIns from "@/components/Landing/SignIns"
import { Heading, Flex, Box, Text } from '@chakra-ui/react'

const SignIn = () => {
    return (
        <Flex h='80vh' direction='column' justify='center' gap={4} align='center'>
            {/* <Text fontSize='3rem'>Welcome Back</Text> */}
            <SignIns />
        </Flex>
    )
}

export default SignIn