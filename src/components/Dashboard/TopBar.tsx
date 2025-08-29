'use client'

import { Box, Flex, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'

const TopBar = ({ numCredits }) => {
    return (
        <Flex justify="space-between" align="center" gap={4} p={2} borderBottom="1px solid rgba(0,0,0,.1)">
            <Link href="/dashboard">
            {/* <Box fontSize='1.1rem' pl={4} fontWeight='600'>
                JewelleryAI
            </Box> */}
            </Link>
            <Flex gap={4} align='center'>
            <Box>
                <Text fontWeight='bold' color='pink.600' letterSpacing='-.3px'>
                    {numCredits}
                </Text>
            </Box>
            <Box>
                <Button className='btn-colors' h='32px !important'>Upgrade</Button>            
            </Box>
            </Flex>              
        </Flex>  
    )
}

export default TopBar