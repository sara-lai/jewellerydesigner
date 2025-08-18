'use client'
// a LOT of possible features here 
import { useState } from 'react'
import { Box, Flex, Text, Heading, Button, Textarea } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faCamera } from '@fortawesome/free-regular-svg-icons'

const FeaturesPanel = ({ allModels, latestModel }) => {

    const [currentModel, setCurrentModel] = useState(latestModel)

    function switchModel(modelId){
        console.log('switch model to', modelId)

        // filter latestModel from allModels 
        // todo - an 'active' class
        // then load photos for that model.... (coordinate with parent)
    }

    return (
        <Flex className='content-scroll' direction='column' gap={8} p={2}>

            {/* Model selection stuff here, should update photos on right */}
            <Box>
                
                <Heading size='md' cursor="pointer" mb={4}>
                    <Flex gap={1} align='center'>
                        <FontAwesomeIcon icon={faFolderOpen} size="xl" style={{ maxHeight: '30px'}} />
                        <span>Your Models</span>
                    </Flex>
                </Heading>
                {allModels.map((model, i) => (
                    <Box key={i} cursor='pointer' ml={6} onClick={() => switchModel(model.id)}>
                        <Text>{model.name}</Text>
                    </Box>
                ))}
            </Box>
                            
            {/* The take AI photo feature */}
            <Flex direction='column' gap={6}>
                <Heading size='md' cursor="pointer">
                    <Flex gap={1} align='center'>
                        <FontAwesomeIcon icon={faCamera} size="xl" style={{ maxHeight: '30px' }} />
                        <span>Take Photos</span>
                    </Flex>
                </Heading>
                <Text fontSize='sm'>Generate images using your currently selected model (2 photos are taken by default).</Text>
                <Text fontSize='sm'>Selected Model: <b>{currentModel.name}</b></Text>

                <Textarea minH='100px' name="stylePrompt" placeholder="Enter a prompt to describe your design: More descriptive prompts typically yield better results." />

                <Button w='100%' className='btn-colors'>Take AI Photos (~10s)</Button>  
            </Flex>

            {/* The remix photo feature  */}
            {/* <Heading size='md'>Remix Photos</Heading> */}
        </Flex>        
    )
}

export default FeaturesPanel