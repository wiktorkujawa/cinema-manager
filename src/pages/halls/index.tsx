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
    <>

    <SimpleGrid columns={[1,1,2,3,4]} spacing={[4,8,12,15]} margin={[5,10,15,20]}>
    {
      data.halls.map(item => {
        return <Item key={item.id} hall={item} user={user?.currentUser} refetchHalls={refetchHalls}/>
      })
    }
    </SimpleGrid>
    {
      user?.currentUser?
      <AddHall refetchHalls={refetchHalls}/>
      :
      <Box mb="10" p="5" background="twitter.500" borderRadius="base">Sign in to add Hall</Box>
    }
    </>
  )
}

export default Halls