//import { Suspense } from 'react' 
import { Box, Flex, Skeleton } from '@chakra-ui/react'

export default async function DashboardLayout({ children,}: { children: React.ReactNode}) {
  return (
    <Box className='app-wrapper'>     
      <Flex justify="space-between" align="center" gap={4} p={4}>
        <Box>
          Logo
        </Box>
        <Flex gap={4}>
          <Box>
            Test Top Link1
          </Box>
          <Box>
            Test Top Link2
          </Box>
          <Box>
            Test Top Link3
          </Box>  
        </Flex>              
      </Flex>
      <Flex maxW="1600px" mx="auto" h="100vh">
        <Box flex="0 0 20%" p={4} pt={0}>  
          <Flex className='content-scroll' direction='column' gap={4}>
            <Box>
              Test Side1 
            </Box>
            <Box>
              Test Side2
            </Box>
            <Box>
              Test Side3
            </Box>                        
          </Flex>      
        </Box>
        <Box flex="0 0 80%" overflowY="auto" className="content-scroll" mb={20}>  
          <Flex justify='space-between'position="sticky" top={0} zIndex={10} bg='white'>
            <Box>
              Core Functionality 1
            </Box>
            <Box>
              Core Functionality 2
            </Box>            
            <Box>
              Core Functionality 3
            </Box> 
            <Box>
              Core Functionality 4
            </Box>                                    
          </Flex>
          {/* <Suspense fallback={<DashboardSkeleton />}></Suspense> */} 
          {children}       
        </Box>
      </Flex>
    </Box>
  )
}
