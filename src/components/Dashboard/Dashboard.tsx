// will try this component as main parent for all the dashbhoard things, state, etc. 
// needing to move former dashboard layout.tsx stuff here
'use client'

import { useState } from 'react'
import { Box, Card, SimpleGrid, Image, Flex, Text, Heading, Button } from '@chakra-ui/react'
import FeaturesPanel from './FeaturesPanel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-regular-svg-icons'
import { FiSettings } from 'react-icons/fi'
import Link from 'next/link'


import '@/app/dashboard/dashboard.css'

const Dashboard = ({ latestModel, allModels }) => {

    const [currentModel, setCurrentModel] = useState({...latestModel})

    // todo - state/clicking to manage "tabs" with underlines (marketplace kampong lah)

    return (
        <Flex className='dashboard-container' mx="auto" h="100vh">
            <Box width="380px" pt={0}>  
                <FeaturesPanel allModels={allModels} currentModel={currentModel} setCurrentModel={setCurrentModel} />
            </Box>
            <Box flex="1" overflowY="auto" className="content-scroll" mb={20} pr={2}>  
                <Box position="sticky" top={0} zIndex={10} bg='white'>
                    <Flex justify="space-between" align="center" gap={4} p={2} borderBottom="1px solid rgba(0,0,0,.1)">
                        <Link href="/dashboard">
                        {/* <Box fontSize='1.1rem' pl={4} fontWeight='600'>
                            JewelleryAI
                        </Box> */}
                        </Link>
                        <Flex gap={4} align='center'>
                        <Box>
                            <Text fontWeight='bold' color='pink.600' letterSpacing='-.3px'>
                            100 Credits
                            </Text>
                        </Box>
                        <Box>
                            <Button className='btn-colors' h='32px !important'>Upgrade</Button>            
                        </Box>
                        </Flex>              
                    </Flex>                
                    <Flex justify='space-evenly' pt={3} borderBottom='1px solid rgba(0,0,0,.1)'>
                        <Box cursor='pointer' className='tab'>
                            <Text pl={4} pr={4}>Public Models</Text>
                        </Box>
                        <Box cursor='pointer' className='active tab'>
                            <Text pl={4} pr={4}>
                                Your AI Photos
                            </Text>
                        </Box>            
                        <Box cursor='pointer' className='tab'>
                            <Text pl={4} pr={4}>Favourites</Text>
                        </Box> 
                        <Box pr={8} cursor='pointer' className='tab'>
                            <Text pl={4} pr={4}>Deleted</Text>
                        </Box>                                    
                    </Flex>
                </Box>
                <Box mx="auto">
                    {/* Placeholder for future content */}
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} mt={4}>
                    {currentModel.aiphotos.map((aiphoto, i) => (
                        // todo , photoCard component with nice effect/menu
                        <Image key={i} src={aiphoto.url} />
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
