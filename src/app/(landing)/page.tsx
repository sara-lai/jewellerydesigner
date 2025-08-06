import "./landing.css";
import { Button, Heading } from '@chakra-ui/react'

import SignUps from "@/components/Landing/SignUps"

const LandingPage = () => {
  return (
    <>
      <Heading>hello and hola</Heading>
      <Button className='btn-default'>Do not Press</Button>
      <SignUps />
    </>
  )
}

export default LandingPage