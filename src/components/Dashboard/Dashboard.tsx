// will try this component as main parent for all the dashbhoard things, state, etc. 
// needing to move former dashboard layout.tsx stuff here
'use client'

import { useState } from 'react'
import { Box, Card, Flex, Spinner } from '@chakra-ui/react'
import FeaturesPanel from './FeaturesPanel'

import YourAIPhotos from './YourAIPhotos'
import Favourites from './Favourites'
import Deleted from './Deleted'
import PublicModels from './PublicModels'
import TopBar from './TopBar'

import '@/app/dashboard/dashboard.css'

const Dashboard = ({ latestModel, allModels }) => {

    const [currentModel, setCurrentModel] = useState({...latestModel})
    const [loadingCards, setLoadingCards] = useState([])
    const [tab, setTab] = useState('all')

    function setNewPhotoUI(numPhotos: number){
        // argument is number of photos being generated/ number of cards to display

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
                    <TopBar />
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
