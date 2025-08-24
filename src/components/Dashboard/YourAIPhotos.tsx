'use client'

import { Box, SimpleGrid } from '@chakra-ui/react'
import PhotoCard from './PhotoCard'

const YourAIPhotos = ({ loadingCards, photos }) => {
    return (
        <Box mx="auto">
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} mt={4}>
            {loadingCards}
            {photos && photos.filter(photo => !photo.deleted).map((aiphoto, i) => (
                <PhotoCard key={i} aiphoto={aiphoto} hardDelete={false} />
            ))}         
            </SimpleGrid>
        </Box> 
    )
}

export default YourAIPhotos