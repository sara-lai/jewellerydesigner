'use client'
import { useState } from "react"
import { Image, Box, Button, Flex, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faHeart } from '@fortawesome/free-regular-svg-icons'
import { FiDownload, FiMaximize2 } from 'react-icons/fi'
import '@/app/dashboard/dashboard.css'
import { softDeletePhoto, deletePhoto } from '@/app/actions/deletePhoto'
import { favouritePhoto, unFavouritePhoto } from "@/app/actions/favouritePhoto"

const PhotoCard = ({ aiphoto, removeFromMainList, addToFavouritesList, removeFromFavouritesList }) => {
    const [showOverlay, setShowOverlay] = useState(false)

    // todo - realising i can have simpler logic.... (i have aiphoto already)
    // oh dear, refactor

    function handleDelete(photoId){
        if (aiphoto.favourited){
            console.log('deleting a favourite? wont do')
            return
        }

        softDeletePhoto(photoId)
        removeFromMainList(photoId)
    }

    function handleFavourite(photoId){
        if (aiphoto.favourited){ // will this always be updated/synced with db?
            unFavouritePhoto(photoId)
            removeFromFavouritesList(photoId)
        } else {
            favouritePhoto(photoId)
            addToFavouritesList(photoId)
        }        
    }

    return (
        <Box position='relative' borderRadius='6px' overflow='hidden'
            onMouseEnter={() => setShowOverlay(true)} 
            onMouseLeave={() => setShowOverlay(false)}
        >
            {showOverlay && (
                <Box position='absolute' h='100%' w='100%' p={4} bg='rgba(0,0,0,0.4)' zIndex='1' cursor='pointer'>
                    <Box>
                        <Flex justify='space-between'>
                            <FontAwesomeIcon color='white' icon={faTrashCan} size="2xl" style={{ maxHeight: '30px'}} onClick={() => handleDelete(aiphoto.id)} />                            
                            <FontAwesomeIcon color='white' icon={faHeart} size="2xl" style={{ maxHeight: '30px'}} onClick={() => handleFavourite(aiphoto.id)}/>                        
                        </Flex>
                        <Box mt='20%'>
                            <Flex justify='center' align='center' gap={6}>
                                <Flex direction='column'>
                                    <div className='icon-circle'>
                                        <FiMaximize2 className='fi-icon-thicken' color="gray.700" size="1.5rem" />
                                    </div>
                                    <Text fontSize='.8rem' color='white'>view</Text>
                                </Flex>
                                <Flex direction='column'>
                                    <a href={aiphoto.url} download target="_blank" rel="noopener noreferrer">
                                        <div className='icon-circle'>
                                            <FiDownload className='fi-icon-thicken' color="gray.700" size="1.5rem" />
                                        </div>
                                        <Text fontSize='.8rem' color='white'>download</Text>
                                    </a>
                                </Flex>
                            </Flex>
                        </Box>                        
                    </Box>
                </Box> 
            )}
            <Image src={aiphoto.url} />
        </Box>
    )
}

export default PhotoCard