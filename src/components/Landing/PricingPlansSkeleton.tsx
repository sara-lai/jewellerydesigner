// GPT guidance for skeletons
"use client"

import { Box, Flex, VStack, Skeleton, Text } from "@chakra-ui/react"

export default function PricingPlansSkeleton() {
    return (
        <Flex h="100vh" justify="center" align="center" bg="gray.50" px={6}>
            <Flex w="100%" maxW="1200px" justify="space-between" gap={8}>
                {Array.from({ length: 3 }).map((_, i) => (
                    <Box key={i} flex="1" borderWidth="1px" borderRadius="lg" boxShadow="md" p={8} bg="white">
                        <VStack gap={6} align="stretch">
                            <Skeleton height="28px" width="60%" alignSelf="center" />
                            <Skeleton height="36px" width="40%" alignSelf="center" />
                            <VStack gap={3}>
                                {Array.from({ length: 4 }).map((_, j) => (
                                    <Skeleton key={j} height="20px" width="80%" />
                                ))}
                            </VStack>
                            <Skeleton height="45px" width="100%" rounded="md" />
                        </VStack>
                    </Box>
                ))}
            </Flex>
        </Flex>
    )
}