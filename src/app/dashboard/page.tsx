import { Box, Card, SimpleGrid, Skeleton, SkeletonText, Image, Flex, Text } from '@chakra-ui/react'

import * as modelService from '@/services/modelService'
import * as userService from '@/services/userService'
import Dashboard from '@/components/Dashboard/Dashbhoard'

// brainstorm
// next.js have to get state into client components not here, will use a parent component there
// this file should pass initial data/state to that parent.... 

const DashboardPage = async () => {
    const currentUser = await userService.currentUser()

    // always show latest Model output (make sure images are sorted by creation time....uhoh)
    const latestModel = await modelService.getLatestTrainedModel(currentUser.clerk_id)

    // for first visit & hasnt finished training
    const allModels = await modelService.getModelsForCurrentUser(currentUser.clerk_id)
    const completedTraining = latestModel?.completedTraining
    const firstVisit = allModels.length === 1 && !completedTraining

    return (
      <Box mx="auto">
        {/* Placeholder for future content */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} mt={4}>
          {!firstVisit && latestModel.sampleUrls.map((img, i) => (
            <Image key={i} src={img} />
          ))}    
          {firstVisit && (
            <Flex justify='center' align='center'>
              <Text>Your first model is training! Please come back in 20-30 minutes. We'll also send you an email.</Text>
            </Flex>
          )}      
        </SimpleGrid>
      </Box>
    )
}

export default DashboardPage



// graveyard, placeholders
// const PhotoCardSkeleton = () => (
//   <Card.Root minH='300px'minW='250px' boxShadow="md">
//     <Card.Body p={2}>
//       <Skeleton h="100%" w="100%" borderRadius="md" />
//     </Card.Body>
//   </Card.Root>
// )
//   const placeholders = []
//   for (let i = 0; i < 12; i++){
//       placeholders.push(<PhotoCardSkeleton key={i} />)
//   }
