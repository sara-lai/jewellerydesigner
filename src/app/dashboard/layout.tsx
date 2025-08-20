//import { Suspense } from 'react' 
import Link from 'next/link'
import { Box, Flex,Button, Text } from '@chakra-ui/react'

export default async function DashboardLayout({ children,}: { children: React.ReactNode}) {

  // todo, might need to move most of this to dashboard since has interactions/data

  return (
    <Box suppressHydrationWarning className='app-wrapper'>     
      {children}       
    </Box>
  )
}
