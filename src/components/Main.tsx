import { Stack, StackProps } from '@chakra-ui/react'
import { usePostsQuery } from '../../server/src/generated/graphql';

export const Main = (props: StackProps) => {
  const { data } = usePostsQuery();

  if(!data?.posts){
		return <div>loading...</div>
  }
  return (
    <div>
  <Stack
    spacing="1.5rem"
    width="100%"
    maxWidth="48rem"
    mt="-45vh"
    pt="8rem"
    px="1rem"
    {...props}
  />
  <div>
      <ul>
      {
        data.posts.map(({content}) => (
          <li>{content}</li>
        )
        )
      }
      </ul>
      
    </div>

  </div>
)}
