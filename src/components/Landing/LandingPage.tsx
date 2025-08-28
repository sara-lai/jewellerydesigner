'use client'
import { Heading, Flex, Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import "@/app/(landing)/landing.css"
import SignUps from "./SignUps"
import { FiTerminal } from 'react-icons/fi'

// import Image from "next/image"
import { Image } from '@chakra-ui/react'

const LandingPage = () => {
    return (
        <Box className='landing-wrapper'>            
            <div className="sun-gradient"></div>
            <Box className='top-nav'>
                <Box>                    
                    {/* <FiTerminal className='fi-icon-thicken' color="gray.700" size="2rem" /> */}                    
                </Box>
                <Box cursor='pointer' color='white' className='cl-formButtonPrimary' h='40px'>
                    <Link href='/signin'>
                        Sign In
                    </Link>
                </Box>
            </Box>
            <Box className='landing-hero' p={10} pt={6}>
                <Flex justify='center' gap='8rem'>
                    <Flex direction='column' gap='10px'>
                        <Heading className='landing-title' mb={2}>
                            <span>Jewellery AI</span>
                            <Text className='subtitle'>Your companion for <span className='smaller'>AI jewellery design</span></Text>
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
                <Box mt={16}>
                    <Flex justify='center'>
                        <Image src='/images/art-nouv-test-landing4.png' height='500px' opacity='.9' />
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}

export default LandingPage