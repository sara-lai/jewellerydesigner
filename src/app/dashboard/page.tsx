import { Box, Card, SimpleGrid, Skeleton, SkeletonText, Image } from '@chakra-ui/react'

import * as modelService from '@/services/modelService'
import * as userService from '@/services/userService'

// brainstorm
// have to get latest trained model of current user 
// sampleUrls.... put in state variable, conditional render

const PhotoCardSkeleton = () => (
  <Card.Root minH='300px'minW='250px' boxShadow="md">
    <Card.Body p={2}>
      <Skeleton h="100%" w="100%" borderRadius="md" />
    </Card.Body>
  </Card.Root>
)

const Dashboard = async () => {
    const currentUser = await userService.currentUser()

    // latest model logic probably doesnt apply when have lots of models??
    // special screen for first visit to dashboard/still training
    const latestModel = await modelService.getLatestTrainedModel(currentUser.clerk_id)
    const completedTraining = latestModel?.completedTraining // and if only model.... show some screen

    // todo maybe do something with placeholders if visit dashboard while first model is training?
    const placeholders = []
    for (let i = 0; i < 12; i++){
        placeholders.push(<PhotoCardSkeleton key={i} />)
    }

    return (
      <Box mx="auto">
        {/* Placeholder for future content */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} mt={4}>
          {completedTraining && latestModel.sampleUrls.map((img, i) => (
            <Image key={i} src={img} />
          ))}          
        </SimpleGrid>
      </Box>
    )
}

export default Dashboard