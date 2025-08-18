// will try this component as main parent for all the dashbhoard things, state, etc. 
// needing to move former dashboard layout.tsx stuff here
'use client'

import { Box, Card, SimpleGrid, Image, Flex, Text, Heading } from '@chakra-ui/react'
import FeaturesPanel from './FeaturesPanel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-regular-svg-icons'

const Dashboard = ({ latestModel, allModels }) => {

    // todo - state/clicking to manage "tabs" with underlines (marketplace kampong lah)

    return (
        <Flex mx="auto" h="100vh">
            <Box width="340px" p={4} pt={0}>  
                <FeaturesPanel allModels={allModels} latestModel={latestModel} />
            </Box>
            <Box flex="1" overflowY="auto" className="content-scroll" mb={20} pr={2}>  
                <Flex justify='space-between'position="sticky" top={0} zIndex={10} bg='white' pb={4}>
                    <Box cursor='pointer'>
                        <Heading size='md'>Public Models</Heading>
                    </Box>
                    <Box cursor='pointer'>
                        <Heading size='md'>
                            {/* <FontAwesomeIcon icon={faSun} size="xl" style={{ maxHeight: '30px'}} /> */}
                            Your AI Photos
                        </Heading>
                    </Box>            
                    <Box cursor='pointer'>
                        <Heading size='md'>Favourites</Heading>
                    </Box> 
                    <Box pr={8} cursor='pointer'>
                        <Heading size='md'>Deleted</Heading>
                    </Box>                                    
                </Flex>
                <Box mx="auto">
                    {/* Placeholder for future content */}
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} mt={4}>
                    {latestModel.sampleUrls.map((img, i) => (
                        <Image key={i} src={img} />
                    ))}         
                    </SimpleGrid>
                </Box>     
            </Box>
      </Flex>
    ) 

}

export default Dashboard

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
