import { SimpleGrid } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import React from 'react';
import AddHall from '../../components/Hall/CRUDForms/AddHall';
import Item from '../../components/Hall/Item';

import { useCurrentUserQuery, useHallsQuery } from '../../generated/graphql'


const Halls = () => {

  const {data, refetch: refetchHalls } = useHallsQuery({pollInterval:1000});

  const {data:user} = useCurrentUserQuery();

  if(!data?.halls){
    return <div>...loading</div>;
  }
  
  return (
    <Box display="block" textAlign="center" margin="auto" marginBottom="40">
      {
      user?.currentUser?
      <AddHall refetchHalls={refetchHalls}/>
      :
      <Box mt="10" p="5" background="twitter.500" borderRadius="base">Sign in to add Hall</Box>
    }

    <SimpleGrid columns={[1,1,2,3,4]} spacing={[2,8,12,15]} marginX={[1,10,15,20]}>
    {
      data.halls.map(item => {
        return <Item key={item.id} hall={item} user={user?.currentUser} refetchHalls={refetchHalls}/>
      })
    }
    </SimpleGrid>
    
    </Box>
  )
}

export default Halls