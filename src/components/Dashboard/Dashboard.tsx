'use client'

import { useState, useEffect, useRef } from 'react'
import { Box, Card, Flex, Spinner, Text } from '@chakra-ui/react'
import FeaturesPanel from './FeaturesPanel'
import YourAIPhotos from './YourAIPhotos'
import Favourites from './Favourites'
import Deleted from './Deleted'
import PublicModels from './PublicModels'
import TopBar from './TopBar'

import '@/app/dashboard/dashboard.css'

import Pusher from 'pusher-js'

const Dashboard = ({ latestModel, allModels }) => {
    const [currentModel, setCurrentModel] = useState({...latestModel})
    const [loadingCards, setLoadingCards] = useState([])
    const [tab, setTab] = useState('all')
    const [isDisabled, setIsDisabled] = useState(false) // previously in FeaturesPanel (to control form)
    const [mainPhotos, setMainPhotos] = useState(currentModel.aiphotos)    

    const deletedPhotos = currentModel.aiphotos.filter(photo => photo.deleted)
    const [deleted, setDeleted] = useState(deletedPhotos)

    const favouritePhotos = currentModel.aiphotos.filter(photo => photo.favourited)
    const [favourites, setFavourites] = useState(favouritePhotos)

    const pusherRef = useRef(null) // useRef to prevent lots of inits

    function setNewPhotoUI(numPhotos: number){
        // argument is number of photos being generated/ number of cards to display

        // todo - add counter - probably setInterval/ useEffect... new file probably
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

    function removeFromMainList(photoId){
        const newMainPhotos = mainPhotos.filter(photo => photo.id !== photoId)        
        setMainPhotos(newMainPhotos)

        // ah can add to deleted here as well (for deleted tab)
        const newlyDeleted = mainPhotos.find(photo => photo.id === photoId)
        setDeleted([...deleted, newlyDeleted])
    }

    function addToMainListUnDelete(photoId){
        // filter out of DELETED, then copy to main list
        let theUnDeleted = deleted.find(photo => photo.id === photoId)    

        // tmp solution, need to manually set deleted = false (since not synced with DB - todo)
        theUnDeleted = { ...theUnDeleted, deleted: false }
        setMainPhotos([theUnDeleted, ...mainPhotos])

        // finally removing from deleted list, can re-use
        removeFromDeleted(photoId)
    }

    function addToFavouritesList(photoId){
        console.log('addToFavouritesList', photoId)
        let newFavourited = mainPhotos.find(photo => photo.id === photoId)
        console.log('theobj', newFavourited)

        // similar to db situation, tmp solution until sync with db properly - todo
        newFavourited = { ...newFavourited, favourited: true}

        setFavourites([newFavourited, ...favourites])
    }

    function removeFromFavouritesList(photoId){
        const newFavourites = favourites.filter(photo => photo.id !== photoId)
        setFavourites(newFavourites)
    }

    function removeFromDeleted(photoId){
        const newDeleted = deleted.filter(photo => photo.id !== photoId)
        setDeleted(newDeleted)
    }

    // when currentModel changes, set all relevant state vars
    useEffect(() => {
        // brainstorm
        // todo - stale photo issue with pusher
        // when current model changes, also use server action & get currentModel from DB, keep in-sync
        // good place for loading skeletons.... 
        // make this async 

        setDeleted(currentModel.aiphotos.filter(photo => photo.deleted))
        setFavourites(currentModel.aiphotos.filter(photo => photo.favourited))
        setMainPhotos(currentModel.aiphotos)
    }, [currentModel])

    useEffect(() => {
        if (!pusherRef.current) { // make sure pusher only 1 init
            pusherRef.current = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, { cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER })
        }
        const pusher = pusherRef.current
        const channel = pusher.subscribe(`new-image-${currentModel.id}`)        
        channel.bind('new-image', (data) => {
            setMainPhotos(prev => [data.photo, ...prev]) // solution: without prev weird state issues (simultaneous pusher messages)
            setLoadingCards([]) // todo - remove cards one at a time?
            setIsDisabled(false) // free-up form in FeaturesPanel
        })
        return () => {    // clean up or can get duplicates
            channel.unbind('new-image')
            pusher.unsubscribe(`new-image-${currentModel.id}`)
        }        
    }, [currentModel])      

    return (
        <Flex className='dashboard-container' mx="auto" h="100vh">
            <Box width="380px" pt={0}>  
                <FeaturesPanel setNewPhotoUI={setNewPhotoUI} allModels={allModels} currentModel={currentModel} 
                    setCurrentModel={setCurrentModel} isDisabled={isDisabled} setIsDisabled={setIsDisabled} 
                />
            </Box>
            <Box flex="1" overflowY="auto" className="content-scroll" mb={20} pr={2}>  
                <Box position="sticky" top={0} zIndex={10} bg='white'>
                    <TopBar />

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
                    {tab === 'all' && <YourAIPhotos loadingCards={loadingCards} photos={mainPhotos} removeFromMainList={removeFromMainList} addToFavouritesList={addToFavouritesList} />}
                    {tab === 'favourites' && <Favourites photos={favourites} removeFromFavouritesList={removeFromFavouritesList} />}
                    {tab === 'deleted' && <Deleted photos={deleted} removeFromDeleted={removeFromDeleted} addToMainListUnDelete={addToMainListUnDelete} />}
                    {tab ==='public' && <PublicModels />}
                </Box>
            </Box>
      </Flex>
    ) 

}

export default Dashboard
