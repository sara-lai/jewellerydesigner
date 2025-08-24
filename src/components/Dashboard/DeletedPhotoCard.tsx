// was going to re-use PhotoCard, but seems is different enough to warrant own component

'use client'
import { useState } from "react"
import { Image, Box, Button, Flex, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FiRotateCcw } from 'react-icons/fi'
import '@/app/dashboard/dashboard.css'
import { deletePhoto, unDeletePhoto } from '@/app/actions/deletePhoto'

const DeletedPhotoCard = ({ aiphoto, removeFromDeleted, addToMainList }) => {
    const [showOverlay, setShowOverlay] = useState(false)

    // todo - "undelete" feature

    function handleDelete(photoId){
        // both call server action & then removeFromDeleted
        deletePhoto(photoId)
        removeFromDeleted(photoId)
    }

    function handleUnDelete(photoId){
        unDeletePhoto(photoId)
        addToMainList(photoId)
    }

    return (
        <Box position='relative' borderRadius='6px' overflow='hidden'
            onMouseEnter={() => setShowOverlay(true)} 
            onMouseLeave={() => setShowOverlay(false)}
        >
            {showOverlay && (
                <Box position='absolute' h='100%' w='100%' p={4} bg='rgba(0,0,0,0.4)' zIndex='1' cursor='pointer'>
                    <Box mt='20%'>
                        <Flex justify='center' align='center' gap={6}>
                            <Flex direction='column' align='center'>
                                <div className='icon-circle'>
                                    <FontAwesomeIcon color='white' icon={faTrashCan} size="2xl" style={{ maxHeight: '30px'}} onClick={() => handleDelete(aiphoto.id)} />                            
                                </div>
                                <Text fontSize='.8rem' color='white'>permanent delete</Text>
                            </Flex>
                            <Flex direction='column' align='center'>
                                <div className='icon-circle'>
                                    <FiRotateCcw className='fi-icon-thicken' color="gray.700" size="1.5rem" onClick={() => handleUnDelete(aiphoto.id)} />
                                </div>
                                <Text fontSize='.8rem' color='white'>un-delete</Text>
                            </Flex>
                        </Flex>
                    </Box>                        
                </Box> 
            )}
            <Image src={aiphoto.url} />
        </Box>
    )
}

export default DeletedPhotoCard