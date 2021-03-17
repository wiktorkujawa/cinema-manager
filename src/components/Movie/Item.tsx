import {
  Box,
  Button,
  Img,
  Link
} from "@chakra-ui/react";
import React from "react";
import {
  useDeleteMovieMutation,
} from "../../generated/graphql";
// import UpdateHall from "./CRUDForms/UpdateHall";
import { useRouter } from "next/router";

const Item = (props: any) => {
  const base = useRouter();
  const { movie, refetchMovies } = props;

  const [deleteMovie] = useDeleteMovieMutation();

  const onDelete = () =>
    deleteMovie({ variables: { id: movie.id }, refetchQueries: refetchMovies });

  return (
    <Box display="grid" gridTemplateRows="auto 1fr auto">
      {/* </Box> */}
      <Box
        display="flex"
        bg="yellow.500"
        justifyContent="center"
        position="relative"
      >
        <Link margin="2" href={`${base.asPath}/${movie.id}`}>
          <p>{movie.Title}</p>
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

      <Box>
        <Img src={movie.Poster}/>
      </Box>
      
      <Box
        bg="yellow.500"
        padding=".5em .5em"
        display="flex"
        justifyContent="space-between"
      >
        {/* <UpdateMovie refetchHalls={refetchHalls} hall={hall} /> */}
      </Box>
      hello
    </Box>
    // </div>

    // </li>
    /* </Box> */
  );
};

export default Item;
