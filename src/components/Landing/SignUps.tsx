// SignUps to avoid Clerk conflict (and pages.tsx SignUpPage conflict)
"use client"
import { SignUp } from '@clerk/nextjs'
import { Box } from "@chakra-ui/react"

const SignUps = () => {
    return (
        <Box className='signup-box'>
            <SignUp />
      </Box>
    )
}

export default SignUps
