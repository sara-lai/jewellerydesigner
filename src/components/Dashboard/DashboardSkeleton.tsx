// GPT guidance for skeletons
"use client"

import { Box, Flex, Skeleton, VStack, HStack, Grid } from "@chakra-ui/react"

export default function DashboardSkeleton() {
  return (
    <Flex h="100vh">
      <Box w="64" p={4} borderRight="1px solid" borderColor="gray.200" overflowY="auto">
        <Flex direction='column' align="start" gap={10}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} height="20px" width={`${80 - (i % 5) * 10}%`} />
          ))}
        </Flex>
      </Box>

      <Flex direction="column" flex="1">
        <Flex justify="flex-end" align="center" h="16" px={6} borderBottom="1px solid" borderColor="gray.200">
          <HStack gap={4}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} height="40px" width="100px" rounded="md" />
            ))}
          </HStack>
        </Flex>

        <Flex align="center" h="12" px={6} borderBottom="1px solid" borderColor="gray.200">
          <Flex justify='space-evenly' width='100%'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height="24px" width="80px" rounded="sm" />
            ))}
          </Flex>
        </Flex>

        <Box p={6} flex="1" overflowY="auto">
          <Grid templateColumns="repeat(4, 1fr)" gap={8}>
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} height="220px" rounded="lg" />
            ))}
          </Grid>
        </Box>
      </Flex>
    </Flex>
  )
}
