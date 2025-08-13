import { Box, Card, SimpleGrid, Skeleton, SkeletonText } from '@chakra-ui/react'

const PhotoCardSkeleton = () => (
  <Card.Root minH='300px'minW='250px' boxShadow="md">
    <Card.Body p={2}>
      <Skeleton h="100%" w="100%" borderRadius="md" />
    </Card.Body>
  </Card.Root>
)

const Dashboard = () => {

    const placeholders = []
    for (let i = 0; i < 12; i++){
        placeholders.push(<PhotoCardSkeleton key={i} />)
    }

    return (
      <Box maxW="1200px" mx="auto">
        {/* Placeholder for future content */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} mt={4}>
            {placeholders}
        </SimpleGrid>
      </Box>
    )
}

export default Dashboard