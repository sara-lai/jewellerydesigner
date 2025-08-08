// need [[...index]] catchall for clerk
import "../landing.css";
import { Heading, Flex, Box, Text } from '@chakra-ui/react'

import SignUps from "@/components/Landing/SignUps"

const LandingPage = () => {
  return (
    <Box p={10}>
      <Flex justify='center' gap='10rem'>
        <Flex direction='column' gap='10px'>
          <Heading>Jewellery Design AI</Heading>
          <Text>Create your own personal jewellery design AI model</Text>
          <Text> Upload images & train in YOUR style</Text>
          <Text>Take professional-grade AI photos, custom backdrops</Text>
          <Text>Never use a lightbox again!</Text>
        </Flex>
        <SignUps />
      </Flex>
    </Box>
  )
}

export default LandingPage