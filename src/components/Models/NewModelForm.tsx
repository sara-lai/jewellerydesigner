'use client'
import { Heading, Flex, Box, Text, Image, Button, VStack, Field, Textarea, Input, CheckboxCard, List, Spinner } from '@chakra-ui/react'
import { useState } from 'react'
import { createModel } from '@/app/actions/createModel'
import { uploadWidget } from '@/utils/cloudinaryUpload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons'
import { LuCircleCheck, LuCircleDashed } from "react-icons/lu"

import '@/app/dashboard/dashboard.css' // should this live in app/components?

// brainstorm
// find another image uploader that isnt the bulky cloudinary? use tmp for now
// ^ https://chakra-ui.com/docs/components/file-upload is this better?
// need question mark/tooltips or info dropdowns 
// need to show samples of GOOD photso 

const NewModelForm = () => {

    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [submitting, setSubmitting] = useState(false)
    
    // todo remove images from preview area, have them filter out the imageUrls.... 

    const handleSubmit = async (formData: FormData) => {
        try {
            await createModel(formData, imageUrls)     
        } catch (err){
            console.log('problem, failed to create the model')
        }
    } 

    const removeFromUploads = (imgUrl: string) => {
        const newUrls = imageUrls.filter(url => url !== imgUrl)
        setImageUrls(newUrls)
    }
    
    const handleImageUpload = () => { 
        uploadWidget((secureUrlsList: string[]) => {
            console.log(secureUrlsList)
            setImageUrls(secureUrlsList)       
        }, true) //  set true for multi upload -> means secureUrlsList is an array
    }    

    return (
        <Flex justify='center' m={8}>
            <form action={handleSubmit} className={submitting ? 'disabled-form' : ''}>
                <VStack gap={6} align="stretch" maxW='740px'>
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
                                 <Text fontSize='15px'>Use the same angles that you wish to generate</Text>
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

                        <Flex gap={2} flexWrap="wrap" mt={4}>
                            {imageUrls.map((url, i) => (
                                <Box position='relative' m={2}>
                                    <FontAwesomeIcon icon={faXmarkCircle} style={{ height: '14px', width: '14px', position: 'absolute', top: '2%', right: '2%', color: 'rgba(0,0,0,.7)', cursor: 'pointer' }} 
                                        onClick={() => removeFromUploads(url)}
                                    />
                                    <Image key={i} src={url} boxSize="140px" objectFit="cover" />
                                </Box>
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
                        <Input name="name" placeholder="Enter model name" />
                        <Field.HelperText>Choose a name for your own reference, unique for each model</Field.HelperText>
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Style Description Prompt (optional)</Field.Label>
                        <Textarea name="stylePrompt" placeholder="Enter a prompt (optional)" />
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
                        <Button className='btn-default' w="200px" fontSize='30px' type='submit' disabled={submitting} onClick={() => setSubmitting(true)}>Create Model</Button>
                        {submitting && <Spinner size='lg' ml={4} />}
                    </Flex>
                </VStack>
            </form>

            {/* https://chakra-ui.com/docs/components/steps todo */}
        </Flex>
    )
}

export default NewModelForm