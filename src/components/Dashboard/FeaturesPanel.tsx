'use client'
// a LOT of possible features here 
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Flex, Text, Heading, Button, Textarea, Span } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faCamera } from '@fortawesome/free-regular-svg-icons'
import { FiSettings, FiShuffle, FiTerminal } from 'react-icons/fi'
import { takePhotoWithModel } from '@/lib/replicate'
import runNewImages from '@/app/actions/runNewImages'

const FeaturesPanel = ({ allModels, currentModel, setCurrentModel, setNewPhotoUI }) => {
    const router = useRouter()
    const [isDisabled, setIsDisabled] = useState(false)
    const [prompt, setPrompt] = useState("")

    function switchModel(modelId){
        const theModel = allModels.find(model => modelId === model.id)
        setCurrentModel(theModel)
    }

    function initiateNewPhotos(){
        // brainstorm
        // make sure prompt is included
        if (!prompt) return

        // 2 major things: 
        // 1) kick off back end / api stuff (pass prompt in)
        // 2) set loading cards on Dashboard
        setNewPhotoUI(2) // hardcoding 2 for now

        runNewImages(currentModel.id, 2, prompt)

        // disable button & clear prompt
        setIsDisabled(true)

        // somehow when back end is done, need to load the images, and undisable form
    }

    return (
        <Flex className='content-scroll' direction='column' gap={8} h='100vh' pt={6} pr={6} pl={6} borderRight='1px solid rgba(0,0,0,.1)'>

            {/* Model selection stuff here, should update photos on right */}
            <Box>
                <Heading size='md' cursor="pointer" mb={4}>
                    <Flex gap={1} align='center'>
                        <FontAwesomeIcon icon={faFolderOpen} size="xl" style={{ maxHeight: '30px'}} />
                        <span>Your Models</span>
                    </Flex>
                </Heading>
                <Flex direction='column' gap={1}>
                {allModels.map((model, i) => (
                    <div key={i}>
                        {model.completedTraining && (
                            <Box cursor='pointer' ml={6} onClick={() => switchModel(model.id)}>
                                <Text className={model.id === currentModel.id ? 'selected' : ''}>{model.name}</Text>
                            </Box>
                        )}
                        {model.modelStatus === 'TRAINING' && (
                            <Box ml={6}>
                                <Text fontStyle='italic'>{model.name} <Span fontSize='.8rem'>(training)</Span></Text>
                            </Box>                        
                        )}
                    </div>
                ))}
                </Flex>
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
                <Text fontSize='sm'>Use Model: <b>{currentModel.name}</b></Text>

                <Textarea minH='100px' name="stylePrompt" 
                    placeholder="Enter a prompt to describe your design: More descriptive prompts typically yield better results." 
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                />

                <Button w='100%' className='btn-colors' onClick={initiateNewPhotos} disabled={isDisabled}>
                    {isDisabled ? 'Processing' : 'Take AI Photos (~12s)'}
                </Button>  
            </Flex>

            {/* The remix photo feature  */}
            {/* <Flex align='center' cursor='pointer' gap={1}>
                <FiShuffle className='fi-icon-thicken' color="gray.700" size="2rem" />
                <Heading size='md'>Remix a photo</Heading>
            </Flex> */}

            {/* new model  */}
            <Flex align='center' cursor='pointer' gap={1} onClick={() => router.push('/dashboard/new-model')}>
                <FiTerminal className='fi-icon-thicken' color="gray.700" size="2rem" />
                <Heading size='md'>Train New AI Model</Heading>
            </Flex>            

            {/* user settings */}
            <Flex align='center' cursor='pointer' gap={1}>
                <FiSettings className='fi-icon-thicken' color="gray.700" size="2rem" />
                <Heading size='md'>Your Account</Heading>
            </Flex>
        </Flex>        
    )
}

export default FeaturesPanel