import { Heading, Flex, Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import "@/app/(landing)/landing.css"
import SignUps from "./SignUps"

// import Image from "next/image"
import { Image } from '@chakra-ui/react'

const LandingPage = () => {
    return (
        <Box className='landing-wrapper'>
            <Box className='top-nav'>
                <Box>
                    Logo
                </Box>
                <Box cursor='pointer'>
                    <Link href='/signin'>
                        Sign In
                    </Link>
                </Box>
            </Box>
            <Box className='landing-hero' p={10}>
                <Flex justify='center' gap='8rem'>
                    <Flex direction='column' gap='10px'>
                        <Heading className='landing-title' mb={2}>
                            <span>Jewellery AI</span>
                        </Heading>
                        <Flex gap={3} align='center'>
                            <Image src='/images/jicon-2.png'height='34px' width='34px' />                    
                            <Text className='bullet-point'>Create deeply customised AI models</Text>
                        </Flex>
                        <Flex gap={3} align='center'>
                            <Image src='/images/jicon-1.png' height='28px' width='34px' />
                            <Text className='bullet-point'>Upload your images & train in your style</Text>
                        </Flex>
                        <Flex gap={3} align='center'>
                            <Image src='/images/jicon-3.png' height='30px' width='34px' />
                            <Text className='bullet-point'>Take professional-grade product photos</Text>
                        </Flex>                        
                    </Flex>
                    <SignUps />
                </Flex>
            </Box>
        </Box>
    )
}

export default LandingPage