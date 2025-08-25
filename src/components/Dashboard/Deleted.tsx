'use client'

import { Box, SimpleGrid } from '@chakra-ui/react'
import DeletedPhotoCard from './DeletedPhotoCard'

const Deleted = ({ photos, removeFromDeleted, addToMainListUnDelete }) => {
    return (
        <Box mx="auto">
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} mt={4}>
            {photos && photos.map((aiphoto, i) => (
                <DeletedPhotoCard key={i} aiphoto={aiphoto} removeFromDeleted={removeFromDeleted} addToMainListUnDelete={addToMainListUnDelete} />
            ))}         
            </SimpleGrid>
        </Box> 
    )
}

export default Deleted