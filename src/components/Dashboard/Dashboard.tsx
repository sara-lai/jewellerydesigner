// will try this component as main parent for all the dashbhoard things, state, etc. 
// needing to move former dashboard layout.tsx stuff here
'use client'

import { useState } from 'react'
import { Box, Card, Skeleton, SimpleGrid, Image, Flex, Text, Heading, Button, Spinner } from '@chakra-ui/react'
import FeaturesPanel from './FeaturesPanel'
import Link from 'next/link'

import YourAIPhotos from './YourAIPhotos'
import Favourites from './Favourites'
import Deleted from './Deleted'
import PublicModels from './PublicModels'

import '@/app/dashboard/dashboard.css'

const Dashboard = ({ latestModel, allModels }) => {

    const [currentModel, setCurrentModel] = useState({...latestModel})
    const [loadingCards, setLoadingCards] = useState([])
    const [tab, setTab] = useState('all')

    // todo - state/clicking to manage "tabs" with underlines (marketplace kampong lah)

    function setNewPhotoUI(numPhotos: number){
        // argument is number of photos being generated/ number of cards to display

        // reusing graveyard placeholders
        // todo - loading spinners & counters
        const PhotoCardSkeleton = () => (
            <Card.Root minH='300px'minW='250px' boxShadow="md">
                <Card.Body p={2}>
                    <Flex justify='center' align='center' h='100%'>
                        <Spinner size='xl' />
                    </Flex>
                </Card.Body>
            </Card.Root>
        )
        const cards = []
        for (let i = 0; i < numPhotos; i++){
            cards.push(<PhotoCardSkeleton key={i} />)
        }
        setLoadingCards(cards)
    }

    return (
        <Flex className='dashboard-container' mx="auto" h="100vh">
            <Box width="380px" pt={0}>  
                <FeaturesPanel setNewPhotoUI={setNewPhotoUI} allModels={allModels} currentModel={currentModel} setCurrentModel={setCurrentModel} />
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
                        <Box cursor='pointer' className={tab === 'public' ? 'active tab' : 'tab'} onClick={()=> setTab('public')}>
                            <Text pl={4} pr={4}>
                                Public Models
                            </Text>
                        </Box>
                        <Box cursor='pointer' className={tab === 'all' ? 'active tab' : 'tab'} onClick={()=> setTab('all')}>
                            <Text pl={4} pr={4}>
                                Your AI Photos
                            </Text>
                        </Box>            
                        <Box cursor='pointer' className={tab === 'favourites' ? 'active tab' : 'tab'} onClick={()=> setTab('favourites')}>
                            <Text pl={4} pr={4}>
                                Favourites
                            </Text>
                        </Box> 
                        <Box pr={8} cursor='pointer' className={tab === 'deleted' ? 'active tab' : 'tab'} onClick={()=> setTab('deleted')}>
                            <Text pl={4} pr={4}>
                                Deleted
                            </Text>
                        </Box>                                    
                    </Flex>
                </Box>

                <Box mx="auto">
                    {tab === 'all' && <YourAIPhotos loadingCards={loadingCards} currentModel={currentModel} />}
                    {tab === 'favourites' && <Favourites />}
                    {tab === 'deleted' && <Deleted />}
                    {tab ==='public' && <PublicModels />}
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
