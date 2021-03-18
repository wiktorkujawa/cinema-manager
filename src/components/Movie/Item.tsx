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
import UpdateMovie from "./CRUDForms/UpdateMovie";
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
          <p>{`${movie.Title} (${movie.Year})`}</p>
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

      <Box display="flex" justifyContent="center">
        <Img src={movie.Poster} onError={(e:any)=>{e.target.onerror = null; e.target.src="/cinema_logo.png"}}/>
      </Box>
      
      <Box
        bg="yellow.500"
        padding=".5em .5em"
        display="flex"
        justifyContent="center"
      >
        <UpdateMovie refetchHalls={refetchMovies} movie={movie} />
      </Box>
      
    </Box>
    // </div>

    // </li>
    /* </Box> */
  );
};

export default Item;
