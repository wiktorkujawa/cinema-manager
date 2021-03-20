import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react'
import AddMovie from '../../components/Movie/CRUDForms/AddMovie';
import Item from '../../components/Movie/Item';
import { useCurrentUserQuery, useMoviesQuery } from '../../generated/graphql'

const index = () => {

  const { data, refetch: refetchMovies } = useMoviesQuery();

  const {data:user} = useCurrentUserQuery();

  if(!data?.movies){
    return <div>loading...</div>
  }
  return (
    <>

    <SimpleGrid columns={[1,1,2,3]} spacing={[4,8,12,15]} margin={[5,10,15,20]}>
    {
      data.movies.map(item => {
        return <Item key={item.id} user={user?.currentUser} movie={item} refetchMovies={refetchMovies}/>
      })
    }
    </SimpleGrid>
      {
        user?.currentUser ?
      <AddMovie refetchMovies={refetchMovies}/>
      :
      <Box mb="20" p="5" background="twitter.500" borderRadius="base">Sign In to add Movie</Box>
      }
    </>
  )
}

export default index
