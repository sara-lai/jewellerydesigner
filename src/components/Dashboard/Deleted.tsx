'use client'

import { Box, SimpleGrid } from '@chakra-ui/react'
import PhotoCard from './PhotoCard'

const Deleted = ({ photos }) => {
    return (
        <Box mx="auto">
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} mt={4}>
            {photos && photos.map((aiphoto, i) => (
                <PhotoCard key={i} aiphoto={aiphoto} hardDelete={true} />
            ))}         
            </SimpleGrid>
        </Box> 
    )
}

export default Deleted