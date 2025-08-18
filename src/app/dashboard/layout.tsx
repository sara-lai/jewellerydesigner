//import { Suspense } from 'react' 
import { Box, Flex,Button, Text } from '@chakra-ui/react'

export default async function DashboardLayout({ children,}: { children: React.ReactNode}) {
  return (
    <Box suppressHydrationWarning className='app-wrapper'>     
      <Flex justify="space-between" align="center" gap={4} p={2} borderBottom="1px solid rgba(0,0,0,.1)">
        <Box fontSize='1.1rem' pl={4} fontWeight='600'>
          JewelleryAI
        </Box>
        <Flex gap={4} align='center'>
          <Box>
            <Text fontWeight='bold' color='pink.600'>100 Credits</Text>
          </Box>
          <Box>
            <Button className='btn-colors' h='32px !important'>Upgrade</Button>            
          </Box>
        </Flex>              
      </Flex>
      {children}       
    </Box>
  )
}
