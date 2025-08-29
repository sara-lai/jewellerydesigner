'use client'

import { useState, useEffect, useRef } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import FeaturesPanel from './FeaturesPanel'
import YourAIPhotos from './YourAIPhotos'
import Favourites from './Favourites'
import Deleted from './Deleted'
import PublicModels from './PublicModels'
import TopBar from './TopBar'
import getModelSecurely from '@/app/actions/getModelSecurely'
import Pusher from 'pusher-js'
import PhotoCardLoading from './PhotoCardLoading'

import '@/app/dashboard/dashboard.css'

const Dashboard = ({ latestModel, allModels, currentUser }) => {
    const [currentModel, setCurrentModel] = useState({...latestModel})
    const [loadingCards, setLoadingCards] = useState([])
    const [tab, setTab] = useState('all')
    const [isDisabled, setIsDisabled] = useState(false) // previously in FeaturesPanel (to control form)
    const [mainPhotos, setMainPhotos] = useState(currentModel.aiphotos)   
    const [numCredits, setNumCredits] = useState(currentUser.credits) 
    const [generatingModel, setGeneratingModel] = useState({...currentModel})

    const deletedPhotos = currentModel.aiphotos.filter(photo => photo.deleted)
    const [deleted, setDeleted] = useState(deletedPhotos)

    const favouritePhotos = currentModel.aiphotos.filter(photo => photo.favourited)
    const [favourites, setFavourites] = useState(favouritePhotos)

    const pusherRef = useRef(null) // useRef to prevent concurrent connections issue

    function setNewPhotoUI(numPhotos: number){
        // numPhotos is number of photos being generated/ number of cards to display
        const cards = []
        for (let i = 0; i < numPhotos; i++){
            cards.push(<PhotoCardLoading key={i} />)
        }
        setLoadingCards(cards)
    }

    function removeFromMainList(photoId: number){
        const newMainPhotos = mainPhotos.filter(photo => photo.id !== photoId)        
        setMainPhotos(newMainPhotos)

        // ah can add to deleted here as well (for deleted tab)
        const newlyDeleted = mainPhotos.find(photo => photo.id === photoId)
        setDeleted([...deleted, newlyDeleted])
    }

    function addToMainListUnDelete(photoId: number){
        // filter out of DELETED, then copy to main list
        let theUnDeleted = deleted.find(photo => photo.id === photoId)    

        // update FE because not immediately synced with BE
        theUnDeleted = { ...theUnDeleted, deleted: false }
        setMainPhotos([theUnDeleted, ...mainPhotos])

        // finally removing from deleted list, can re-use
        removeFromDeleted(photoId)
    }

    function addToFavouritesList(photoId: number){
        let newFavourited = mainPhotos.find(photo => photo.id === photoId)

        // update FE because not immediately synced with BE
        newFavourited = { ...newFavourited, favourited: true}
        setFavourites([newFavourited, ...favourites])

        // also update mainPhotos so icon changes
        const newMain = mainPhotos.map(photo => photo.id === photoId ? newFavourited : photo)
        setMainPhotos(newMain)
    }

    function removeFromFavouritesList(photoId: number){
        const newFavourites = favourites.filter(photo => photo.id !== photoId)
        setFavourites(newFavourites)

        // update FE because not immediately synced with BE
        let unFavourited = mainPhotos.find(photo => photo.id === photoId)
        unFavourited = { ...unFavourited, favourited: false}
        const newMain = mainPhotos.map(photo => photo.id === photoId ? unFavourited : photo)
        setMainPhotos(newMain)
    }

    function removeFromDeleted(photoId: number){
        const newDeleted = deleted.filter(photo => photo.id !== photoId)
        setDeleted(newDeleted)
    }

    async function updateStateOnModelChange(){
        // using server action to keep images in sync with db (pusher only updates states vars)
        // todo - loading skeletons.... ?
        const refreshedModel = await getModelSecurely(currentModel.id)  
        console.log('got refreshed model', refreshedModel)       
        setDeleted(refreshedModel.aiphotos.filter(photo => photo.deleted))
        setFavourites(refreshedModel.aiphotos.filter(photo => photo.favourited))
        setMainPhotos(refreshedModel.aiphotos)
    }

    useEffect(() => {
        updateStateOnModelChange()
    }, [currentModel])

    useEffect(() => {
        if (!pusherRef.current) { // make sure pusher only 1 init (from p3/ concurrent connections issue)
            pusherRef.current = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, { cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER })
        }
        const pusher = pusherRef.current
        const channel = pusher.subscribe(`new-image-${currentUser.clerk_id}`)        
        channel.bind('new-image', (data) => {
            // make sure photos only appear with right model (similar case like setGeneratingModel)
            console.log('photo model vs. current model', data.photo.modelId, currentModel.id)
            if (data.photo.modelId === currentModel.id){
                setMainPhotos(prev => [data.photo, ...prev]) // solution: without prev weird state issues (simultaneous pusher messages)
            }
            setLoadingCards([]) // txodo - remove cards one at a time?
            setIsDisabled(false) // free-up form in FeaturesPanel
            setGeneratingModel({}) // stop loading cards weird case
        })
        return () => {    // clean up or can get duplicates
            channel.unbind('new-image')
            pusher.unsubscribe(`new-image-${currentUser.clerk_id}`)
        }        
    }, [currentModel])      

    return (
        <Flex className='dashboard-container' mx="auto" h="100vh">
            <Box width="380px" pt={0}>  
                <FeaturesPanel setNewPhotoUI={setNewPhotoUI} allModels={allModels} currentModel={currentModel} 
                    setCurrentModel={setCurrentModel} isDisabled={isDisabled} setIsDisabled={setIsDisabled} setNumCredits={setNumCredits} 
                    setGeneratingModel={setGeneratingModel}
                />
            </Box>
            <Box flex="1" overflowY="auto" className="content-scroll" mb={4} pr={2}>  
                <Box position="sticky" top={0} zIndex={10} bg='white'>
                    <TopBar numCredits={numCredits}/>

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
                    {tab === 'all' && ( 
                        <YourAIPhotos loadingCards={loadingCards} photos={mainPhotos} removeFromMainList={removeFromMainList} addToFavouritesList={addToFavouritesList} 
                            removeFromFavouritesList={removeFromFavouritesList} generatingModel={generatingModel} currentModel={currentModel} 
                        />
                    )}
                    {tab === 'favourites' && <Favourites photos={favourites} removeFromFavouritesList={removeFromFavouritesList} />}
                    {tab === 'deleted' && <Deleted photos={deleted} removeFromDeleted={removeFromDeleted} addToMainListUnDelete={addToMainListUnDelete} />}
                    {tab ==='public' && <PublicModels />}
                </Box>
            </Box>
      </Flex>
    ) 

}

export default Dashboard
