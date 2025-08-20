// SignIns to avoid Clerk SignIn conflict
"use client"
import { SignIn } from '@clerk/nextjs'
import { Box } from "@chakra-ui/react"

const SignIns = () => {
    return (
        <Box className='signup-box'>
            <SignIn />
      </Box>
    )
}

export default SignIns
