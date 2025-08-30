// UI mostly created via https://v0.app/
'use client'

import { useRouter } from 'next/navigation'
import { Box, Button, Heading, Text, VStack, HStack, SimpleGrid, Container, Flex, Switch} from '@chakra-ui/react'
import type { SwitchCheckedChangeDetails } from '@chakra-ui/react'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'

export default function Component() {
  const [isAnnual, setIsAnnual] = useState(false)
  const router = useRouter()
  const { userId } = useAuth()

  // should this be in .env for test/demo env vs live?
  // can add more fields for the plan type (update after webhook)?
  const stripeHobbyLink = process.env.NEXT_PUBLIC_STRIPE_HOBBY + '?client_reference_id=' + userId
  const stripeProLink = process.env.NEXT_PUBLIC_STRIPE_PRO + '?client_reference_id=' + userId
  const stripeMaison = 'contact_sales_link... todo'

  function handlePriceToggle(details: SwitchCheckedChangeDetails){
    setIsAnnual(details.checked)
  }

  const plans = [
    {
      name: "Hobbyist",
      monthlyPrice: 19,
      annualPrice: 149,
      period: isAnnual ? "/year" : "/month",
      description: "Perfect for new jewelry designers and the curious",
      features: process.env.NEXT_PUBLIC_HOBBYIST_FEATURES.split(','),
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      monthlyPrice: 49,
      annualPrice: 389,
      period: isAnnual ? "/year" : "/month",
      description: "Ideal for professional makers with growing clientele",
      features: process.env.NEXT_PUBLIC_PRO_FEATURES.split(','),
      buttonText: "Choose Professional",
      popular: true
    },
    {
      name: "L'Maison",
      monthlyPrice: 499,
      annualPrice: 3950,
      period: isAnnual ? "/year" : "/month",
      description: "Complete infra setup owned by your company, with support",
      features: process.env.NEXT_PUBLIC_MAISON_FEATURES.split(','),
      buttonText: "Contact Sales",
      popular: false
    }
  ]

  const formatPrice = (plan: typeof plans[0]) => {
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice
    return `$${price.toLocaleString()}`
  }

  const getSavings = (plan: typeof plans[0]) => {
    if (!isAnnual) return null
    const monthlyCost = plan.monthlyPrice * 12
    const savings = monthlyCost - plan.annualPrice
    const percentage = Math.round((savings / monthlyCost) * 100)
    return { amount: savings, percentage }
  }

  return (
    <Flex suppressHydrationWarning justify='center' minH="100vh" bg="white" py={12} px={4}>
      <Container maxW="7xl">
        {/* Header */}
        <VStack gap={6} textAlign="center" mb={16}>

          {/* Pricing Toggle */}
          <Box bg="gray.50" p={4} borderRadius="xl" border="1px solid" borderColor="gray.200">
            <HStack gap={4} align="center">
              <Text 
                color={!isAnnual ? "gray.900" : "gray.500"} 
                fontWeight={!isAnnual ? "semibold" : "normal"}
              >
                Monthly
              </Text>

              <Switch.Root id="pricing-toggle" colorPalette="pink" size="lg" checked={isAnnual} onCheckedChange={handlePriceToggle}>
                <Switch.HiddenInput />
                <Switch.Control />
              </Switch.Root>

              <VStack gap={0} align="start">
                <Text 
                  color={isAnnual ? "gray.900" : "gray.500"} 
                  fontWeight={isAnnual ? "semibold" : "normal"}
                >
                  Annual
                </Text>
                <Text fontSize="xs" color="pink.600" fontWeight="semibold">
                  Save up to 35%
                </Text>
              </VStack>
            </HStack>
          </Box>
        </VStack>

        {/* Pricing Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} maxW="6xl" mx="auto">
          {plans.map((plan, index) => {
            const savings = getSavings(plan)
            
            return (
              <Flex
                key={plan.name}
                position="relative"
                bg="white"
                borderRadius="xl"
                border={plan.popular ? "2px solid" : "1px solid"}
                borderColor={plan.popular ? "pink.300" : "gray.200"}
                shadow={plan.popular ? "xl" : "md"}
                transform={plan.popular ? "scale(1.05)" : "scale(1)"}
                transition="all 0.3s ease"
                _hover={{
                  transform: plan.popular ? "scale(1.05) translateY(-8px)" : "translateY(-8px)",
                  shadow: "2xl"
                }}
                direction='column'
                justify='space-between'
              >
                {plan.popular && (
                  <Box
                    position="absolute"
                    top="-12px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg="linear-gradient(to right, #EC4899, #F472B6)"
                    color="white"
                    px={4}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="semibold"
                    zIndex={1}
                  >
                    Most Popular
                  </Box>
                )}

                {/* Savings Badge */}
                {savings && (
                  <Box
                    position="absolute"
                    top={4}
                    right={4}
                    bg="green.100"
                    color="green.800"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="semibold"
                  >
                    Save {savings.percentage}%
                  </Box>
                )}

                {/* Card Header */}
                <Box textAlign="center" p={8} pb={6}>
                  <VStack gap={4}>
                    <Heading as="h3" size="lg" color="gray.900">
                      {plan.name}
                    </Heading>
                    <VStack gap={1}>
                      <HStack align="baseline" justify="center">
                        <Text 
                          fontSize={{ base: "3xl", md: "4xl" }} 
                          fontWeight="bold" 
                          color="gray.900"
                        >
                          {formatPrice(plan)}
                        </Text>
                        <Text fontSize="lg" color="gray.600">
                          {plan.period}
                        </Text>
                      </HStack>
                      {savings && (
                        <Text fontSize="sm" color="gray.500" textDecoration="line-through">
                          ${(plan.monthlyPrice * 12).toLocaleString()}/year
                        </Text>
                      )}
                    </VStack>
                    <Text color="gray.600" lineHeight="tall">
                      {plan.description}
                    </Text>
                  </VStack>
                </Box>

                {/* Card Body */}
                <Box px={8} pb={6}>
                  <VStack gap={4} align="stretch">
                    {plan.features.map((feature, featureIndex) => (
                      <Flex key={featureIndex} align="flex-start" gap={3}>
                        <Box
                          w="20px"
                          h="20px"
                          borderRadius="full"
                          bg="pink.500"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexShrink={0}
                          mt="2px"
                        >
                          <Text color="white" fontSize="xs" fontWeight="bold">
                            ✓
                          </Text>
                        </Box>
                        <Text color="gray.700" fontSize="sm" lineHeight="tall">
                          {feature}
                        </Text>
                      </Flex>
                    ))}
                  </VStack>
                </Box>

                {/* Card Footer */}
                <Box p={8} pt={4}>
                  <Button
                    onClick={() => router.push(stripeHobbyLink)}
                    w="full"
                    py={6}
                    fontSize="md"
                    fontWeight="semibold"
                    borderRadius="lg"
                    transition="all 0.2s"
                    bg={plan.popular ? "linear-gradient(to right, #EC4899, #F472B6)" : "white"}
                    color={plan.popular ? "white" : "pink.500"}
                    border={plan.popular ? "none" : "2px solid"}
                    borderColor={plan.popular ? "transparent" : "pink.500"}
                    _hover={{
                      bg: plan.popular ? "linear-gradient(to right, #DB2777, #EC4899)" : "pink.50",
                      transform: "translateY(-1px)",
                      shadow: plan.popular ? "lg" : "md"
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </Box>
              </Flex>
            )
          })}
        </SimpleGrid>

        {/* Bottom CTA */}
        <VStack gap={4} textAlign="center" mt={16}>
          <Text color="gray.600">
            Need a custom solution? We're here to help you create something extraordinary.
          </Text>
          <Button className='btn-colors'>
            Contact us for custom pricing →
          </Button>
        </VStack>
      </Container>
    </Flex>
  )
}
