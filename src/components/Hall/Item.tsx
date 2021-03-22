import {
  Box,
  Button,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import {
  useDeleteHallMutation,
  useDeleteSessionMutation,
} from "../../generated/graphql";
import UpdateHall from "./CRUDForms/UpdateHall";
import { useRouter } from "next/router";
import AddSession from "../Session/CRUDForms/AddSession";
import moment from "moment";
import UpdateSession from "../Session/CRUDForms/UpdateSession";

const Item = (props: any) => {
  const base = useRouter();
  const { hall, refetchHalls, user } = props;

  const [deleteHall] = useDeleteHallMutation();

  const [deleteSession] = useDeleteSessionMutation();

  const onDelete = () =>
    deleteHall({ variables: { id: hall.id }, refetchQueries: refetchHalls });

  return (
    <Box display="grid" gridTemplateRows="auto 1fr auto">
      <Box
        display="flex"
        bg="yellow.500"
        justifyContent="center"
        position="relative"
      >
        <Link margin="2" href={`${base.asPath}/${hall.name}`}>
          <p>{hall.name}</p>
        </Link>
        <Button
          disabled={!user}
          position="absolute"
          right="0"
          colorScheme="red"
          size="md"
          onClick={onDelete}
        >
          X
        </Button>
      </Box>
      {hall.sessions.length != 0 ? (
        // <ul>
        <Table size="sm" variant="striped">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Start</Th>
              <Th>End</Th>
              {/* <Th>Remove</Th> */}
            </Tr>
          </Thead>

          <Tbody>
            {hall.sessions.map((session: any) => {
              return (
                <Fragment key={session.id}>
                <Tr>
                  <Td>{session.title}</Td>
                  <Td>
                    {moment(session.startDate).format("MMMM Do YYYY, h:mm a")}
                  </Td>
                  <Td>
                    {moment(session.endDate).format("MMMM Do YYYY, h:mm a")}
                  </Td>
    
                </Tr>
                <Tr borderBottom="solid 2px" >
                  <Td> <b> Modify:</b></Td>
                  <Td m="auto" textAlign="center" ><UpdateSession user={user} session={session} refetchHalls={refetchHalls} hall_id={hall.id}/></Td>
                  <Td m="auto" textAlign="center">
                  <Button
                    disabled={!user}
                     size="xs"
                     colorScheme="orange"
                      onClick={() =>
                        deleteSession({
                          variables: { id: session.id },
                          refetchQueries: refetchHalls,
                        })
                      }
                    >
                      X
                    </Button>
                    </Td>
                </Tr>
                

                </Fragment>
              );
            })}
          </Tbody>
        </Table>
      ) : (
        <Box display="flex" minHeight="24" justifyContent="center" alignItems="center">
          No sessions
        </Box>
      )}
      <Box
        bg="yellow.500"
        padding=".5em .5em"
        display="flex"
        justifyContent="space-between"
      >
        {
          user ?
          <>
            <UpdateHall refetchHalls={refetchHalls} hall={hall} />
            <AddSession refetchHalls={refetchHalls} hall_id={hall.id} />
          </> :
          <Box mx="auto">Sign in to modify hall and it's repertoir</Box>
        }
      </Box>
    </Box>
  );
};

export default Item;
