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

    const handleSubmit = async (formData: FormData) => {
        try {
            //formData.set('imageUrls', JSON.stringify(imageUrls)) // for cloudinary
            await createModel(formData)        
        } catch (err){
            console.log('problem, failed to create the model')
        }
    } 
    
    const handleImageUpload = () => { 
        uploadWidget((secureUrlsList) => {
            console.log(secureUrlsList)
            setImageUrls(secureUrlsList)       
        }, true) //  set true for multi upload -> means secureUrlsList is an array
    }    

    return (
        <Flex justify='center'>
            <form action={createModel}>
                <VStack gap={4} align="stretch" maxW='800px'>
                    <Heading size='2xl'>Your First Model</Heading>

                    {/* example images here */}

                    <Heading size='md'>Upload 10-30 Images</Heading>
                    {/* <Text>For best results: use neutral color backgrounds, only the angles that you wish to generate, and a consistent overall style</Text> */}

                    {/* https://chakra-ui.com/docs/components/list */}
                    <List.Root gap="2" variant="plain" align="center">
                    <List.Item>
                        <List.Indicator asChild color="green.500">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        </List.Indicator>
                        Use neutral color backgrounds
                    </List.Item>
                    <List.Item>
                        <List.Indicator asChild color="green.500">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        </List.Indicator>
                        Only use angles that you eventually wish to generate
                    </List.Item>
                    <List.Item>
                        <List.Indicator asChild color="green.500">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        </List.Indicator>
                        Aim for a consistent overall style
                    </List.Item>
                    </List.Root>                 
                    <Text>Show sample images</Text>

                    <Flex gap={2}>
                        {imageUrls.map((url, i) => (
                            <Image key={i} src={url} boxSize="100px" objectFit="cover" />
                        ))}
                    </Flex>
                    <FontAwesomeIcon icon={faImages}  size="2xl" cursor="pointer"  onClick={handleImageUpload} />                     
                    
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
                        <CheckboxCard.Root p={6}>
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

                    <Button className='btn-default' type='submit'>Create Model</Button>
                </VStack>
            </form>

            {/* https://chakra-ui.com/docs/components/steps todo */}
        </Flex>
    )
}

export default NewModelForm