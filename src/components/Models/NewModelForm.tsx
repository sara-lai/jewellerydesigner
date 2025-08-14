'use client'
import { Heading, Flex, Stack, Box, Text, Image, Button, VStack, Field, Textarea, Input, CheckboxCard, List, ListItem, ListIcon  } from '@chakra-ui/react'
import { useState } from 'react'
import { createModel } from '@/app/actions/createModel'
import { uploadWidget } from '@/utils/cloudinaryUpload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { LuCircleCheck, LuCircleDashed } from "react-icons/lu"

import '@/app/dashboard/dashboard.css' // should this live in app/components?

// brainstorm
// find another image uploader that isnt the bulky cloudinary? use tmp for now
// ^ https://chakra-ui.com/docs/components/file-upload is this better?
// need question mark/tooltips or info dropdowns 
// need to show samples of GOOD photso 

const NewModelForm = () => {

    const [imageUrls, setImageUrls] = useState([])
    
    // todo remove images from preview area, have them filter out the imageUrls.... 

    const handleSubmit = async (formData: FormData) => {
        try {
            //formData.set('imageUrls', JSON.stringify(imageUrls)) // for cloudinary
            await createModel(formData)        
        } catch (err){
            console.log('problem, failed to create the model')
        }
    } 
    
    const handleImageUpload = () => { 
        uploadWidget((secureUrlsList: []) => {
            console.log(secureUrlsList)
            setImageUrls(secureUrlsList)       
        }, true) //  set true for multi upload -> means secureUrlsList is an array
    }    

    return (
        <Flex justify='center' m={8}>
            <form action={handleSubmit}>
                <VStack gap={6} align="stretch" maxW='740px'>
                    <Heading size='xl' fontSize='40px' mb={4}>Your First Model</Heading>
                    <Box mb={6}>
                        <Heading size='md' mb={4}>Upload 10-30 Images</Heading>                        

                        {/* https://chakra-ui.com/docs/components/list */}
                        <List.Root variant="plain" align="center" lineHeight='30px'>
                        <List.Item>
                            <Flex gap={2} align='center'>
                                <List.Indicator asChild color="green.500">
                                <FontAwesomeIcon icon={faCheckCircle} />
                                </List.Indicator>
                                <Text fontSize='15px'>Use neutral color backgrounds</Text>
                            </Flex>
                        </List.Item>
                        <List.Item>
                            <Flex gap={2} align='center'>
                                <List.Indicator asChild color="green.500">
                                <FontAwesomeIcon icon={faCheckCircle} />
                                </List.Indicator>
                                 <Text fontSize='15px'>Use angles that you eventually wish to generate</Text>
                            </Flex>
                        </List.Item>
                        <List.Item>
                            <Flex gap={2} align='center'>
                                <List.Indicator asChild color="green.500">
                                <FontAwesomeIcon icon={faCheckCircle} />
                                </List.Indicator>
                                 <Text fontSize='15px'>Aim for a consistent overall style</Text>
                            </Flex>
                        </List.Item>
                        </List.Root>  
                        {!imageUrls && (
                            <Box minH='120px'>
                                <Text>sample images</Text>
                            </Box>  
                        )}            

                        <Flex gap={2} flexWrap="wrap">
                            {imageUrls.map((url, i) => (
                                <Image key={i} src={url} boxSize="140px" objectFit="cover" />
                            ))}
                        </Flex>
                        <Flex align='center' onClick={handleImageUpload} cursor="pointer" gap={2} mt={4}>
                            <FontAwesomeIcon icon={faImages}  style={{ height: '32px', width: '32px' }} />                     
                            Upload Images
                        </Flex>
                    </Box>   
                        
                    <Field.Root>
                        <Field.Label>
                            Model Name
                        </Field.Label>
                        <Input name="nickname" placeholder="Enter model name" />
                        <Field.HelperText>Any name, for your own reference</Field.HelperText>
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Style Description Prompt</Field.Label>
                        <Textarea name="optionalPrompt" placeholder="Enter a prompt (optional)" />
                        <Field.HelperText>If you have the perfect way to describe your jewelry, enter it here as it may help the model during training.</Field.HelperText>
                    </Field.Root> 

                    <Field.Root>
                        <CheckboxCard.Root p={6} cursor='pointer'>
                            <CheckboxCard.HiddenInput name="agreedToTerms"/>
                            <CheckboxCard.Control>
                                <CheckboxCard.Content>
                                <CheckboxCard.Label>
                                    Agree to Terms
                                </CheckboxCard.Label>
                                <CheckboxCard.Description>By proceeding you certify that you own all rights to the uploaded images and that you take full liability for any damages caused by uploading copyrighted material.</CheckboxCard.Description>
                                </CheckboxCard.Content>
                                <CheckboxCard.Indicator />
                            </CheckboxCard.Control>
                        </CheckboxCard.Root>  
                    </Field.Root>                    
                    
                    <Flex justify='center' mt={4}>
                        <Button className='btn-default' w="200px" fontSize='30px' type='submit'>Create Model</Button>
                    </Flex>
                </VStack>
            </form>

            {/* https://chakra-ui.com/docs/components/steps todo */}
        </Flex>
    )
}

export default NewModelForm