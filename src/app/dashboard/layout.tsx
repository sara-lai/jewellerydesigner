//import { Suspense } from 'react' 
import { Box, Flex, Skeleton } from '@chakra-ui/react'

export default async function DashboardLayout({ children,}: { children: React.ReactNode}) {
  return (
    <Box suppressHydrationWarning className='app-wrapper'>     
      <Flex justify="space-between" align="center" gap={4} p={4}>
        <Box>
          Logo
        </Box>
        <Flex gap={4}>
          <Box>
            Credits
          </Box>
          <Box>
            Upgrade
          </Box>
          <Box>
            Account
          </Box>  
        </Flex>              
      </Flex>
      {children}       
    </Box>
  )
}
