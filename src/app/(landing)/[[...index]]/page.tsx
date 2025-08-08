// need [[...index]] catchall for clerk
import "../landing.css";
import { Heading, Flex, Box } from '@chakra-ui/react'

import SignUps from "@/components/Landing/SignUps"

const LandingPage = () => {
  return (
    <Box p={10}>
      <Flex justify='center' gap='20rem'>
        <Box>
          <Heading>Jewellery Design AI</Heading>
        </Box>
        <SignUps />
      </Flex>
    </Box>
  )
}

export default LandingPage