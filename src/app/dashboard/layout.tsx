//import { Suspense } from 'react' 
import ModelTree from '@/components/Dashboard/ModelTree'
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
      <Flex mx="auto" h="100vh">
        <Box width="340px" p={4} pt={0}>  
          <Flex className='content-scroll' direction='column' gap={4}>
            <Box>
              Test Side1
            </Box>
            <ModelTree />                      
          </Flex>      
        </Box>
        <Box flex="1" overflowY="auto" className="content-scroll" mb={20}>  
          <Flex justify='space-between'position="sticky" top={0} zIndex={10} bg='white' pb={4}>
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
