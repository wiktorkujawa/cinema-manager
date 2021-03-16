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
import React from "react";
import {
  useDeleteHallMutation,
  useDeleteSessionMutation,
} from "../../generated/graphql";
import UpdateHall from "./CRUDForms/UpdateHall";
import { useRouter } from "next/router";
import AddSession from "../Session/CRUDForms/AddSession";
import moment from "moment";

const Item = (props: any) => {
  const base = useRouter();
  const { hall, refetchHalls } = props;

  const [deleteHall] = useDeleteHallMutation();

  const [deleteSession] = useDeleteSessionMutation();

  const onDelete = () =>
    deleteHall({ variables: { id: hall.id }, refetchQueries: refetchHalls });

  return (
    <Box display="grid" gridTemplateRows="auto 1fr auto">
      {/* </Box> */}
      <Box
        display="flex"
        bg="yellow.500"
        justifyContent="center"
        position="relative"
      >
        <Link margin="2" href={`${base.asPath}/${hall.id}`}>
          <p>{hall.name}</p>
        </Link>
        <Button
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
              <Th>Remove</Th>
            </Tr>
          </Thead>

          <Tbody>
            {hall.sessions.map((session: any) => {
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
                          refetchQueries: refetchHalls,
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
        // {/* </ul> */}
        <Box display="flex" justifyContent="center" alignItems="center">
          No sessions
        </Box>
      )}
      <Box
        bg="yellow.500"
        padding=".5em .5em"
        display="flex"
        justifyContent="space-between"
      >
        <UpdateHall refetchHalls={refetchHalls} hall={hall} />
        <AddSession refetchHalls={refetchHalls} hall_name={hall.name} />{" "}
      </Box>
    </Box>
    // </div>

    // </li>
    /* </Box> */
  );
};

export default Item;
