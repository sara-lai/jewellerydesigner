'use client'
import { useState } from "react"
import { Image, Box, Button, Flex, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faHeart } from '@fortawesome/free-regular-svg-icons'
import { FiDownload, FiMaximize2 } from 'react-icons/fi'
import '@/app/dashboard/dashboard.css'

const PhotoCard = ({ imgSrc }) => {
    const [showOverlay, setShowOverlay] = useState(false)
    return (
        <Box position='relative' borderRadius='6px' overflow='hidden'
            onMouseEnter={() => setShowOverlay(true)} 
            onMouseLeave={() => setShowOverlay(false)}
        >
            {showOverlay && (
                <Box position='absolute' h='100%' w='100%' p={4} bg='rgba(0,0,0,0.4)' zIndex='1' cursor='pointer'>
                    <Box>
                        <Flex justify='space-between'>
                            <FontAwesomeIcon color='white' icon={faTrashCan} size="2xl" style={{ maxHeight: '30px'}} />                            
                            <FontAwesomeIcon color='white' icon={faHeart} size="2xl" style={{ maxHeight: '30px'}} />                        
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
                                    <div className='icon-circle'>
                                        <FiDownload className='fi-icon-thicken' color="gray.700" size="1.5rem" />
                                    </div>
                                    <Text fontSize='.8rem' color='white'>download</Text>
                                </Flex>
                            </Flex>
                        </Box>                        
                    </Box>
                </Box> 
            )}
            <Image src={imgSrc} />
        </Box>
    )
}

export default PhotoCard