'use client'

import { Box, SimpleGrid } from '@chakra-ui/react'
import PhotoCard from './PhotoCard'

const YourAIPhotos = ({ loadingCards, currentModel }) => {
    return (
        <Box mx="auto">
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} mt={4}>
            {loadingCards}
            {currentModel && currentModel.aiphotos?.map((aiphoto, i) => (
                <PhotoCard key={i} imgSrc={aiphoto.url} />
            ))}         
            </SimpleGrid>
        </Box> 
    )
}

export default YourAIPhotos