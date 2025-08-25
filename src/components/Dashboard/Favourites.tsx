'use client'

import { Box, SimpleGrid } from '@chakra-ui/react'
import PhotoCard from './PhotoCard'

const Favourites = ({ photos, removeFromFavouritesList }) => {
    return (
        <Box mx="auto">
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} mt={4}>
            {photos && photos.map((aiphoto, i) => (
                <PhotoCard key={i} aiphoto={aiphoto} removeFromFavouritesList={removeFromFavouritesList} />
            ))}         
            </SimpleGrid>
        </Box> 
    )
}

export default Favourites