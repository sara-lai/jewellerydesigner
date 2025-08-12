import { Box, Button } from '@chakra-ui/react'

import { createModel } from '@/app/actions/createModel'

// todo - use project 3 cloudinary

const NewModelForm = async () => {

  const handleSubmit = async (formData: FormData) => {
    // brainstorm
    // this is passing all to a server action
    // needs to take cloudinary imageurls and set them in formData first
    // it needs to do a redirect (either from server action or here?)

    //formData.set('imageUrls', JSON.stringify(imageUrls)) // for cloudinary
    const result = await createModel(formData)
    console.log(result)
  }    

    return (
        <Box>
            <form action={handleSubmit}>
            
                <Button type='submit'>Submit</Button>
            </form>
        </Box>
    )
}

export default NewModelForm