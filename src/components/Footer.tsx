import { Link as ChakraLink, 
  // Button,
  Text } from '@chakra-ui/react'

import { Container } from './Container'

export const Footer = () => {

  return (
  <Container
    flexDirection="row"
    justifyContent="flex-end"
    position="fixed"
    bottom="0"
    width="100%"
    py={2}
  >
    <ChakraLink
      isExternal
      href="https://just-dev-it.com"
      mx={5}
    >
      <Text variant="solid" colorScheme="green">
      © JUST-DEV-IT.COM | DESIGN: WIKTOR KUJAWA
      </Text>
    </ChakraLink>
  </Container>
)}
