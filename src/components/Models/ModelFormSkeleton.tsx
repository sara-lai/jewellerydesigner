// GPT guidance for skeletons
"use client"

import { Box, Flex, VStack, Skeleton, Text } from "@chakra-ui/react"

export default function ModelFormSkeleton() {
    return (
        <Flex h="100vh" justify="center" align="center">
            <Box w="800px" h="800px" p={8} borderWidth="1px" borderRadius="lg" boxShadow="md">
                <VStack gap={6} align="stretch">
                    <Skeleton height="44px" width="60%" />

                    <VStack gap={4}>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <Skeleton key={i} height="40px" width="100%" borderRadius="md" />
                        ))}
                    </VStack>

                    <Skeleton height="45px" width="100%" borderRadius="md" />
                </VStack>
            </Box>
        </Flex>
    )
}