'use client'
import { useState } from "react"
import { Image, Box, Button } from "@chakra-ui/react"
import '@/app/dashboard/dashboard.css'

const PhotoCard = ({ imgSrc }) => {
    const [showOverlay, setShowOverlay] = useState(false)
    return (
        <Box position='relative'>
            {showOverlay && (
                <Box position='absolute' h='100%' w='100%' background='red'>
                    This is an overlay menu 
                    <Button>View</Button>
                    <Button>Download</Button>
                    <Button>Favourite</Button>
                    <Button>Delete</Button>
                </Box> 
            )}
            <Image src={imgSrc} _hover={() => setShowOverlay(true)} />
        </Box>
    )
}

export default PhotoCard