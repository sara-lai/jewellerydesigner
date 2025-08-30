import { useState, useEffect } from "react"
import { Card, Flex, Spinner, Text } from '@chakra-ui/react'

// bugs possibly to fix:
// .... better if remove loading cards one at time instead of all at once? 

const PhotoCardLoading = ({ startTime }) => {
    const [timer, setTimer] = useState(0)

    useEffect(() => {
        // timer feature
        const interval = setInterval(() => {
            let elapsedTime = Date.now() - startTime // difference in ms
            elapsedTime = elapsedTime/1000 // convert to seconds
            setTimer(elapsedTime)
        }, 50) // performance issues if too small?

        return () => clearInterval(interval) 
    }, [startTime])

    return (
        <Card.Root minH='300px'minW='250px' boxShadow="md">
            <Card.Body p={2}>
                <Flex direction='column' justify='center' align='center' h='100%' gap={4}>
                    <Spinner size='xl' />
                    <Text>{timer.toFixed(2)}</Text>
                </Flex>
            </Card.Body>
        </Card.Root>
    )
}

export default PhotoCardLoading