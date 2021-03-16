import { SimpleGrid } from '@chakra-ui/layout';
import React from 'react';
import AddHall from '../components/Hall/CRUDForms/AddHall';
import Item from '../components/Hall/Item';

import { useHallsQuery } from '../generated/graphql'


const Halls = () => {

  const {data, refetch: refetchHalls } = useHallsQuery({pollInterval:1000});

  if(!data?.halls){
    return <div>...loading</div>;
  }
  
  return (
    <>

    <SimpleGrid columns={[1,1,2,3]} spacing={[4,8,12,15]} margin={[5,10,15,20]}>
    {
      data.halls.map(item => {
        return <Item key={item.id} hall={item} refetchHalls={refetchHalls}/>
      })
    }
    </SimpleGrid>
      <AddHall refetchHalls={refetchHalls}/>
    </>
  )
}

export default Halls