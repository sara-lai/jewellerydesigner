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
      <Flex mx="auto" h="100vh">
        <Box width="340px" p={4} pt={0}>  
          <Flex className='content-scroll' direction='column' gap={4}>
            <Box>
             
            </Box>
            <ModelTree />                      
          </Flex>      
        </Box>
        <Box flex="1" overflowY="auto" className="content-scroll" mb={20} pr={2}>  
          <Flex justify='space-between'position="sticky" top={0} zIndex={10} bg='white' pb={4}>
            <Box>
              Examples & Public Models              
            </Box>
            <Box>
              Your Generated Photos
            </Box>            
            <Box>
              Favourites
            </Box> 
            <Box pr={8}>
              Deleted
            </Box>                                    
          </Flex>
          {/* <Suspense fallback={<DashboardSkeleton />}></Suspense> */} 
          {children}       
        </Box>
      </Flex>
    </Box>
  )
}
