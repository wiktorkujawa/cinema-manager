import { Link as ChakraLink, Button } from '@chakra-ui/react'
import { usePostsQuery } from '../../server/src/generated/graphql'

import { Container } from './Container'

export const CTA = () => {

  const { data } = usePostsQuery();

  if(!data){
		return <div>loading...</div>
  }

  console.log(data);
  return (
  <Container
    flexDirection="row"
    position="fixed"
    bottom="0"
    width="100%"
    maxWidth="48rem"
    py={2}
  >
    <ChakraLink isExternal href="https://chakra-ui.com" flexGrow={1} mx={2}>
      <Button width="100%" variant="outline" colorScheme="green">
        chakra-ui
      </Button>
    </ChakraLink>

    <ChakraLink
      isExternal
      href="https://github.com/vercel/next.js/blob/canary/examples/with-chakra-ui-typescript"
      flexGrow={3}
      mx={2}
    >
      <Button width="100%" variant="solid" colorScheme="green">
        View Repo
      </Button>
    </ChakraLink>
  </Container>
)}
