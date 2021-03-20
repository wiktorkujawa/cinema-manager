import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Divider, Heading, Img, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/router'
import React from 'react'
import { useDeleteSessionMutation, useMovieQuery, useSessionsWithMovieQuery } from '../../generated/graphql';

const title = () => {
  const { query } = useRouter();

  const { data } = useMovieQuery({variables:{
    Title: query.title as string
  }});

  const {data:sessions, refetch: refetchSessions} = useSessionsWithMovieQuery({variables: {
    title: query.title as string
  }});

  const [deleteSession] = useDeleteSessionMutation();

  if(!data?.movie){
    return <div>loading...</div>
  }

  if(!sessions?.sessionsWithMovie){
    return <div>loading...</div>
  }

  console.log(sessions?.sessionsWithMovie);
  // sessions.data.sessionsWithMovie.refe

  console.log(data.movie);
  return (
    <Accordion defaultIndex={[0]} allowMultiple m="10" background="gray.300">
  <AccordionItem width={["xs", "container.sm", "container.md", "container.lg","container.xl"]}>
    <h2>
      <AccordionButton>
        <Box flex="1" textAlign="left">
        <Text fontSize="lg">Movie Description</Text>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <Divider/>
      <Heading textAlign="center" my="5">{data.movie.Title}</Heading>
      <Img borderRadius="base" mx="auto" src={data.movie.Poster} my="5" width={["xs", "sm", "container.sm", "container.md","container.lg"]}/>
            <Text background="white" mx="auto" p="5" borderRadius="base" width={["xs", "sm", "container.sm", "container.md","container.lg"]}>{data.movie.Description}</Text>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem isDisabled={sessions.sessionsWithMovie.length == 0} width={["xs", "container.sm", "container.md", "container.lg","container.xl"]}>
    <h2>
      <AccordionButton>
        <Box flex="1" textAlign="left">
        <Text fontSize="lg">{sessions.sessionsWithMovie.length == 0?'No sessions':'Movie schedules'}</Text>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <Table size="sm" variant="striped">
        <Thead>
          <Tr>
            <Th>Hall Name</Th>
            <Th>Start</Th>
            <Th>End</Th>
            <Th>Remove</Th>
          </Tr>
        </Thead>

        <Tbody>
          {sessions.sessionsWithMovie.map((session: any) => {
            return (
              <Tr key={session.id}>
                <Td>{session.hall.name}</Td>
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
                        refetchQueries: refetchSessions as any
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

    </AccordionPanel>
  </AccordionItem>
</Accordion>
  )
}

export default title
