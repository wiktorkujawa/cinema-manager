import React from 'react'
import { useRouter } from 'next/router';
import { useDeleteSessionMutation, useHallQuery } from '../../generated/graphql';
import { Box, Button, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import moment from 'moment';
import AddSession from '../../components/Session/CRUDForms/AddSession';
const name = () => {
  const {query} = useRouter();

  const { data, refetch: refetchHalls } = useHallQuery({variables:{ hallName: query.name as string}});

  const [deleteSession] = useDeleteSessionMutation();
  if(!data?.hall){
    return <div>loading...</div>
  }

  return (
    <Box padding="5" display="grid" gridTemplateRows="auto 1fr auto">
    <Box
      display="flex"
      bg="yellow.500"
      justifyContent="center"
    >
        <Text margin="2">{data.hall.name}</Text>

    </Box>
    {data.hall.sessions.length != 0 ? (
      <Table size="sm" variant="striped">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Start</Th>
            <Th>End</Th>
            <Th>Remove</Th>
          </Tr>
        </Thead>

        <Tbody>
          {data.hall.sessions.map((session: any) => {
            return (
              <Tr key={session.id}>
                <Td>{session.title}</Td>
                <Td>
                  {moment(session.startDate).format("MMMM Do YYYY, h:mm a")}
                </Td>
                <Td>
                  {moment(session.endDate).format("MMMM Do YYYY, h:mm a")}
                </Td>
                <Td>
                  <Button
                   size="md"
                   colorScheme="orange"
                    onClick={() =>
                      deleteSession({
                        variables: { id: session.id },
                        refetchQueries: refetchHalls as any
                      })
                    }
                  >
                    X
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    ) : (
      <Box display="flex" justifyContent="center" alignItems="center">
        No sessions
      </Box>
    )}
    <Box
      bg="yellow.500"
      padding=".5em .5em"
      display="flex"
      justifyContent="center"
    >
      <AddSession refetchHalls={refetchHalls} hall_id={data.hall.id} />{" "}
    </Box>
  </Box>
  )
}

export default name
