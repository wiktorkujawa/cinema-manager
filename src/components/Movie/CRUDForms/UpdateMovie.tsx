import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { useUpdateMovieMutation } from '../../../generated/graphql';
import ChakraForm from '../../ChakraForm';



const UpdateMovie = (props: any) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { refetchMovies, movie } = props;

    const fields: any = [
      {
        key: 'Title',
        type:'text',
        defaultValue: movie.Title,
        required: true,
        templateOptions:{
          label:'Movie title'
        }
      },
      {
        key: 'Poster',
        type:'text',
        defaultValue: movie.Poster,
        required: true,
        templateOptions:{
          label:'Movie Poster',
          previewImage: true
        }
      },
      {
        key: 'Description',
        type:'textarea',
        defaultValue: movie.Description,
        required: true,
        templateOptions:{
          label:'Movie description'
        }
      },
      {
        key: 'Length',
        type:'number',
        defaultValue: movie.Length,
        required: true,
        templateOptions:{
          label:'Movie length'
        }
      },
  ];

  const [updateMovie] = useUpdateMovieMutation();

  const onSubmit = (values: any) => {
    const { Length, ...newValues } = values;
    return updateMovie({ variables: { id: movie.id, input: {Length: Length,
      ...newValues} }, refetchQueries: refetchMovies });
  };


  return (
    <>
    <Button size="sm" onClick={onOpen}>Update Movie</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChakraForm fields={fields} onSubmit={onSubmit} errors=''/>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  )
}

export default UpdateMovie
