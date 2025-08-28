// SignIns to avoid Clerk SignIn conflict
"use client"
import { SignIn } from '@clerk/nextjs'
import { Box } from "@chakra-ui/react"
import Link from 'next/link'

const SignIns = () => {
    return (   
        <Box className='signup-box'>
            <SignIn />
        </Box>
    )
}

export default SignIns
