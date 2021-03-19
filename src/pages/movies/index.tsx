import { SimpleGrid } from '@chakra-ui/react';
import React from 'react'
import AddMovie from '../../components/Movie/CRUDForms/AddMovie';
import Item from '../../components/Movie/Item';
import { useMoviesQuery } from '../../generated/graphql'

const index = () => {

  const { data, refetch: refetchMovies } = useMoviesQuery();

  if(!data?.movies){
    return <div>loading...</div>
  }
  return (
    <>

    <SimpleGrid columns={[1,1,2,3]} spacing={[4,8,12,15]} margin={[5,10,15,20]}>
    {
      data.movies.map(item => {
        return <Item key={item.id} movie={item} refetchMovies={refetchMovies}/>
      })
    }
    </SimpleGrid>
      <AddMovie refetchMovies={refetchMovies}/>
    </>
  )
}

export default index
