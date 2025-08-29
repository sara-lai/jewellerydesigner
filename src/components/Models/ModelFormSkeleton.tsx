// GPT guidance for skeletons
"use client"

import { Box, Flex, VStack, Skeleton, Text } from "@chakra-ui/react"

export default function ModelFormSkeleton() {
    return (
        <Flex h="100vh" justify="center" align="center">
            <Text>Is this working????</Text>
            <Box w="400px" p={8} borderWidth="1px" borderRadius="lg" boxShadow="md">
                <VStack gap={6} align="stretch">
                    <Skeleton height="24px" width="60%" alignSelf="center" />

                    <VStack gap={4}>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} height="40px" width="100%" rounded="md" />
                        ))}
                    </VStack>

                    <Skeleton height="45px" width="100%" rounded="md" />
                </VStack>
            </Box>
        </Flex>
    )
}