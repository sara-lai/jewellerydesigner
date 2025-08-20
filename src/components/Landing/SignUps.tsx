// SignUps to avoid Clerk conflict (and pages.tsx SignUpPage conflict)
"use client"

// testing an immediate redirect , getting weird clerk delays
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUser } from '@clerk/nextjs'


import { SignUp } from '@clerk/nextjs'
import { Box } from "@chakra-ui/react"

const SignUps = () => {
    const { isSignedIn, isLoaded } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            console.log("ok clerk has given a signal that user is good")
           // router.replace("/onboarding")
        }
    }, [isLoaded, isSignedIn, router])    

    return (
        <Box className='signup-box'>
            <SignUp />
        </Box>
    )
}

export default SignUps
